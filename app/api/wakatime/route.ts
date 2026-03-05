import { NextResponse } from 'next/server'

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY

export async function GET() {
  // Return mock data if API key is not configured
  if (!WAKATIME_API_KEY || WAKATIME_API_KEY === 'your_wakatime_api_key') {
    console.log('WakaTime: Using mock data (API key not configured)')
    return NextResponse.json({
      totalSeconds: 145800, // ~40 hours
      dailyAverage: 20828, // ~5.8 hours per day
      languages: [
        { name: 'TypeScript', percent: 42.5, text: '17 hrs 2 mins', totalSeconds: 61320 },
        { name: 'JavaScript', percent: 28.3, text: '11 hrs 20 mins', totalSeconds: 40800 },
        { name: 'CSS', percent: 15.2, text: '6 hrs 5 mins', totalSeconds: 21900 },
        { name: 'HTML', percent: 8.5, text: '3 hrs 24 mins', totalSeconds: 12240 },
        { name: 'JSON', percent: 5.5, text: '2 hrs 12 mins', totalSeconds: 7920 },
      ],
      editors: [
        { name: 'VS Code', percent: 98.5, text: '39 hrs 30 mins' },
        { name: 'WebStorm', percent: 1.5, text: '36 mins' },
      ],
      bestDay: {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        text: '8 hrs 45 mins',
      },
    })
  }

  try {
    const headers = {
      Authorization: `Bearer ${WAKATIME_API_KEY}`,
    }

    const statsRes = await fetch(
      `https://wakatime.com/api/v1/users/current/stats/last_7_days`,
      { 
        headers,
        cache: 'no-store',
      }
    )

    if (!statsRes.ok) {
      const errorText = await statsRes.text()
      console.error('WakaTime API Error:', statsRes.status, errorText)
      
      // Return mock data on error
      return NextResponse.json({
        totalSeconds: 145800,
        dailyAverage: 20828,
        languages: [
          { name: 'TypeScript', percent: 42.5, text: '17 hrs 2 mins', totalSeconds: 61320 },
          { name: 'JavaScript', percent: 28.3, text: '11 hrs 20 mins', totalSeconds: 40800 },
          { name: 'CSS', percent: 15.2, text: '6 hrs 5 mins', totalSeconds: 21900 },
          { name: 'HTML', percent: 8.5, text: '3 hrs 24 mins', totalSeconds: 12240 },
          { name: 'JSON', percent: 5.5, text: '2 hrs 12 mins', totalSeconds: 7920 },
        ],
        editors: [
          { name: 'VS Code', percent: 98.5, text: '39 hrs 30 mins' },
        ],
        bestDay: {
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          text: '8 hrs 45 mins',
        },
      })
    }

    const statsData = await statsRes.json()

    if (!statsData.data) {
      throw new Error('Invalid response structure')
    }

    return NextResponse.json({
      totalSeconds: statsData.data.total_seconds || 0,
      dailyAverage: statsData.data.daily_average || 0,
      languages: (statsData.data.languages || []).slice(0, 5).map((lang: any) => ({
        name: lang.name,
        percent: lang.percent,
        text: lang.text,
        totalSeconds: lang.total_seconds,
      })),
      editors: (statsData.data.editors || []).slice(0, 3).map((editor: any) => ({
        name: editor.name,
        percent: editor.percent,
        text: editor.text,
      })),
      bestDay: statsData.data.best_day || { date: new Date().toISOString().split('T')[0], text: '0 hrs' },
    })
  } catch (error) {
    console.error('WakaTime API Error:', error)
    
    // Return mock data on error
    return NextResponse.json({
      totalSeconds: 145800,
      dailyAverage: 20828,
      languages: [
        { name: 'TypeScript', percent: 42.5, text: '17 hrs 2 mins', totalSeconds: 61320 },
        { name: 'JavaScript', percent: 28.3, text: '11 hrs 20 mins', totalSeconds: 40800 },
        { name: 'CSS', percent: 15.2, text: '6 hrs 5 mins', totalSeconds: 21900 },
        { name: 'HTML', percent: 8.5, text: '3 hrs 24 mins', totalSeconds: 12240 },
        { name: 'JSON', percent: 5.5, text: '2 hrs 12 mins', totalSeconds: 7920 },
      ],
      editors: [
        { name: 'VS Code', percent: 98.5, text: '39 hrs 30 mins' },
      ],
      bestDay: {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        text: '8 hrs 45 mins',
      },
    })
  }
}
