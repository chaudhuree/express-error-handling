const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('hello chaudhuree');
})





app.listen(5000,()=> console.log('server is running'))