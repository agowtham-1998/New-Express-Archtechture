const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

const database = process.env.LOCAL_DB.replace('<PASSWORD>', process.env.LOCAL_DB_PASS);

// Connect the database
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(con => {
    console.log('DB connection Successfully!');
});

// mongoose.connect('mongodb://127.0.0.1:27017/NewArch',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
//      }).then(()=>
//     console.log("Database Connected!")).catch(err=>console.log(err));

// Start the server
const port = process.env.PORT;
app.listen(8080, () => {
    console.log(`Application is running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});