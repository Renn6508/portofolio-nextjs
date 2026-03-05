export default function Ticker() {
  const items = ['React', 'Node.js', 'TypeScript', 'UI/UX Design', 'GSAP', 'Next.js', 'Three.js', 'Figma', 'MongoDB', 'REST APIs']
  const doubled = [...items, ...items]

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}<span className="ticker-sep"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  )
}
