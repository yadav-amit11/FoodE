const mongoose = require('mongoose');

const mongoURI = 'mongodb://ayadavay2002:mernfood123@ac-tzetgrl-shard-00-00.fdzx6nq.mongodb.net:27017,ac-tzetgrl-shard-00-01.fdzx6nq.mongodb.net:27017,ac-tzetgrl-shard-00-02.fdzx6nq.mongodb.net:27017/FoodEmern?ssl=true&replicaSet=atlas-jloyye-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Ensure compatibility with newer MongoDB drivers
      useUnifiedTopology: true,
    });

    console.log('Connected to DB'); // Log after successful connection

    // Fetch data after connection:
    const data = await mongoose.connection.db.collection('food_items').find({}).toArray();
    const catData = await mongoose.connection.db.collection('food_Category').find({}).toArray();

    // Store data globally (consider better data management approaches):
    global.food_items = data;
    global.food_Category = catData;

  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

module.exports = mongoDB;
