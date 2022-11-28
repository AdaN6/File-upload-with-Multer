const express = require('express')
const server = express();
const port = process.env.PORT || 4000;
const multer = require("multer");
const {storage} = require('./lib/multerConfig')


const upload = multer({storage: storage});

server.use(express.static('views'));
server.use(express.static('.'));

server.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log(req.file);
    if (!req.file) return res.status(400).send('Please upload a file');
    return res.status(200).send(`<h2>Here is the picture:</h2><img src="${req.file.path}" alt="something" />`);
})


server.listen(port, () => console.log(`Connected to port ${port}`))