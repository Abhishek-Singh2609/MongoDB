const express =require("express");
const app = express();
const mongoose =require("mongoose");
const path = require("path")
const chat =require("./models/chat.js")
const methodOverride =require("method-override");

app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then((res)=>{
    console.log("connection successful");
}).catch((err) => {console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats",async (req,res)=>{
     let chats = await chat.find()
     console.log(chats);
     res.render("index.ejs",{chats})
})
//New chat Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
// create route
app.post("/chats",(req,res)=>{
let {from,to,msg} = req.body;
 let newchat =new chat({
    from:from,
    to :to,
    msg:msg,
    created_at:new Date(),
    updated_at:new Date(),
 });
 newchat.save().then((res)=>{
console.log("chat was saved")
 }).catch((err)=>{
    console.log(err);
 })
 res.redirect("/chats")
});
//Edit routes
app.get("/chats/:id/edit", async (req,res)=>{
    let { id } = req.params;
    let chats = await chat.findById(id);
    res.render("edit.ejs",{chats})
});
//Update routes 
app.put("/chats/:id",async (req,res)=>{
    let {id}= req.params;
    let {msg : newmsg, updated_at }=req.body;
    console.log(newmsg);
    let updatedchat = await chat.findByIdAndUpdate(id,{msg:newmsg,updated_at: new Date()},{runValidators:true,new:true});
    console.log(updatedchat);
    res.redirect("/chats");
});
//Destroy Route
app.delete("/chats/:id", async(req,res)=>{
let {id}= req.params;
let deletedchat =await chat.findByIdAndDelete(id);
console.log(deletedchat);
res.redirect("/chats")
})

app.get("/",(req,res)=>{
    res.send("root is working")
})

app.listen(8080,()=>{
    console.log("Server is listening on port 8080");
}
);