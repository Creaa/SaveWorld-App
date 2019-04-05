import React, { Component } from 'react'
import smoke from "../smoke.png"
import "./Smoke.css"

export default class Smoke extends Component {
	render() {
		return (
			<div className="smoke-wrapper">
				<img src={smoke} alt="smog" className="smoke">
				</img>
			</div>
		)
	}
}
