const connection = require('../../config/connection');

const {Schema, model} = require('mongoose');

var TestSchema = new Schema({
    name: String,
    createdAt: {
        type: Date,
        expires: '2m',
        default: Date.now
    }
});


const Test = model('Test', TestSchema);


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    try { // ----------------------Seeding Users----------------------

        Test.create("faizan")
        console.log("done");

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    process.exit(0);
})
