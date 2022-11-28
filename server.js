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

    return res.status(200).send(`<h2>Here is the picture:</h2><img src="${req.file.filename}" alt="something" />`);
})

server.post('/upload-cat-pics', upload.array('cat_pics', 5), (req, res) => {
    console.log(req.files)
    if (!req.files) return res.status(400).send(`Please upload many cat pics!`);
    const allCatPics = req.files.map(
      (image) => `<div> <img src="${image.filename}" alt="something" /></div>`
    ).join('');
 return res.status(200).send(`<h2>here are your pics: </h2>${allCatPics}`)
})

// error handling middleware you always need 4 parameters. (need to pass with the following structure err, req, res and next )
server.use((err, req, res, next) => {
    return res.status(500).send(`<h2>${err.message}</h2>`)
})


server.listen(port, () => console.log(`Connected to port ${port}`))