const express = require('express');
const app=express();

const userRoutes=require('./server/routes/user');
const noteRouter=require('./server/routes/notes');

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "/public/bmi.html")));


app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept,Authorization");
  res.header("Aceess-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use("/user",userRoutes);
// app.use("/notes",noteRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));