import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'


class Movie extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            movieAppear: [],

        }
    }
    async getMovies() {


        let movieURL = `${process.env.REACT_APP_SERVER_LINK}movie?cityName=${this.props.locName}`
        let movieData = (await axios.get(movieURL)).data
        // console.log(movieData);
        console.log(movieData[2])
        let movieArr = []
        movieArr = movieData.map((element, idx) => {

            return (

                // <div key={idx}>
                //     {/* <p>movie number {idx + 1}</p>
                //     < p > Title : {element.title}</p >
                //     <p> Overview : {element.overview}</p>
                //     <p> Average_votes : {element.average_votes}</p>
                //     <p> Total_votes : {element.total_votes}</p>
                //     <p> Popularity : {element.popularity}</p>
                //     <p> Released_on : {element.released_on}</p>
                //     <p> Average_votes : {element.average_votes}</p> */}
                // </div >
                <Card style={{ margin: '25px' }} key={idx} >
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Text>
                            <p> Overview : {element.overview}</p>
                            <p> Average_votes : {element.average_votes}</p>
                            <p> Total_votes : {element.total_votes}</p>
                            <p> Popularity : {element.popularity}</p>
                            <p> Released_on : {element.released_on}</p>
                            <p> Average_votes : {element.average_votes}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>

            );
        });


        this.setState({

            movieAppear: movieArr,
        })

        this.props.manger();

    }

    render() {

        if (this.props.show) {
            this.getMovies()

        }

        return (
            
                
                <Row md={4} className="g-4">
                    {this.state.movieAppear}
                </Row>
            
        );
    }
}



export default Movie;
