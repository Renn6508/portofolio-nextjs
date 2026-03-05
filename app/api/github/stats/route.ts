import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME

export async function GET() {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    }

    if (GITHUB_TOKEN && GITHUB_TOKEN !== 'your_github_personal_access_token') {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
    }

    // Fetch user data, repos, and events (for commit activity)
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        cache: 'no-store',
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        cache: 'no-store',
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
        headers,
        cache: 'no-store',
      }),
    ])

    if (!userRes.ok) {
      const errorText = await userRes.text()
      console.error('GitHub User API Error:', userRes.status, errorText)
      throw new Error(`GitHub API returned ${userRes.status}`)
    }

    if (!reposRes.ok) {
      const errorText = await reposRes.text()
      console.error('GitHub Repos API Error:', reposRes.status, errorText)
      throw new Error(`GitHub API returned ${reposRes.status}`)
    }

    const userData = await userRes.json()
    const reposData = await reposRes.json()
    const eventsData = eventsRes.ok ? await eventsRes.json() : []

    // Calculate total stars
    const totalStars = reposData.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

    // Calculate total forks
    const totalForks = reposData.reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0)

    // Count commits from events (last 90 days of public activity)
    const pushEvents = eventsData.filter((event: any) => event.type === 'PushEvent')
    const totalCommits = pushEvents.reduce((sum: number, event: any) => {
      return sum + (event.payload?.commits?.length || 0)
    }, 0)

    // Calculate commit streak (days with commits in last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const commitDates = new Set(
      pushEvents
        .filter((event: any) => new Date(event.created_at) > thirtyDaysAgo)
        .map((event: any) => new Date(event.created_at).toDateString())
    )
    const commitStreak = commitDates.size

    // Calculate language statistics
    const langMap: Record<string, number> = {}
    reposData.forEach((repo: any) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1
      }
    })

    const totalReposWithLang = reposData.filter((r: any) => r.language).length
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        percentage: totalReposWithLang > 0 ? Math.round((count / totalReposWithLang) * 100) : 0,
      }))

    // Get recent repositories
    const recentRepos = reposData
      .filter((r: any) => !r.fork)
      .slice(0, 4)
      .map((r: any) => ({
        name: r.name,
        description: r.description || 'No description',
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
        updatedAt: new Date(r.updated_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      }))

    // Get contribution activity summary
    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)
    
    const recentCommits = pushEvents
      .filter((event: any) => new Date(event.created_at) > last7Days)
      .reduce((sum: number, event: any) => sum + (event.payload?.commits?.length || 0), 0)

    return NextResponse.json({
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      totalCommits: totalCommits || 0,
      commitStreak,
      recentCommits,
      topLanguages,
      recentRepos,
    })
  } catch (error) {
    console.error('GitHub API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
