var kafka = require('kafka-node')
var client = new kafka.KafkaClient({ kafkaHost: '168.63.41.72:9091' })
var consumer = new kafka.Consumer(client, [{ topic: 'cursos', offset:0 }], {autoCommit: true});

consumer.on('message',function(message){
        console.log('escuchando')
        console.log(message.value)
})