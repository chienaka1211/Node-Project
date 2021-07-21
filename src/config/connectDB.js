const {Sequelize} = require('sequelize');


export let instance;

instance = instance ? instance : new Sequelize('demo_db', 'postgres', '123456', {
    host: 'localhost',
    logging: console.log,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

const getInstance = () => {
    if (!instance)
        console.log('db not init!!!!!!!')
    // console.log('>>>>>>>>>>>>>>>>>>>>>', instance)
    return instance;
}

// Option 2: Passing parameters separately (other dialects)

let connectDB = async () => {
    try {
        await instance.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = {
    connectDB,
    getInstance
};
