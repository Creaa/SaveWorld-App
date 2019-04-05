import React, { Component } from 'react'
import supportCountries from './../countriesList'
import './Input.css'

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: localStorage.getItem("value")
		}
	}
	inputHandler = (event) => {
		this.setState({
			inputValue: event.target.value
		})
		localStorage.setItem("value", event.target.value)
	}
	clearInput = () => {
		this.setState({
			inputValue: ""
		})
		this.props.clearList()
		localStorage.removeItem("value")
	}

	render() {
		return (
			<div className="input">
				<input onChange={this.inputHandler} type="text" name="country" className="country-input" placeholder="Select country..." value={this.state.inputValue} list="country" />
				<datalist id="country">
					{supportCountries.map((el, key) => {
						return <option key={key} value={el.country} />
					})}
				</datalist>
				<button onClick={this.props.submitHandler} value={this.state.inputValue} className="button submit">Submit</button>
				<button onClick={this.clearInput} className="button clear">Clear</button>
			</div >
		)
	}
}
