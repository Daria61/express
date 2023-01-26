const express = require("express");
const cors = require('cors');
const port = 8080;
const app = express();

app.use(cors());

app.get('/', (request, response)=>{
    const {id} = request.query;

    console.log('hello' , id);
    response.json({status :true, result: [{id: 1, name: "hello"}]})
})

app.listen(port, ()=>{
    console.log('Server is running on');
})