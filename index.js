require("./db/connection");
const model_cons = require("./schema/schema");

const bc = require("bcrypt");
const ejs = require("ejs");

const express = require("express");
const app = express();
const bp = require("body-parser");
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.set("view engine", "ejs"); //setting the template engine as ejs
const path = require("path");
const exactpath = path.join(__dirname, "views"); //setting the path for ejs files i.e the views folder path

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/forgotpass",(req,res)=>{
  res.render("forgotpass");
});
//Register Route
app.post("/signup", async (req, res) => {

   if(!req.body.email || !req.body.name || !req.body.job || !req.body.password || !req.body.cpassword){
      res.send("Fill all details")
   }
  const emailexist = await model_cons.findOne({ email: req.body.email });
  if (emailexist) {
    return res.send(
      "email id is exist ,kindly register with different email id"
    );}
//   } else if (req.body.password != req.body.cpassword) {
//     return res.send("password not matching with conifrm password");
   else {
    const name = req.body.name;
    const email = req.body.email;
    const job = req.body.job;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    // const hashedpassword=  await bc.hash(password,10)

    const template = model_cons({
      name,
      email,
      job,
      password,
      cpassword
    });
    template.save();
    return res.send("registration sucess");
  }
});

//Login Route
app.post("/signin", async (req, res) => {
  const emailexist = await model_cons.findOne({ email: req.body.email });
  // const passwordmatch = bp.compare(req.body.password,emailexist.password) //method to comapre encrypted password
  if (!emailexist) {
    return res.send("user not exist ,kindly register first");
  } else if (req.body.password != emailexist.password) {
    return res.send("Password Incorrect");
  } else {
    return res.send("Signed in");
  }
});

app.post("/forgotpass", async(req,res)=>{
  console.log("requested")
  const emailexist = await model_cons.findOne({email: req.body.email});
  if(!emailexist){
    return res.send("User not Exist!")
  }
  else{
    emailexist.password = req.body.npassword
    emailexist.cpassword = req.body.npassword
    emailexist.save()
  }
})

app.listen(3000, () => {
  console.log("my server is running on 3000 port");
});
