import React, { Component } from 'react'
import Icon from './../icon.png'
import './Header.css';

export default class Header extends Component {
	render() {
		return (
			<header className="header">
				<h1 className="title">SaveWorld App</h1>
				<img src={Icon} className="icon" alt="site-icon" />
			</header>
		)
	}
}
