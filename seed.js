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



async function seedDatabase() {
    try {

        //delete existing (ie. drop tables if exist)
        await User.deleteMany({});
        await Thought.deleteMany({});

        //seed users db
        await User.insertMany(seedUsers);
        console.log('Users seeded');

    }
    catch (err) {
        console.error({ message: "error seeding db", err })
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

