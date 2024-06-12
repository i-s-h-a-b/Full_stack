const M=require('mongoose')
M.connect('mongodb+srv://ishabh2307:lF6bq0V4gy4kEC5x@cluster0.7ubi4po.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then( ()=>{
    console.log("server is connected to database")
})
.catch( ()=>{
    console.log("database is not connected")
})
