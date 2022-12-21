const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(a)
  console.log('hello chaudhuree');
})


// note: router not found 
// express default error handler do not handle this error 
// because it is not server side error
// it is a error caused by user wrong input

app.use((req, res, next) => {
  // docs: 
  // we can handle this error from here by res.send

  // res.statue(404).send('no route found')

  // but if we want to send this error to the error middleware then do this 🔽🔽
  next('request url was not found!!');
})

//Note: normal use case
// app.use((err, req, res, next) => {
//   // docs:all error related things will be found in the error obj 
//   if (err.message) {
//     res.send(err.message);
//   } else {

//       res.status(500).send('there was an error!!')
//     }
// })

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

//docs: express default error handler
// app.use((err, req, res,next)=>{
//   // invisibley express handle error here
// })
app.listen(5000, () => console.log('server is running'))