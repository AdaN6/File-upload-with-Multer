const express = require('express')
const server = express();
const port = process.env.PORT || 4000;
const multer = require("multer");
const {upload} = require('./lib/multerConfig')




server.use(express.static('views'));
server.use(express.static('.'));

server.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log(req.file);

    if (!req.file) 
    // return res.status(400).send("Please upload a file");
    throw new Error('Please upload an image');

    return res.status(200).send(`<h2>Here is the picture:</h2><img src="${req.file.path}" alt="something" />`);
})

server.post('/upload-cat-pic', (req, res) => {
    
})

// error handling middleware you always need 4 parameters. (need to pass with the following structure err, req, res and next )
server.use((err, req, res, next) => {
    return res.status(500).send(`<h2>${err.message}</h2>`)
})


server.listen(port, () => console.log(`Connected to port ${port}`))