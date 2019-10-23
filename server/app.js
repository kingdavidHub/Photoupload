const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary');
const Photo = require('./models/PhotoSchema');
const { dateHolder } = require('./helper/');

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

// ! the type name of input in Upload.js component
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const newPhoto = new Photo({
            photourl: result.secure_url,
            date: dateHolder()
        });
        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw err;
            }
        });
        await newPhoto.save();
        return res.status(200);
    } catch (error) {
        res.status(500);
        throw error;
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