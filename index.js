const express = require('express');
const app = express();
const {readFile} = require('fs')

app.get('/', (req, res,next) => {
  readFile('/file-not-exist','utf-8',(err,data)=>{
    if(err){
      next(err);
    }else{
      res.send(data)
    }
  })
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