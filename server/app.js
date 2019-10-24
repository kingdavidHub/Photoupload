const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const Photo = require('./models/PhotoSchema');
const { dateHolder, unlinkFile } = require('./helper/');

mongoose.connect('mongodb://localhost:27017/photoupload', { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true });


const app = express();
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_ID,
    api_secret: process.env.API_SECRET
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp/Public');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).array('file');

// ! upload multiple file code
app.post('/upload', upload, async (req, res) => {
     // ? array of multiple files
    const photoArray = req.files;
    for (let i = 0; i < photoArray.length; i++) {
        const result = await cloudinary.uploader.upload(photoArray[i].path, {folder: "Photo Upload", backup: true});
        const newPhoto = new Photo({
            photourl: result.secure_url,
            date: dateHolder()
        });
        
        await newPhoto.save()
        .then(result => {
            unlinkFile(photoArray[i].path);
        })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
           return res.status(500).json(err);
        })
    }
});

app.get('/gallery', async (req, res) => {
    try {
        const gallery = await Photo.find({});
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json(new Error(`can't get gallery`));
        throw err;
    }
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});