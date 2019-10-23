import React, { Component } from 'react'
import '../upload.css';
import axios from 'axios';


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    onFormSubmit = e => {
        e.preventDefault();
    }

    onChangeHandler = e => {
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0
        });
    };

    onClickHandler = () => {
        const data = new FormData(); // * check the network on console and the formData is set in the headers
        data.append('file', this.state.selectedFile);

        axios.post("http://localhost:4000/upload", data)
        .then(res => {
            console.log(res.statusText);
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" className="form-control" multiple onChange={this.onChangeHandler} />
                            </div>
                            <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.onClickHandler} >Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Upload;