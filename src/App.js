import React from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './component/Weather.js';
import Movie from './component/Movie.js'
import Form from 'react-bootstrap/Form';
// import Image from 'react-bootstrap/Image'
import Location from './component/Location.js';
// import "bootstrap/dist/css/bootstrap.min.css";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: {},
      locName: ' ',
      showError: false,
    }
    this.location = "location"
  }
  getData = async (e) => {

    e.preventDefault();

    await this.setState({
      locName: e.target.cityname.value,

    })

    this.refs.location.getLocation();



  }
  sendData = async (data) => {
    await this.setState({
      locData: data,
    })
    this.refs.weather.getWeather(this.state.locName, this.state.locData);
    this.refs.movie.getMovies(this.state.locName);

  }

  render() {
    return (
      <>
      <>
        <h2 style={{ padding: 20 }}>
          City explorer
        </h2>
        <Form.Label>CITY NAME</Form.Label>
        <form onSubmit={this.getData}>

          <input type="text" name="cityname" placeholder="enter city name" />
          <button variant="info" >
            EXPLORE
          </button>
        </form>

        {this.state.showError && <p>Sorry Error</p>}
</>
<>
        <Location ref={this.location}
          locName={this.state.locName}
          sendData={this.sendData}
        />

        <Weather ref={'weather'} />

        <Movie ref={'movie'} />
</>
      </>
    );
  }
}


export default App;
