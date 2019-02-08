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
				const attackerPosition = { x: e.clientX, y: e.clientY }

				if (attackerIsNearVictim(attackerPosition, victimsPosition, minimumDistance)) {
					setVictimsMood(stressed)
					setVictimsPosition(
						newSafePostion({ width: window.innerWidth, height: window.innerHeight }, objectWidth),
					)
				}
			}}
			style={{
				width: '100vh',
				height: '100vh',
				minWidth: '100%',
				cursor: `url(${devil}), auto`,
			}}
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

const attackerIsNearVictim = (attackerPosition, victimsPosition, distance) => (
	(Math.abs(victimsPosition.x - attackerPosition.x) < distance
		&& Math.abs(victimsPosition.y - attackerPosition.y) < distance)
)

const newSafePostion = (windowSize, objectSize) => (
	{
		x: Math.floor(Math.random() * (windowSize.width - objectSize)),
		y: Math.floor(Math.random() * (windowSize.height - objectSize)),
	}
)

export { newSafePostion, attackerIsNearVictim }

export default App
