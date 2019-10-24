import React, { Component } from 'react'
import '../upload.css';
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        };
    }

    onChangeHandler = e =>{
        if(this.maxSelectFile(e) && this.checkMimeType(e) &&  this.checkFileSize(e)){
            this.setState({
                // * Targeting all files
                selectedFile: e.target.files,
            });
        }
    }

    //  * .... validation
    maxSelectFile = e => { // ? validate for the selected file
        let files = e.target.files;
        if(files.length > 3){
            const msg = 'Only 3 images can be uploaded at a time';
            e.target.value = null; // discard file
            toast.warn(msg);
            return false;
        }
        return true;
    }

    checkMimeType = e => {
        let files = e.target.files;
        let err = [];

        // mime types we allow
        const types = ['image/png', 'image/jpeg', 'image/gif'];
        for(let i = 0; i < files.length; i++){
            if(types.every(type => files[i].type !== type)){
                err[i] = `${files[i].type}  is not a supported format\n`;
                // assign message to array
            }
        };
        for (let i = 0; i < err.length; i++) { // loop through err msg
            e.target.value = null;
            toast.error(err[i]);
        }
        return true;
    };

    checkFileSize = e => {
        let files = e.target.files;
        let size = 2000000;
        let err = [];
         
        // allow my default fine size;
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > size) {
                // ? assing err[i] to the index value mssg
                err[i] = `${files[i].name} is too large, please pick a smaller file\n`;
            }
        };
        
        for (let i = 0; i < err.length; i++) {
            e.target.value = null;
           toast.error(err[i]);
        }
        return true;
    }
    //  * .... validation ends here

    // * ... submit handler
    onClickHandler = () => { // ? post to the database
        const data = new FormData(); // * check the network on console and the formData is set in the headers
        if(this.state.selectedFile !== null){
            for(let i = 0; i < this.state.selectedFile.length; i++){
            data.append('file', this.state.selectedFile[i]);
            }
            axios.post("http://localhost:4000/upload", data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100), // ? returns 0.01 and stores to the loaded state
                    });
                }
            })
            .then(res => { // print response
                toast.success('upload success');
            })
            .catch(err => {
                toast.error('upload fail');
            })
        }else {
            toast.error('No Image Selected');
        }
        
    };
    // * ... submit handler ends here



    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <ToastContainer />
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <form method="post" action="#" id="#">
                            <div className="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" className="form-control" multiple onChange={this.onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
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