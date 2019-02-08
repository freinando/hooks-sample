import React, { useState, useEffect } from 'react'
import './App.css'
import chill from './assets/happy.jpg'
import stressed from './assets/stressed.png'
import devil from './assets/devil1.jpg'

const objectWidth = 40
const minimumDistance = 100

const App = () => {
	const [victimsPosition, setVictimsPosition] = useState({ x: 0, y: 0 })
	const [victimsMood, setVictimsMood] = useState(chill)
	useEffect(() => {
		document.title = `You are at ${victimsPosition.x}, ${victimsPosition.y}`
	}, [victimsPosition]) // Only re-run the effect if victimsPosition changes

	return (
		<div
			onMouseMove={(e) => {
				if (
					attackerPosition(e.clientX, e.clientY)
						.isLessThan(minimumDistance)
						.from(victimsPosition)
				) {
					setVictimsMood(stressed)
					setVictimsPosition(newSafePostion())
				}
			}}
			style={{ width: '100vh', height: '100vh', cursor: `url(${devil}), auto` }}
		>
			<img
				src={victimsMood}
				alt=""
				onTransitionEnd={() => setVictimsMood(chill)}
				style={victimsStyleAnd(victimsPosition)}
			/>
		</div>
	)
}

const victimsStyleAnd = victimsPosition => ({
	transform: `translate(${victimsPosition.x}px, ${victimsPosition.y}px)`,
	transition: 'transform .7s',
	width: `${objectWidth}px`,
	height: `${objectWidth}px`,
	position: 'relative',
	borderStyle: 'solid',
	color: 'white',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
})

const attackerPosition = (x, y) => ({
	mousePosition: { x, y },
	isLessThan(pixels) {
		return {
			mousePosition: { ...this.mousePosition },
			distance: pixels,
			from(position) {
				return (Math.abs(position.x - this.mousePosition.x) < this.distance
					&& Math.abs(position.y - this.mousePosition.y) < this.distance)
			},
		}
	},
})

const newSafePostion = () => (
	{
		x: Math.floor(Math.random() * (window.innerWidth - objectWidth)),
		y: Math.floor(Math.random() * (window.innerHeight - objectWidth)),
	}
)

export default App
