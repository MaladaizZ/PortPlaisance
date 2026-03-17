const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser : true,
    dbName : 'esssai'
};
 // methode de connection pour Mongo Cloud :
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// methode pour connecter Mongo en Local :

