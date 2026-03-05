'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '@/components/interactive/SpotlightCard'
import SplitText from '@/components/interactive/SplitText'
import { GITHUB_USERNAME, WAKATIME_USERNAME } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Python: '#3776AB',
  PHP: '#777BB4',
  Dart: '#0175C2',
  Java: '#ED8B00',
  Lua: '#000080',
  Rust: '#DEA584',
  R: '#276DC3',
  Vue: '#4FC08D',
  SCSS: '#CC6699',
  Shell: '#89E051',
}

export default function Dashboard() {
  const secRef = useRef<HTMLElement>(null)
  const [ghStats, setGhStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    topLanguages: [] as Array<{ name: string; percentage: number }>,
    recentRepos: [] as Array<any>,
    loading: true,
    error: false,
  })

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const userData = await userRes.json()
        const reposData = await reposRes.json()

        const totalStars = reposData.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

        const langMap: Record<string, number> = {}
        reposData.forEach((repo: any) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1
          }
        })
        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / reposData.filter((r: any) => r.language).length) * 100),
          }))

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

        setGhStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          topLanguages,
          recentRepos,
          loading: false,
          error: false,
        })
      } catch {
        setGhStats((prev) => ({ ...prev, loading: false, error: true }))
      }
    }

    fetchGithubStats()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dash-stat-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-stats-grid', start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.dash-chart-section',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-chart-section', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.dash-repo-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-repos-grid', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.dash-lang-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.dash-languages-section', start: 'top 80%' },
        }
      )
    }, secRef)
    return () => ctx.revert()
  }, [ghStats.loading])

  return (
    <section className="dashboard" id="dashboard" ref={secRef}>
      <div className="container">
        <div className="dash-header">
          <div>
            <SplitText text="Coding Activity" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="DEVELOPER DASHBOARD" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
          </div>
          <p className="dash-subtitle">Real-time statistics pulled from GitHub & WakaTime APIs</p>
        </div>

        <div className="dash-stats-grid">
          {[
            {
              icon: '📦',
              value: ghStats.loading ? '...' : ghStats.publicRepos,
              label: 'Public Repos',
              color: 'rgba(232,0,30,0.15)',
            },
            {
              icon: '⭐',
              value: ghStats.loading ? '...' : ghStats.totalStars,
              label: 'Total Stars',
              color: 'rgba(247,223,30,0.12)',
            },
            {
              icon: '👥',
              value: ghStats.loading ? '...' : ghStats.followers,
              label: 'Followers',
              color: 'rgba(79,195,247,0.12)',
            },
            {
              icon: '🔗',
              value: ghStats.loading ? '...' : ghStats.following,
              label: 'Following',
              color: 'rgba(129,199,132,0.12)',
            },
          ].map((stat) => (
            <div className="dash-stat-card" key={stat.label}>
              <SpotlightCard className="dash-stat-inner" spotlightColor={stat.color}>
                <span className="dash-stat-icon">{stat.icon}</span>
                <div className="dash-stat-value">{stat.value}</div>
                <div className="dash-stat-label">{stat.label}</div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="dash-chart-section">
          <div className="dash-section-label">
            <span className="dash-label-dot" />
            <span>GITHUB CONTRIBUTIONS</span>
          </div>
          <SpotlightCard className="dash-chart-card" spotlightColor="rgba(232,0,30,0.08)">
            <div className="dash-chart-inner">
              <img
                src={`https://ghchart.rshah.org/E8001E/${GITHUB_USERNAME}`}
                alt="GitHub Contribution Chart"
                className="dash-contrib-chart"
                loading="lazy"
              />
            </div>
            <div className="dash-chart-footer">
              <span className="dash-chart-legend">
                <span className="dash-legend-box" style={{ background: 'rgba(232,0,30,0.2)' }} /> Less
              </span>
              <span className="dash-chart-legend">
                <span className="dash-legend-box" style={{ background: 'rgba(232,0,30,0.5)' }} /> Medium
              </span>
              <span className="dash-chart-legend">
                <span className="dash-legend-box" style={{ background: '#E8001E' }} /> More
              </span>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="dash-chart-link">
                View on GitHub <span>↗</span>
              </a>
            </div>
          </SpotlightCard>
        </div>

        <div className="dash-two-col">
          <div className="dash-languages-section">
            <div className="dash-section-label">
              <span className="dash-label-dot" />
              <span>TOP LANGUAGES</span>
            </div>
            <SpotlightCard className="dash-lang-card" spotlightColor="rgba(232,0,30,0.08)">
              {ghStats.loading ? (
                <div className="dash-loading">Loading...</div>
              ) : ghStats.error ? (
                <div className="dash-loading">Unable to load language data</div>
              ) : (
                <div className="dash-lang-bars">
                  {ghStats.topLanguages.map((lang) => (
                    <div className="dash-lang-item" key={lang.name}>
                      <div className="dash-lang-header">
                        <span className="dash-lang-name">
                          <span className="dash-lang-dot" style={{ background: LANG_COLORS[lang.name] || '#8A9BAD' }} />
                          {lang.name}
                        </span>
                        <span className="dash-lang-pct">{lang.percentage}%</span>
                      </div>
                      <div className="dash-lang-bar-track">
                        <div
                          className="dash-lang-bar-fill"
                          style={
                            {
                              '--progress': `${lang.percentage}%`,
                              background: `linear-gradient(to right, ${LANG_COLORS[lang.name] || '#E8001E'}, ${
                                LANG_COLORS[lang.name] || '#E8001E'
                              }88)`,
                            } as any
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </div>

          <div className="dash-waka-section">
            <div className="dash-section-label">
              <span className="dash-label-dot" />
              <span>WAKATIME STATS</span>
            </div>
            <SpotlightCard className="dash-waka-card" spotlightColor="rgba(79,195,247,0.08)">
              <div className="dash-waka-embed">
                <div className="dash-waka-fallback">
                  <div className="dash-waka-icon">⏱️</div>
                  <h4 className="dash-waka-title">Coding Activity</h4>
                  <p className="dash-waka-desc">Track my real-time coding activity and language breakdown on WakaTime.</p>
                  <a href={`https://wakatime.com/@${WAKATIME_USERNAME}`} target="_blank" rel="noopener noreferrer" className="dash-waka-link">
                    View on WakaTime <span>↗</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        <div className="dash-repos-section">
          <div className="dash-section-label">
            <span className="dash-label-dot" />
            <span>RECENT REPOSITORIES</span>
          </div>
          <div className="dash-repos-grid">
            {ghStats.loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div className="dash-repo-card dash-repo-skeleton" key={i}>
                    <SpotlightCard className="dash-repo-inner" spotlightColor="rgba(232,0,30,0.06)">
                      <div className="dash-skeleton-line dash-skeleton-w60" />
                      <div className="dash-skeleton-line dash-skeleton-w90" />
                      <div className="dash-skeleton-line dash-skeleton-w40" />
                    </SpotlightCard>
                  </div>
                ))
              : ghStats.recentRepos.map((repo) => (
                  <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="dash-repo-card">
                    <SpotlightCard className="dash-repo-inner" spotlightColor="rgba(232,0,30,0.08)">
                      <div className="dash-repo-header">
                        <span className="dash-repo-icon">📁</span>
                        <span className="dash-repo-name">{repo.name}</span>
                      </div>
                      <p className="dash-repo-desc">{repo.description}</p>
                      <div className="dash-repo-meta">
                        {repo.language && (
                          <span className="dash-repo-lang">
                            <span className="dash-lang-dot" style={{ background: LANG_COLORS[repo.language] || '#8A9BAD' }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="dash-repo-stat">⭐ {repo.stars}</span>
                        <span className="dash-repo-stat">🔱 {repo.forks}</span>
                        <span className="dash-repo-date">{repo.updatedAt}</span>
                      </div>
                    </SpotlightCard>
                  </a>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
