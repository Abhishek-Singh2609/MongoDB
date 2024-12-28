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
const orderSchema = new Schema({
  item: String,
  price: Number,
});
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// customerSchema.pre("findOneAndDelete", async()=>{
//   console.log("pre middleware");
// });
customerSchema.post("findOneAndDelete",async (customer)=>{
  if (customer.orders.length) {
    let res =await Order.deleteMany({ _id: { $in:customer.orders }})
    console.log(res);
  }
})

 const Order= mongoose.model("Order",orderSchema);
const Customer =mongoose.model("Customer",customerSchema);

const findCustomer  = async()=>{
// let cust1 = new Customer({
//     name : "Rahul Singh",
// });
// let order1= await Order.findOne({item:"Chips"});
// let order2= await Order.findOne({item:"Choclate"});

// cust1.orders.push(order1);
// cust1.orders.push(order2);
// let result= await cust1.save();
// console.log(result);
let res =await Customer.find({}).populate("orders");
// console.log(res[0]);
};
findCustomer();

// const addOrders = async ()=>{
//     let res= await Order.insertMany([
//        { item: "Samosa",price:12},
//        { item: "Chips",price:10},
//        { item: "Choclate",price:40},
//     ]);
//     console.log(res);
// }
// addOrders();

const addCust= async ()=>{
  let newCust= new Customer({
    name:"Karan Arjun"
  })

  let newOrder= new Order({
    item:"burger",
    price:250
  });
  newCust.orders.push(newOrder);
  await newOrder.save();
  await newCust.save();
  console.log("added new customer");
}

const delCust=async ()=>{
  let data = await Customer.findByIdAndDelete('65de1d8e24693bd9ca5add28');
  console.log(data);
};
// addCust();
delCust();