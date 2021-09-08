import React from 'react';
import axios from 'axios';




class Weather extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            Weatherappear: [],

        }
    }
    async getWeather(name,data) {


        let weatherURL = `${process.env.REACT_APP_SERVER_LINK}weather?cityName=${name}&cityLat=${data.lat}&citylon=${data.lon}`
        let weatherData = await axios.get(weatherURL)
        // console.log(weatherData);
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
       

        this.setState({

            Weatherappear: weatherArr,
        })

        

    }

    render() {
     
     
        return (
            <>
           

                {this.state.Weatherappear}

            </>
        );
    }
}



export default Weather;
