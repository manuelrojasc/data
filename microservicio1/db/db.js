const mongoose = require('mongoose')
//const uri = "mongodb://root:root@mongo:27017/registrodb?authSource=admin";
const uri = "mongodb+srv://root:root@cluster0.kikhi.mongodb.net/registro?retryWrites=true&w=majority";

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("‘MongoDB Connected…’") })
    .catch(err => console.log(err))


const registroModel = mongoose.model("registros", {
    cod_alumno: { type: String, required: true },
    cod_curso: { type: String, required: true },
    estado: { type: String, required: true },
    registro: { type: Date, default: Date.now }
});

module.exports = {
    registroModel
}