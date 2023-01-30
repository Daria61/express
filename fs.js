const express = require("express")
const app = express()
const port = 8080
const fs = require("fs")
const cors =require("cors")
const { ppid } = require("process");
const uuid = require("uuid")

const ID = uuid.v4()
const file = "./user.json"
app.use(cors())
app.use(express.json())

app.get("/user", (req, res)=>{
    fs.readFile(file, "utf-8", (err, data)=>{
        const SaveData = data ?  JSON.parse(data) : []
        if(err){
            res.json({status: false, message: err})
        }
        res.json({status: true, result:SaveData })
    })
})

app.post("/user" ,(req, res)=>{
    const {name}= req.body;

    fs.readFile(file,"utf-8", (readErr, data)=>{
        if(readErr){
            res.json({status:false, message:readErr})
        }
        const obj = data ?  JSON.parse(data) : []

        const  newUser = {
            id : ID,
            name : name
        }
        obj.push(newUser); 
        fs.writeFile(file, JSON.stringify(obj), (err)=>{
            if(err){
                res.json({status: false,message: err})
            }
            res.json({status: true, result: obj})
        })
    })
}) 


app.delete("/user" , (req, res)=>{
    const {id} = req.query
    fs.readFile(file, "utf-8" , (err, data)=>{
        let saveData =  data ?  JSON.parse(data) : res.json({status: false, message: "not found"})
     
        if(err){
            res.json({status: false, message: err})
        }
        const filtData = saveData.filter((a)=> a.id !=  id)
        fs.writeFile(file ,  JSON.stringify(filtData), (err) =>{
            if(err){
                res.json({status: false, message: err})
            }
            res.json({status: true, result: filtData})
        })
    })

})


app.put("/user", (req, res)=>{
    const body = req.body

    fs.readFile(file, "utf-8",  (err, data)=>{
        let Data = data ?  JSON.parse(data) : res.json({status: false, message: "empty"})
        if(err){
            res.json({status: false, message: err})
        }

        const upDate = Data.map((a)=>{
            if(a.id === body.id){
                console.log(a);
                (a.name = body.name ),
                (a.id = a.id)
            } 
            return a
        })

        fs.writeFile(file , JSON.stringify(upDate), (err)=>{
            if(err){
                res.json({status: false , message: err})
            }
            res.json({status: true, result: upDate})
        })
    })
})
app.listen( port ,()=>{
    console.log("Server is running"+ port);
})