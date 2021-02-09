const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// iteration 2

let newRecipe = {
  title: 'pao com queijo',
  level: 'Easy Peasy',
  ingredients: ['pão', 'queijo'],
  cuisine: 'mundial',
  dishType: 'Snack',
  image:
    '/images/pao com queijo.jpg',
  duration: 2,
  creator: 'Hungry Student'
};

Recipe
  .create(newRecipe)
  .then(result => console.log(`recipe added: ${result.title}`))
  .catch(err => console.log(err));

// iteration 3

Recipe
  .insertMany(data)
  .then(result => {
    result.forEach(recipe => {
      console.log(`recipe for ${recipe.title} inserted successfully`);
    });
  })
  .catch(err => console.log(err));

// iteration 4

Recipe
  .updateOne({ title: 'Asian Glazed Chicken Thighs' }, { duration: 100 })
  .then(() => console.log(`The recipe is updated`))
  .catch(err => console.log(err));

// iteration 5

Recipe
  .deleteOne({ title: 'Orange and Milk-Braised Pork Carnitas' })
  .then(() => console.log(`The recipe is deleted`))
  .catch(err => console.log(err));

// iteration 6

mongoose.connection
  .close()
  .then(() => console.log('connection closed'));
