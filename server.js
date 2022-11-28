const express = require('express')
const server = express();
const multer = require('multer');
const port = process.env.PORT || 4000;
const path = require("path");


// you need to add an extension * remember to import path, otherwise wont work!
const storage = multer.diskStorage({
  desitnation: "uploads/",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extension}`);
  },
});


const upload = multer({storage: storage});

server.use(express.static('views'));

server.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log(req.file);
    return res.send('You posted to /upload-profile-pic ');
    
})


server.listen(port, () => console.log(`Connected to port ${port}`))