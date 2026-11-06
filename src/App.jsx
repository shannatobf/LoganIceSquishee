import { useState } from 'react'
import './App.css'

const modes = [
  {
    id: 'ice',
    name: 'Ice',
    label: 'frozen sparkle',
    badge: 'Cool and crunchy',
    stat: '100%',
    detail: 'Chill vibes and icy fun',
  },
  {
    id: 'sun',
    name: 'Sun',
    label: 'sunshine sizzle',
    badge: 'Bright and happy',
    stat: 'Sunbeam',
    detail: 'Warm, happy, and extra giggly',
  },
]

const sparkles = Array.from({ length: 12 }, (_, index) => index)
const confettiBits = Array.from({ length: 20 }, (_, index) => index)
const balloonPalette = ['#ff6b6b', '#ffb703', '#7fe7ff', '#9be7a0', '#b99cff', '#ff8cc6', '#ffd166']

function App() {
  const [mode, setMode] = useState('ice')
  const [isSquished, setIsSquished] = useState(false)
  const [reaction, setReaction] = useState('POW')
  const [isMoving, setIsMoving] = useState(false)
  const [isPartyMode, setIsPartyMode] = useState(false)
  const [partyBalloons, setPartyBalloons] = useState([])
  const [babySquishies, setBabySquishies] = useState([])

  const handleSquish = () => {
    setIsSquished(true)
    const reactions = ['POW', 'POP', 'BOING']
    const currentIndex = reactions.indexOf(reaction)
    const nextIndex = (currentIndex + 1) % reactions.length
    const nextText = reactions[nextIndex]

    setReaction(nextText)
    window.setTimeout(() => setIsSquished(false), 760)
  }

  const handleMove = () => {
    setIsMoving(true)
    window.setTimeout(() => setIsMoving(false), 1500)
  }

  const handleParty = () => {
    const balloons = Array.from({ length: 12 }, (_, index) => ({
      id: Date.now() + index,
      left: 8 + Math.random() * 82,
      color: balloonPalette[index % balloonPalette.length],
      delay: index * 0.08,
      drift: (Math.random() - 0.5) * 80,
    }))

    setPartyBalloons(balloons)
    setIsPartyMode(true)
    setIsMoving(true)
    setIsSquished(true)
    setReaction('BOING')

    window.setTimeout(() => {
      setIsSquished(false)
      setIsMoving(false)
      setIsPartyMode(false)
    }, 1800)

    window.setTimeout(() => {
      setPartyBalloons([])
    }, 3500)
  }

  const handleAddBaby = () => {
    const nextBaby = {
      id: Date.now() + Math.random(),
      x: 18 + Math.random() * 64,
      y: 16 + Math.random() * 48,
      size: 34 + Math.random() * 20,
      tint: ['#ffd4ef', '#d9f5ff', '#fff4b0'][Math.floor(Math.random() * 3)],
    }

    setBabySquishies((current) => [...current, nextBaby])
  }

  const handleClearBabies = () => {
    setBabySquishies([])
  }

  return (
    <div className={`app ${mode}`}>
      <header className="topbar">
        <div className="brand" aria-label="Logan's Squishee Island">
          <span className="brand-mark" aria-hidden="true">❄️</span>
          <span>Logan&apos;s Squishee Island</span>
        </div>
      </header>

      <main className="hero">
        <div className="copy">
          <div className="title-wrap" aria-label="Logan's Squishee Island title">
            <span className="bubble bubble-pink">LOGAN&apos;S</span>
            <span className="bubble bubble-blue">SQUISHEE</span>
            <span className="bubble bubble-yellow">ISLAND</span>
          </div>

          <p className="subtitle">
            Tap a button and watch Logan&apos;s squishee switch from icy cool to sunny
            happy and playful fun.
          </p>

          <div className="control-stack">
            <div className="activity-panel" aria-label="Squishee activity panel">
              <div className="activity-panel-label">SQUISHEE ACTIVITY PANEL</div>

              <div className="activity-controls">
                <button type="button" className="action-button move-action" onClick={handleMove}>
                  MOVE
                </button>
                <button type="button" className="action-button pop-action" onClick={handleSquish}>
                  SQUISH
                </button>
                <button type="button" className="action-button party-action" onClick={handleParty}>
                  LET&apos;S PARTY
                </button>
                <div className="mini-action-row">
                  <button type="button" className="plus-button" onClick={handleAddBaby} aria-label="Add baby squishee">
                    + SQUISHEES
                  </button>
                  <button type="button" className="clear-button mini-clear" onClick={handleClearBabies}>
                    CLEAR
                  </button>
                </div>
              </div>
            </div>

            <div className="theme-panel" aria-label="Squishee theme panel">
              <div className="theme-panel-label">CHANGE THEME</div>
              <div className="mode-menu-wrap">
                <div className="mode-menu" aria-label="Squishee states">
                  {modes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={item.id === mode ? 'mode-button active' : 'mode-button'}
                      onClick={() => setMode(item.id)}
                      aria-pressed={item.id === mode}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-clear-wrap">
            <button type="button" className="clear-button bottom-clear" onClick={handleClearBabies}>
              CLEAR
            </button>
          </div>
        </div>

        <div className="scene" aria-live="polite">
          <div className="island-scene" aria-hidden="true">
            <div className="sand-sheen" />
            <div className="island-ring" />
            <div className="island" />
            <div className="palm palm-left">
              <span className="trunk" />
              <span className="leaf leaf-1" />
              <span className="leaf leaf-2" />
              <span className="leaf leaf-3" />
              <span className="leaf leaf-4" />
            </div>
            <div className="palm palm-right">
              <span className="trunk" />
              <span className="leaf leaf-1" />
              <span className="leaf leaf-2" />
              <span className="leaf leaf-3" />
              <span className="leaf leaf-4" />
            </div>
            <div className="wave wave-one" />
            <div className="wave wave-two" />
          </div>

          <div className={`squishee-shell ${isMoving ? 'moving' : ''} ${isPartyMode ? 'party-mode' : ''}`}>
            <div
              className={`squishee ${mode} ${isSquished ? 'squished' : ''} ${reaction.toLowerCase()} ${isPartyMode ? 'party-mode' : ''}`}
              data-mode={mode}
            >
              <div className="cloud cloud-one" />
              <div className="cloud cloud-two" />
              <div className="cup">
                <div className={`drink ${mode}`}>
                  <div className="drink-surface" />
                  <div className="weather-badge" aria-hidden="true">
                    <span className="weather-icon ice-symbol">❄️</span>
                    <span className="weather-icon sun-symbol">☀️</span>
                    <span className="weather-icon rain-symbol">🌧️</span>
                  </div>
                  <div className="diamond-burst" aria-hidden="true">
                    {Array.from({ length: 14 }, (_, index) => (
                      <span
                        key={index}
                        className="diamond"
                        style={{
                          left: `${12 + index * 6}%`,
                          top: `${18 + (index % 5) * 12}%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="squishy-face">
                    <span className="eye left" />
                    <span className="eye right" />
                    <span className="blush left" />
                    <span className="blush right" />
                    <span className="smile" />
                    <span className="mouth-open" />
                  </div>
                  {mode === 'ice' && (
                    <div className="theme-spark-layer" aria-hidden="true">
                      {sparkles.map((sparkle) => (
                        <span key={sparkle} className={`spark sparkle-${sparkle}`} />
                      ))}
                      <div className="diamond-burst">
                        {Array.from({ length: 14 }, (_, index) => (
                          <span
                            key={index}
                            className="diamond"
                            style={{
                              left: `${12 + index * 6}%`,
                              top: `${18 + (index % 5) * 12}%`,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {mode === 'sun' && (
                    <div className="theme-sun-layer" aria-hidden="true">
                      <span className="sun-orb" />
                      <span className="sun-ray ray-1" />
                      <span className="sun-ray ray-2" />
                      <span className="sun-ray ray-3" />
                      <span className="sun-ray ray-4" />
                      <span className="sun-ray ray-5" />
                      <span className="sun-ray ray-6" />
                      <span className="sun-ray ray-7" />
                      <span className="sun-ray ray-8" />
                    </div>
                  )}

                  <div className="pop-burst" aria-hidden="true" />
                </div>
                {mode === 'ice' && <div className="straw" />}
              </div>
              <div className="legs" aria-hidden="true">
                <span className="leg left" />
                <span className="leg right" />
              </div>

              {babySquishies.map((baby) => (
                <div
                  key={baby.id}
                  className="baby-squishee"
                  style={{
                    left: `${baby.x}%`,
                    top: `${baby.y}%`,
                    width: `${baby.size}px`,
                    height: `${baby.size * 0.72}px`,
                    background: `linear-gradient(180deg, ${baby.tint}, #8bd6ff)`,
                  }}
                >
                  <span className="baby-eye left" />
                  <span className="baby-eye right" />
                  <span className="baby-smile" />
                  <span className="baby-wheel left" />
                  <span className="baby-wheel right" />
                </div>
              ))}

              {isPartyMode && (
                <div className="party-confetti" aria-hidden="true">
                  {confettiBits.map((piece) => (
                    <span
                      key={piece}
                      className={`confetti piece-${piece}`}
                      style={{
                        background: ['#ff7eb6', '#ffd166', '#7fe7ff', '#9be7a0', '#b99cff', '#ff6b6b'][piece % 6],
                        left: `${8 + ((piece * 11) % 80)}%`,
                        animationDelay: `${piece * 0.06}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {partyBalloons.length > 0 && (
                <div className="party-balloons" aria-hidden="true">
                  {partyBalloons.map((balloon) => (
                    <span
                      key={balloon.id}
                      className="party-balloon"
                      style={{
                        left: `${balloon.left}%`,
                        background: balloon.color,
                        animationDelay: `${balloon.delay}s`,
                        ['--drift']: `${balloon.drift}px`,
                      }}
                    >
                      <span className="balloon-string" />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
