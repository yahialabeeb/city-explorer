import React from 'react';
import axios from 'axios';




class Weather extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            Weatherappear: [],

        }
    }
    async getWeather() {


        let weatherURL = `${process.env.REACT_APP_SERVER_LINK}/weather?cityName=${this.props.locName}&cityLat=${this.props.cityData.lat}&citylon=${this.props.cityData.lon}`
        let weatherData = await axios.get(weatherURL)
        console.log(weatherData);
        console.log(weatherData.data[0].description)
        let weatherArr = []
        if (weatherData.data[0].description !== undefined) {
            weatherArr = weatherData.data.map((element, idx) => {

                return (

                    <div key = {idx}> 
                        < p > Date : {element.date}</p > <p>Description : {element.description}</p>
                    </div >

                );
            });
        }
        else {

            weatherArr = <p>{weatherData.data[0]}</p>

        }

        this.setState({

            Weatherappear: weatherArr,
        })

        this.props.manger();

    }

    render() {
     
        if (this.props.show) {
            this.getWeather()
            
        }

        return (
            <>
                {/* <button onClick = {this.getWeather}>
                explor
            </button> */}

                {this.state.Weatherappear}

            </>
        );
    }
}



export default Weather;
