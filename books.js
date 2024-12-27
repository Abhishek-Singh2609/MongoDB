const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');
main().then(()=>{
    console.log("Connected Successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}
const bookSchema = new mongoose.Schema({
  title:{
    type: String,
    required :true,
    maxLength:20
  },
  author:{
    type:String
  },
  price:{
    type:Number,
    min:[1,"Price is too low for Amazon selling"],
  },
  Discount:{
    type:Number,
    default: 0
  },
  Category:{
    type: String,
    enum:["fiction" ,"non-fiction"],
  },
  genre: [String]

});
const Book= new mongoose.model("Book",bookSchema);
Book.findByIdAndUpdate("65bbe9ae09d46d496e82a87c",{price:-500},{runValidators:true}).then((res)=>{
console.log(res);
}).catch((err)=>{
  console.log(err.errors.price.properties.message);
})
// let book1 = new Book({
//   title: "Gone yark version2",
//   price:"399",
//   Category:"fiction",
//   genre:["comiccs","marvel","juilier","mansplider","Shaktiman"]
// })
// book1.save().then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// })