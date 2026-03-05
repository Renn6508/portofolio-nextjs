'use client'

import { useEffect, useState } from 'react'

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
  Vue: '#4FC08D',
  SCSS: '#CC6699',
  JSON: '#000000',
  Markdown: '#083FA1',
}

interface WakaTimeData {
  totalSeconds: number
  dailyAverage: number
  languages: Array<{
    name: string
    percent: number
    text: string
    totalSeconds: number
  }>
  editors: Array<{
    name: string
    percent: number
    text: string
  }>
  bestDay: {
    date: string
    text: string
  }
}

export default function WakatimeStats() {
  const [data, setData] = useState<WakaTimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWakaTime = async () => {
      try {
        const res = await fetch('/api/wakatime')
        if (!res.ok) throw new Error('Failed to fetch')
        const wakaData = await res.json()
        setData(wakaData)
        setLoading(false)
      } catch {
        setError(true)
        setLoading(false)
      }
    }

    fetchWakaTime()
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours} hrs ${mins} mins`
    return `${mins} mins`
  }

  if (loading) {
    return (
      <div className="dash-wakatime-clone">
        <div className="dash-loading">Loading WakaTime stats...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="dash-wakatime-clone">
        <div className="dash-loading">Unable to load WakaTime data</div>
      </div>
    )
  }

  return (
    <div className="dash-wakatime-clone">
      <div className="wakatime-clone-header">
        <div className="wakatime-clone-icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div>
          <h3 className="wakatime-clone-title">Coding Activity</h3>
          <p className="wakatime-clone-subtitle">Last 7 days</p>
        </div>
      </div>

      <div className="wakatime-clone-grid">
        <div className="wakatime-clone-card">
          <div className="wakatime-card-label">TOTAL TIME</div>
          <div className="wakatime-card-value">{formatTime(data.totalSeconds)}</div>
        </div>
        <div className="wakatime-clone-card">
          <div className="wakatime-card-label">DAILY AVG</div>
          <div className="wakatime-card-value">{formatTime(data.dailyAverage)}</div>
        </div>
        <div className="wakatime-clone-card">
          <div className="wakatime-card-label">BEST DAY</div>
          <div className="wakatime-card-value">{data.bestDay.text}</div>
          <div className="wakatime-card-sub">{new Date(data.bestDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        </div>
        <div className="wakatime-clone-card">
          <div className="wakatime-card-label">LANGUAGES</div>
          <div className="wakatime-card-value">{data.languages.length}</div>
          <div className="wakatime-card-sub">tracked</div>
        </div>
      </div>

      <div className="wakatime-clone-banner">
        <div className="wakatime-banner-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
          Top Editor
        </div>
        <div className="wakatime-banner-right">{data.editors[0]?.name || 'N/A'}</div>
      </div>

      <div className="wakatime-clone-langs">
        <div className="wakatime-langs-header">
          <div className="wakatime-langs-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            LANGUAGES
          </div>
          <div className="wakatime-langs-badge">Top 5</div>
        </div>
        <div className="wakatime-langs-list">
          {data.languages.map((lang) => (
            <div className="wakatime-lang-row" key={lang.name}>
              <div className="wakatime-lang-name">
                <span
                  className="wakatime-lang-dot"
                  style={{ background: LANG_COLORS[lang.name] || '#8A9BAD' }}
                />
                {lang.name}
              </div>
              <div className="wakatime-lang-bar-wrapper">
                <div
                  className="wakatime-lang-bar"
                  style={{
                    width: `${lang.percent}%`,
                    background: `linear-gradient(to right, ${LANG_COLORS[lang.name] || '#3178C6'}, ${LANG_COLORS[lang.name] || '#3178C6'}88)`,
                  }}
                />
              </div>
              <div className="wakatime-lang-pct">{lang.percent.toFixed(1)}%</div>
            </div>
          ))}
        </div>
        <div className="wakatime-clone-footer">
          <span>Updated every hour</span>
          <span>{data.languages.reduce((sum, l) => sum + l.totalSeconds, 0) > 0 ? formatTime(data.languages.reduce((sum, l) => sum + l.totalSeconds, 0)) : '0 hrs'}</span>
        </div>
      </div>
    </div>
  )
}
