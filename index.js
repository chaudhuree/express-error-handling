const express = require('express');
const app = express();
const {readFile} = require('fs')

app.get('/', (req, res,next) => {
  readFile('/file-not-exist','utf-8',(err,data)=>{
    if(err){

      next(err); //imp: ref:1 
    }else{
      res.send(data)
    }
  })
})

// docs: 
// if next has error parameter like ref:1 
// then this middleware will not becalled
// it will directly go to the error handler
app.use((req, res, next) => {
  console.log('i am not called');
  next()
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