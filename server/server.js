const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path'); 
const { convertFileToGLB } = require('./glbConverter');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: './public',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    const convertedFiles = await convertToGLB(files);
    res.status(200).send(convertedFiles);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function convertToGLB(files) {
  const convertedFiles = [];
  for (const file of files) {
    if (file.mimetype === 'application/octet-stream') {
      const inputFilePath = path.join(__dirname, 'public', file.filename);
      const outputFilePath = path.join(__dirname, 'public', file.filename.replace(/\.[^/.]+$/, '.glb'));
      await convertFileToGLB(inputFilePath, outputFilePath); // Use convertFileToGLB from imported module
      convertedFiles.push(outputFilePath);
    }
  }
  return convertedFiles;
}

