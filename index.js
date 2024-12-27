const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');
main().then(()=>{
    console.log("Connected Successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})
const User =mongoose.model("User", userSchema);

User.findOneAndDelete({name:"tommy"}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});


// User.deleteMany({age:48}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// User.findOneAndUpdate({name:"lee"},{age:56},{new:true}).then((res)=>{
// console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.updateOne({name:"lee"},{age:49}).then((res)=>{
// console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


// User.findById('65b9079e81b791ba20be7e50').then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// })

// User.insertMany(
//     [
//         {name:"tommy",email:"tommy@gmail.com",age:23},
//         {name:"peter",email:"peter@gmail.com",age:25},
//         {name:"lee",email:"lee@gmail.com",age:22},
//     ]
// ).then((result)=>{
//     console.log(result);
// })


//  const user2 = new User({
//     name:"eve",
//     email:"eve@yahoo.in",
//     age: 48,
//  })
//  user2.save().then((result)=>{
//     console.log(result);
//  }).catch((err)=>{
//     console.log(err);
//  })