const express = require('express')
const server = express();
const multer = require('multer');
const port = process.env.PORT || 4000;


const storage = multer.diskStorage({
    desitnation: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`)
    },
});

const upload = multer({storage: storage});

server.use(express.static('views'));


server.post("/upload-profile-pic", upload.single('profile_pic'), (req, res) => {
res.send('You posted to /upload-profile-pic ');
})


server.listen(port, () => console.log(`Connected to port ${port}`))