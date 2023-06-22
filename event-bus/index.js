const express=require('express');
const axios=require('axios');

const app=express();

app.use(express.json());

app.post('/events',async (req,res)=>{
   const event=req.body; 

   //post service
   await axios.post('http://localhost:4000/events',event).catch(err=>console.log(err));
   //comments service
   await axios.post('http://localhost:4001/events',event).catch(err=>console.log(err));
   //query service:
   await axios.post('http://localhost:4002/events',event).catch(err=>console.log(err));
   //moderation service:
   await axios.post('http://localhost:4003/events',event).catch(err=>console.log(err));

   res.status(200).send('ok')
})

app.listen(4005,()=>{
   console.log('EB on 4005');
})