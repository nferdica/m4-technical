const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

