// Happy coding guys
const express = require('express');
const app = express();

const userRouter = require("./routes/userRouter");
const { errorHandler } = require('./middlewares/errorHandler');

app.set("view engine", "ejs");

// app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

app.use(userRouter);

app.use(errorHandler);


// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })

module.exports = app;