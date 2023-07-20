const dotenv = require("dotenv");
const mongoose = require("mongoose");



// const url = "mongodb://0.0.0.0:27017/CS_dynamic";

const url =process.env.DATABASE;

async function connect() {
  try {
    await mongoose.connect(url);
    console.log('Database connected to mongodb');
  }
  catch (err) {
    console.log(err);
  }

}
connect();