const { json } = require('express')
const express=require('express')
const router=express.Router()
const modelos=require('../db/db')
const producer=require('../service/kafka')


function sendToKafka(item){
    try {
        payload =[
            {
                topic:'alumnos',
                messages:JSON.stringify(item)
            }
        ]
        producer.send(payload,function(e,result){
         if(e){
             throw e
         }
       
        })
    } catch (e) {
        throw e
    }
}



router.get('/', (req, res) => {
    res.send('welcome to my api 2')
})

router.get('/listar/alumnos', async(request, response) => {
    try {
        var result = await modelos.studentModel.find().exec();
        response.json(result);  

    } catch (error) {
        response.status(500).send(error);
    }
});

router.get("/buscar/alumno/:id", async(request, response) => {
    try {
        var cod_alumno = request.params.id;
        var result = await modelos.studentModel.find({cod_alumno:cod_alumno}).exec();
        console.log(result.length)
         if(result.length !==0 )
            sendToKafka('existe')
            else
            sendToKafka('no existe')
        ///sendToKafka(result)
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/registrar/alumno", async(request, response) => {
    try {
        var student = new modelos.studentModel(request.body);
        var result = await student.save();
        response.json(result)

    } catch (error) {
        response.status(500).send(error);
    }
});



module.exports=router