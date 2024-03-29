const app = require('./app')
const connnectDatabase = require('./config/database')
const dotenv = require('dotenv');

// Handle Uncaught exceptions
process.on('uncaughtException',err =>{
    console.log(`ERROR : ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})
// Setting up config file
dotenv.config({path:'backend/config/config.env'})

//Connecting to database
connnectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhadled Promise rejections
process.on('unhandleRejection',err =>{
    console.log(`ERROR:' ${err.message}`)
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(()=>{
        process.exit(1)
    })
})