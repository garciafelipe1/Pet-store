const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      
      
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true, // Esto es para indices, no lo uses si no sabes
      // useFindAndModify: false // Esto es para findOneAndUpdate, no lo uses si no sabes
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Sale del proceso con fallo
  }
};

module.exports = connectDB;
