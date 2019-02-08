/* eslint-disable no-underscore-dangle */
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App, { newSafePostion, attackerIsNearVictim } from './App'

configure({ adapter: new Adapter() })

describe('<App /> UI Component', () => {
	test('renders default UI', () => {
		expect(shallow(<App />).find('div').length).toBe(1)
	})

	test('invokes mouseMove', () => {
		const _mouseMove = jest.fn()
		shallow(<App onMouseMove={_mouseMove} />).find('div').simulate('mouseMove', { clientX: 50, clientY: 50 })
		expect(_mouseMove).toHaveBeenCalled()
	})
})

describe('postion change', () => {
	test('position x does not exceed window width', () => {
		const pos = newSafePostion({ width: 20, height: 20 }, 10)
		expect(pos.x).toBeLessThan(10)
		expect(pos.x).toBeGreaterThanOrEqual(0)
	})

	test('position y does not exceed window height', () => {
		const pos = newSafePostion({ width: 20, height: 20 }, 10)
		expect(pos.y).toBeLessThan(10)
		expect(pos.y).toBeGreaterThanOrEqual(0)
	})
})

describe('attacker is near victim', () => {
	test('attacker is near victim', () => {
		const isNear = attackerIsNearVictim({ x: 40, y: 40 }, { x: 40, y: 40 }, 100)
		expect(isNear).toBeTruthy()
	})

	test('attacker is far from victim', () => {
		const isNear = attackerIsNearVictim({ x: 40, y: 40 }, { x: 340, y: 200 }, 100)
		expect(isNear).toBeFalsy()
	})
})
