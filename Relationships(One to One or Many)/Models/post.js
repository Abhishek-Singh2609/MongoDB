const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
const userSchema = new Schema({
 username:String,
 email:String
});
const postSchema = new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
const User= mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);
// const addData= async ()=>{
//     // let user1 = new User({           
//     //     username:"RahulKumar",
//     //     email:"rahul@gmail.com"
//     // });
//     let user = await User.findOne({ username:"RahulKumar"});
//     // let post1 =new Post({
//     //     content:"hello World!",
//     //     likes:7,
//     // });
//     let post2 =new Post({
//         content:"Bye Bye :)",
//         likes:23,
//     });
//     post2.user=user;
//     // await user1.save();
//     // await post1.save();
//     await post2.save();
// }
// addData();

//to get the all information of user of different post from DB using populate method
const getData= async ()=>{
    let result = await Post.find({}).populate("user","username");  //username add to get only from user from db
    console.log(result);
}
getData();