import React, { Component } from 'react'
import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photodata: []
        };
    }
    componentDidMount() {
        axios.get("http://localhost:4000/gallery")
        .then((res) => {
            this.setState({
                photodata: res.data
            });
        })
        .catch((err) => {
            throw err;
        });
    }

    imageAlbum = () => {
        const photoArr = this.state.photodata;
        return photoArr.map(phArr => {
            return (
                <img src={phArr.photourl} style={{height: '300px', width: '300px', margin: '10px', borderRadius: '10px'}} alt="..."  key={phArr._id} />
            )
        });
    }



    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                { this.imageAlbum()}
            </div>
        )
    }
}


export default Home;