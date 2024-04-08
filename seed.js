// import models
const { Thought, User } = require('./models');
// import db connection
const db = require('./config/connection');

const seedUsers = [
    { username: 'alice', email: 'alice@example.com' },
    { username: 'bob', email: 'bob@example.com' },
    { username: 'jacob', email: 'jacob@example.com' },
    { username: 'latisha', email: 'latisha@example.com' },
    { username: 'fred', email: 'fred@example.com' },
    { username: 'moira', email: 'moira@example.com' },
    { username: 'charlotte', email: 'charlotte@example.com' },
    { username: 'benji', email: 'benji@example.com' }
];

const seedThoughts = [
    { thoughtText: 'Why did the scarecrow become a successful manager? He was outstanding in his field!', createdBy:''},
    { thoughtText: 'I’m multitasking: I can listen, ignore and forget at the same time.', createdBy:''},
    { thoughtText: 'Keep it simple, but significant.', createdBy:'' },
    { thoughtText: 'Less Monday, more coffee.', createdBy:''},
    { thoughtText: 'It’s not about ideas. It’s about making ideas happen.', createdBy:''},
    { thoughtText: 'Success is a journey, not a destination. Bring snacks.', createdBy:''},
    { thoughtText: 'I would lose weight, but I hate losing.', createdBy:''}
];


async function seedDatabase() {
    try {

    //delete existing (ie. drop tables if exist)
    await User.deleteMany({});
    await Thought.deleteMany({});

    //seed users db
    const users = await User.insertMany(seedUsers);
    console.log('Users seeded');

    //Link thoughts to users using map and modulus to cyclically assign users to thought data
      const updateThoughts = seedThoughts.map((thought, index) => ({
        ...thought, createdBy: users[index % users.length]._id
    }));

     //seed thoughts db using updtated thoughts with users mapped
    await Thought.insertMany(updateThoughts);
    console.log('Thoughts seeded');
    } 
    catch (err) {
        console.error({message: "error seeding db", err})
    }
};
//when db connects seed db
db.once('open', () => {
    console.log('Database connected, starting seeding...');
    seedDatabase()
    .then(() => {
        console.log('Seeding finished. Server is ready to handle requests.');
    }).catch(err => {
        console.error('Seeding failed:', err);
    });
});

