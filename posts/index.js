const express=require('express');
const app=express();
const {randomBytes}=require('crypto');
const cors=require('cors');
const axios=require('axios');

const posts={

}

app.use(express.json());
app.use(cors())

app.get('/posts',(req,res)=>{
   res.status(200).json(posts);
})

app.post('/posts',async(req,res)=>{
   const id=randomBytes(4).toString('hex');
   const {title}=req.body;
   posts[id]={
      id, 
      title
   }

   //sending to event bus
   await axios.post('http://localhost:4005/events',{
      type:'postCreated',
      data:{
         id,
         title
      }
   })

   res.status(200).send(posts[id]);
})

app.post('/events',(req,res)=>{
   console.log('Event recieved',req.body);
   res.status(200).send('Event recieved from posts')
})

app.listen(4000,()=>{
   console.log('post listening to 4000');
})