const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const dbService = require('./dbService');
const app=express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',function(req,res)
{
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result.then(data=>res.json(data)).catch(err => console.log(err));

});

app.get('/getById/:id',function(req,res){
    const id=req.params.id;
    
    const db = dbService.getDbServiceInstance();

    const result = db.getById(id);

    result.then(data=>res.json(data)).catch(err => console.log(err));
})
app.get('/getByCategory/:c',function(req,res){
    const category=req.params.c;
    const db = dbService.getDbServiceInstance();

    const result = db.getByCategory(category);

    result.then((data)=>{res.json(data)}).catch(err => console.log(err));
})

app.post('/enroll',function(req,res){
    const{title,category,discription}=req.body;
    const db = dbService.getDbServiceInstance();
    console.log("hello");
    const result = db.insert(title,category,discription);
})

app.put('/update/:id',function(req,res){
    
    const id=req.params.id;
    const{title,discription}=req.body;
    console.log("aqsqw");
    const db = dbService.getDbServiceInstance();
    const result = db.update(id,title,discription);
})

app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
})

app.listen(3000,function(){
    console.log("running")
});