import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './component/Weather.js';
import Movie from './component/Movie.js'
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

// import "bootstrap/dist/css/bootstrap.min.css";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: {},
      locName: ' ',
      showData: false,
      showError: false,
      mapURL: '',
      show: false
    }
  }
  getData = async (e) => {

    e.preventDefault();

    await this.setState({
      locName: e.target.cityname.value,
    })


    if (this.state.locName === '') {
      await this.setState({
        showData: false,
        showError: true
      })
    }



    console.log('s', `${process.env.REACT_APP_LOCATIONIQ_KEY}`);
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.locName}&format=json`;

    let comingData = await axios.get(locURL)


    console.log('s', comingData.data[0]);

    await this.setState({
      cityData: comingData.data[0],
      showData: true

    })
    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&format=json`

    await this.setState({
      mapURL: mapUrl,
      showError: false,
      show: true
    })


  }

  manger = () => {
    console.log(this.state.show)
    this.setState({
      show: false
    })
  }
  render() {

    return (
      <>
        <h2 style={{ padding: 20}}>
          City explorer
        </h2>
        <Form.Label>CITY NAME</Form.Label>
        <form onSubmit={this.getData}>

          <input type="text" name="cityname" placeholder="enter city name" />
          <button variant="info" >
            EXPLORE
          </button>
        </form>

        {this.state.showData &&
          <>
            <p style={{ padding: 15 }}>{this.state.cityData.display_name} : Lat:{this.state.cityData.lat} / Lon:{this.state.cityData.lon} </p>


            <Image style={{ marginLeft: '150px', padding: 10 }} src={this.state.mapURL} roundedCircle />



            <h3>Weather for one week</h3>

            
          </>
        }
        {this.state.showError && <p>Sorry Error</p>}

        <Weather
          cityData={this.state.cityData}
          locName={this.state.locName}
          showData={this.state.showData}
          manger={this.manger}
          show={this.state.show}
        />
         {this.state.showData &&
        <h3> Movies  </h3>
        }
        <Movie
          cityData={this.state.cityData}
          locName={this.state.locName}
          showData={this.state.showData}
          manger={this.manger}
          show={this.state.show}
        />
       
      </>
    );
  }
}
export default App;
