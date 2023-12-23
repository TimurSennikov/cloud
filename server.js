const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/files', async (req, res) => {
  try {
    const files = await fs.promises.readdir('files');
    res.json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/download',(req, res) => {
res.download("list.txt");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

