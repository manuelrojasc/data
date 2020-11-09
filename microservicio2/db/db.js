const mongoose = require('mongoose')
//const uri = "mongodb://root:root@mongo:27017/studentdb?authSource=admin";
const uri = "mongodb+srv://root:root@cluster0.kikhi.mongodb.net/studentdb?retryWrites=true&w=majority"

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("‘MongoDB Connected…’") })
    .catch(err => console.log(err))


const studentModel = mongoose.model("student", {
    cod_alumno: String,
    nombre: String,
    dni: String
});

module.exports = {
    studentModel
}