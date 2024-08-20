/*const express = require('express') ;
const app = express() ;

const userModel  = require('./usermodel')

app.get('/',(req,res) => {
    res.send("hey") ;
})
app.get('/create',async (req,res) => {
 let createdUser   =  await  userModel.create({
    name : "harshita",
    email : "harsitah@gmail.com" ,
    username : "harshota"
 })
res.send(createdUser) ;
})
app.get('/update',async (req,res) => {
 let updatedUser  = await  userModel.findOneAndUpdate({username: "harsh"},{name : "harsh vandana sharma"},{new:true}) 
    res.send(updatedUser) ;
}) ;

app.get('/read',async (req,res) => {
    let readUser = await   userModel.find() ; 
    res.send(readUser) ;
})

app.get('/delete' , async (req,res) => {
    let users = await userModel.findOneAndDelete({username : "harshota"} ) ;
    res.send(users) ;
})
app.listen(3000) ;
*/

const express = require('express') ;
const app = express() ;
const path = require('path') ;
const userModel = require('./models/user') ;
app.set("view engine","ejs") ;

app.use(express.json()) ;
app.use(express.urlencoded({extended : true})) ;
app.use(express.static(path.join(__dirname,"public"))) ;


app.get('/' , (req,res) => {
    res.render("index") ;
})

app.get('/read' ,async (req,res) => {
  let allusers = await userModel.find() ;
    res.render("read",{users :allusers}) ;
 })

 app.get('/edit/:userid' ,async (req,res) => { 
   let user = await userModel.findOne({_id : req.params.userid}) ;
   res.render("edit",{user});
 })

 app.post('/update/:userid' ,async (req,res) => { 
    let {image,name,email} = req.body ;
   let user = await userModel.findOneAndUpdate({_id : req.params.userid}, {image,name,email},{new : true}) ;
   res.redirect("/read");
 })
app.get('/delete/:id' ,async (req,res) => {
  let allusers = await userModel.findOneAndDelete({_id : req.params.id}) ;
    res.redirect("/read") ;
 })

app.post('/create' ,async (req,res) => {
   let {name,email,image} = req.body ;
 let createdUser = await userModel.create({
    name : name,
    email : email,
    image : image
   })
   res.redirect("/read") ;
})



app.listen(3000) ;