const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const filestoredir = 'files/'
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filestoredir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer ({ storage: storage});

app.use(express.static('public'));

app.get ('/files', async (req,res) => {
	try {
		const files = await fs.promises.readdir('files');
		res.json({files});
	}
	catch (error) {
		console.error(error);
	}
});

app.get('/download:file', async (req, res) => {
	try {
	const name = req.params.file;

	const filePath = path.join(__dirname, filestoredir, req.params.file);

	const fileStream = fs.createReadStream(filePath);

	res.setHeader(`'Content-Disposition', 'attachment'; filename=${name}`);
	
	res.setHeader('Content-Type', 'application/json');

	console.log("download");

	fileStream.pipe(res);
	}
	catch (error) {
	console.error(error);
	}
});

app.post('/upload', upload.single('file'), (req, res) => {
res.send('File uploaded successfully!');
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
