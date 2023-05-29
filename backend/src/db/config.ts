import mongose from "mongoose";

const conn = mongose.connect("mongodb://127.0.0.1:27017/tasklist")
    .then(() => {
        console.log("Conectado ao mongoDB")
    })
    .catch((err:any) => {
        console.log("Erro ao se conectar com o banco: " + err)
    })

module.exports = conn;