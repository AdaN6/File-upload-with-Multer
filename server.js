require('dotenv').config();
const express = require('express')
const server = express();
const port = process.env.PORT || 7000;
const {upload} = require('./lib/multerConfig')
const pool = require('./DB/dbConnection');

server.use(express.static('views'));
server.use(express.static('.'));
server.use(express.static("uploads"));

server.get('/get-pics', async (req, res, next) => {
try {
 const { rows } = await pool.query("SELECT name, filename FROM pictures")
 const allCatPics = rows.map(
     (image) => {
        // console.log(image);
     return `<li><a href="${image.filename}">${image.name}</a></li>`}
   )
   .join("");
// const allCatPics = rows
//     .map(
//     (image) => `<div> <img src="${image.filename}" alt="something" /></div>`
//     )
//     .join("");
 return res.status(200).send(`<ul>${allCatPics}</ul>`);
} catch (error) {
    next(error)
}
})

// ---- for non DB
// server.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
//     console.log(req.file);

//     if (!req.file) 
//     // return res.status(400).send("Please upload a file");
//     throw new Error('Please upload an image');

//     return res.status(200).send(`<h2>Here is the picture:</h2><img src="${req.file.filename}" alt="something" />`);
// })

// --- DB from elephantSQL
server.post("/upload-profile-pic", upload.single("profile_pic"), async (req, res) => {
  console.log(req.file);
  const {originalname, path, filename} = req.file
// -- all datas
//   const postImageDetails = await pool.query(
// -- only rows
  const { rows: [fileDetails]} = await pool.query(
    // --- before sanatise your datas
    // `INSERT INTO pictures (name, path, filename) VALUES (${originalname}, ${path}, ${filename})`,[])
    // -- after sanatise your datas
    `INSERT INTO pictures (name, path, filename) VALUES ($1, $2, $3) RETURNING *`,
    [originalname, path, filename]
  ); 
//   console.log(postImageDetails);
  if (!req.file)
    // return res.status(400).send("Please upload a file");
    throw new Error("Please upload an image");
  return res
    .status(200)
    .send(
      `<h2>Here is the picture:</h2><img src="${fileDetails.filename}" alt="something" />`
    );
});

server.post('/upload-cat-pics', upload.array('cat_pics', 5), (req, res) => {
    console.log(req.files)
    if (!req.files) return res.status(400).send(`Please upload many cat pics!`);
    const allCatPics = req.files.map(
      (image) => `<div> <img src="${image.filename}" alt="something" /></div>`
    ).join('');
 return res.status(200).send(`<h2>here are your pics: </h2>${allCatPics}`)
})

// --- error handling middleware you always need 4 parameters. (need to pass with the following structure err, req, res and next )
server.use((err, req, res, next) => {
    return res.status(500).send(`<h2>${err.message}</h2>`)
})


server.listen(port, () => console.log(`Connected to port ${port}`))