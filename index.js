const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('hello chaudhuree');
})


// note: router not found 
app.use((req, res, next) => {
  next('request url was not found!!');
})


// note: error handling middleware need to be the last middleware in the file 
// imp: 
app.use((err, req, res, next) => {
  // docs:all error related things will be found in the error obj 
  if (res.headerSent) {
    next('there was a problem');
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send('there was an error!!')
    }
  }

})

app.listen(5000, () => console.log('server is running'))