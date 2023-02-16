const mongoose = require('mongoose');
const schema = require('./schemas');

mongoose.set('strictQuery', false);
const db = mongoose.connection
const model = (()=>{
    db.on("error", console.error)
    db.on("open",()=>{
        console.log('Connecting mongodb!')
    })

    //Atlas mongodb cluster와 연결
    mongoose.connect(
        `mongodb://${process.env.MONGO_INITDB_USERNAME}:${process.env.MONGO_INITDB_PASSWORD}@${process.env.MONGO_INITDB_DOMAIN_PORT}/${process.env.MONGO_INITDB_SETTING}`
        ,{useNewUrlParser:true, useUnifiedTopology:true}
        )

    //스키마 연결
    const model = {};
    for(let key in schema){
        console.log(key);
        model[key] = schema[key];
    }

    return model
})();

module.exports = model