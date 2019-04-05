import React, { Component } from 'react';
import './App.css';
import List from './components/List'
import Smoke from './components/Smoke'
import Input from './components/Input'
import Header from './components/Header'
import supportCountries from './countriesList'
import axios from 'axios';
import '../node_modules/aos/dist/aos.css';
import AOS from 'aos';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      citiesList: [],
      country: undefined,
      limit: 10,
      test: false,
    }
    AOS.init();
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(`https://api.openaq.org/v1/measurements?country=${this.state.countryCode}&parameter=pm25&limit=50&sort=desc&order_by=value&date_from=2019-02-01T01:00:00&date_to=2019-02-02T23:00:00`)
      .then(res => {
        this.makeRanking(res.data.results)
      })

  }

  makeRanking = (data) => {
    let rankingList = [];
    for (let i = 0; i < data.length; i++) {
      let cityIsOnList = false;
      rankingList.forEach(el => {
        if (el.city === data[i].city) {
          cityIsOnList = true;
        }
      })
      if (!cityIsOnList) {
        rankingList.push(data[i]);
      }
      if (rankingList.length === this.state.limit) {
        break;
      }
    }
    this.addDescriptionToList(rankingList)
  }

  async addDescriptionToList(rankingList) {
    let array = rankingList
    await array.forEach(el => {
      let description;
      axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${el.city}&origin=*`)
        .then(res => {
          description = res.data.query.pages[Object.keys(res.data.query.pages)[0]].extract;
          if (description) {
            description = description.split(".");
            description = description.slice(0, 3).join(".");
            el.description = description;
            this.setState({
              citiesList: rankingList
            })
          }
        })
    })
  }

  submitHandler = (event) => {
    supportCountries.forEach(el => {
      if (el.country === event.target.value) {
        this.setState({
          countryCode: el.code
        })
        setTimeout(() => {
          this.fetchData()
        }, 1);
      }
    })
  }

  clearList = () => {
    this.setState({
      citiesList: []
    })
  }

  render() {
    return (
      <div
        data-aos="fade-in"
        data-aos-offset="300"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
        className="App">
        <Smoke />
        <div className="app-wrapper">
          <Header />
          <Input clearList={this.clearList} submitHandler={this.submitHandler} />
          {this.state.citiesList.length > 0 ? <List citiesList={this.state.citiesList} /> : false}
        </div>

      </div>
    );
  }
}

export default App;
