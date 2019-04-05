import React, { Component } from 'react'
import axios from 'axios';
import Collapsible from 'react-collapsible';
import './List.css'
import infoIcon from '../info-icon.png'
import './../../node_modules/aos/dist/aos.css';

export default class List extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	setAirCondition = (data) => {

		//   0 - 13 µg / m3 Very good
		// 13.1 - 37 µg / m3 Good
		// 37.1 - 61 µg / m3 Moderated
		// 61.1 - 85 µg / m3 Sufficient
		// 85.1 - 121 µg / m3 Bad
		//   > 121 µg / m3 - Very Bad
		// http://powietrze.gios.gov.pl/pjp/current

		switch (true) {
			case data > 0 && data <= 13:
				return "#4DA70C"
			case data > 13 && data <= 37:
				return "#A7D812"
			case data > 37 && data <= 61:
				return "#FFD313"
			case data > 61 && data <= 85:
				return "#E17504"
			case data > 85 && data <= 121:
				return "#E10003"
			case data > 121:
				return "#8E0002"

			default: break;
		}
	}

	showItem = (event) => {
		this.setState({
			cityDisplayed: event.target.getAttribute("city")
		})
	}
	hideItem = () => {
		this.setState({
			cityDisplayed: ""
		})
	}

	render() {
		return (
			<ul
				data-aos="fade-up"
				data-aos-offset="0"
				data-aos-delay="0"
				data-aos-duration="1000"
				data-aos-easing="ease-in-out"
				data-aos-once="true"
				className="ranking-list">
				{this.props.citiesList.map((el, k) => {
					return (
						<li city={el.city} onClick={this.elementClickHander} className="ranking-element" style={{ backgroundColor: this.setAirCondition(parseFloat(el.value).toFixed(2)) }} key={k}>
							<p city={el.city} className="element-city">{el.city}</p>
							<span city={el.city} className="element-parameters">{parseFloat(el.value).toFixed(2)} {el.unit}</span>
							<div className="description-bubble">
								<img onMouseOver={this.showItem} onMouseLeave={this.hideItem} city={el.city} src={infoIcon} className="info-icon" alt="info-icon" />
								<div style={{ visibility: this.state.cityDisplayed === el.city ? "visible" : "hidden" }} className="bubble">
									<p>
										{el.description}
									</p>
								</div>
							</div>
							<p className="city-description">
								{el.description}
							</p>
						</li>)
				})}
			</ul>
		)
	}
}
