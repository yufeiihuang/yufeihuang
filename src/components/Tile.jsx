import { withBase } from '../utils.js'

const SHEET_W = 968
const SHEET_H = 526
const PITCH = 17

const SIZE_X_PCT = (SHEET_W / 16) * 100
const SIZE_Y_PCT = (SHEET_H / 16) * 100

export default function Tile({ col, row, style, className }) {
  const posX = (col * PITCH * 100) / (SHEET_W - 16)
  const posY = (row * PITCH * 100) / (SHEET_H - 16)
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${withBase('tiles/roguelike.png')})`,
        backgroundSize: `${SIZE_X_PCT}% ${SIZE_Y_PCT}%`,
        backgroundPosition: `${posX}% ${posY}%`,
        imageRendering: 'pixelated',
        ...style,
      }}
    />
  )
}
