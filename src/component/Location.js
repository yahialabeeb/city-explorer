import React from 'react';
import axios from 'axios';

import Image from 'react-bootstrap/Image'

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locData: {},
            mapURL: '',
            showData: false
        }
        this.location = React.createRef();
    }
    async getLocation() {

        let locURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.props.locName}&format=json`;

        let comingData = await axios.get(locURL)

        this.props.sendData(comingData.data[0])
        console.log('s', comingData.data[0]);

        await this.setState({
            locData: comingData.data[0],
        })

        let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locData.lat},${this.state.locData.lon}&format=json`

        await this.setState({
            mapURL: mapUrl,
            showData: true
        })
    }


    render() {

        return (
            <>

                {this.state.showData &&
                    <>
                        <p style={{ padding: 20 }}>{this.state.locData.display_name}  :  Lat:{this.state.locData.lat}  /  Lon:{this.state.locData.lon} </p>


                        <Image style={{ marginLeft: '200px', padding: 10 }} src={this.state.mapURL} roundedCircle />

                        <h3>Weather for one week</h3>


                    </>
                }

            </>
        );
    }
}
export default Location;
