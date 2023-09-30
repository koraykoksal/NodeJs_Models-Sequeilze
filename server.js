
"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const sqlite3 = process.env.SQLITE || 'db.sqlite3'

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json())

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})

// continue from here...
//* SEQUELIZE
//? sqlite import edilir
const {Sequelize, DataTypes} = require('sequelize')

//? sql özelliklerine erişmek için instance oluşturulur
const sequelize = new Sequelize(`sqlite:./${sqlite3}`)

//? todo isminde modal oluşturulur
const Todo = sequelize.define('todo',{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false, // default true
        unique:true,
        field_name:'custom_column_name',
        comment:'Description',
        primaryKey:true,
        autoIncrement:true,
        
    },
    title:{
        type:DataTypes.STRING(64),
        allowNull:false,

    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    priority:{ //? hight:1, normal:0, low:-1
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:0,
    },
    isDone:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    }
})

//? sync komutu tek başına sadece create işlemi yapar
//? öneriler komut kullanımı budur.
sequelize.sync()

//? field isimlerinde değişiklik olursa sync işlemini force:true ile kullanılabilir ama bu işlemde field içindeki veriler silinir.
//sequelize.sync({force:true})

//? field isimlerinde değişiklik olursa sync işlemini alter:true ile kullanılabilir bu işlemde field içindeki veriler sabit kalır.
//? veritabanında yapılacak değişiklikler de bu komut kullanılabilir
//? bu komut kullanımında backup alınır ve değişiklik yapıldıktan sonra backup tekrar geri yüklenir. burada performans önemlidir.
//sequelize.sync({alter:true})









const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler runned.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

