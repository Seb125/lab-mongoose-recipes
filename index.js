const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const mongodbFunction = async () => {

  try {
    const x = await mongoose.connect(MONGODB_URI)

    console.log(`Connected to the database: "${x.connection.name}"`);
    await Recipe.deleteMany()


    const recipies = await Recipe.insertMany(data)
    recipies.forEach((user) => {
      console.log(user.title)
    })

    const query = { title: 'Rigatoni alla Genovese' };

    const result = await Recipe.findOneAndUpdate(query, {duration: 100});

    if (result) {
      console.log(`Update successful`);
    }

    const query2 = {title: "Carrot Cake"};

    const removeRec = await Recipe.deleteOne(query2)

    if (removeRec) {
      console.log(`Removed successfully`);
    }

    await mongoose.disconnect();
  } 
  catch (error) {
    console.log(error);
    await mongoose.disconnect();
  }

}


mongodbFunction();

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Recipe.create(data[0])
//     //   .then(user => console.log(user.title))
//     //   .catch(error => console.log(error))
    
//     Recipe.insertMany(data)
//       .then(users => {
//         users.forEach((user)=> {
//           console.log(user.title)
//         })
//   })

// })

//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

