const express=require('express');
const axios=require('axios');

const app=express();

app.use(express.json());

let events=[];

app.post('/events',async (req,res)=>{
   const event=req.body; 

   events.push(event);

   //post service
   await axios.post('http://posts-cluterip-srv:4000/events',event).catch(err=>console.log(err));
   //comments service
   await axios.post('http://comments-srv:4001/events',event).catch(err=>console.log(err));
   //query service:
   await axios.post('http://querz-srv:4002/events',event).catch(err=>console.log(err));
   //moderation service:
   await axios.post('http://moderation-srv:4003/events',event).catch(err=>console.log(err));

   res.status(200).send('ok')
})

app.get('/events',(req,res)=>{
   res.send(events);
})

app.listen(4005,()=>{
   console.log('EB on 4005');
})