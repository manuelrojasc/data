const { json } = require('express')
const express=require('express')
const { default: fetch } = require('node-fetch')
const router=express.Router()
const modelos=require('../db/db')
const services=require('../service/kafkaConsumer')
const producer=require('../service/kafkaProducer')
const auth =require('../service/auth')
const jwt=require('jsonwebtoken')
const topic2=services.topic2()
const topic1=services.topic1()
var globalVar=getData()

function getData(data){
    return data
 }

function sendToRegister(item){
    try {
        payload =[
            {
                topic:'cursos',
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

topic2.on('message',async function(message){
    //const asistencia=JSON.stringify(message.value)
    const asistencia = JSON.parse(message.value)
    globalVar = getData(asistencia)
    
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        await  fetch(`http://localhost:7000/buscar/alumno/${asistencia.id_alumno}`,requestOptions)
                    .catch(error => console.log('error', error))
    
 
})

topic1.on('message',async function(message){
    let getResult =JSON.parse(message.value)
    sendToRegister(getResult)
    const type = ["asistio", "falto", "tardanza"];
    const randomType = type[Math.floor(Math.random() * type.length)];
     
     console.log(randomType)
     if(getResult == 'existe'){
        var curso = new modelos.registroModel({cod_alumno:globalVar.id_alumno,cod_curso:globalVar.id_curso,estado:randomType});
        var result = await curso.save()
        console.log('alumnos',result)
     }else
     console.log('no existe') 
        
})

router.get('/validar/registro/alumno', async(request, response) => {
    try {
        sendToRegister(getResult) 
        response.send(getResult)
    } catch (error) {
        response.status(500).send(error);
    }
});



router.get('/listar/registros', auth,async(request, response) => {
    try {
        var result = await modelos.registroModel.find().exec();
        response.json(result);  
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get('/listar/asistencia', async(request, response) => {
    try {
        var result = await modelos.registroModel.find().exec();
        var data=result.filter( (val,i) => val.estado === "asistio")
        response.json(data); 

    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/listar/falta', async(request, response) => {
    try {
        var result = await modelos.registroModel.find().exec();
        var data=result.filter( (val,i) => val.estado === "falto")
        response.json(data); 

    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/listar/tardanza', async(request, response) => {
    try {
        var result = await modelos.registroModel.find().exec();
        var data=result.filter( (val,i) => val.estado === "tardanza")
        response.json(data); 

    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/token', (request, response) => {
    let privateKey = "PASSWORD";
    let token = jwt.sign({ "body": "marc" }, privateKey, { algorithm: 'HS256' }, { expiresIn: '1h' });
    response.send({ token: token });
})


module.exports=router