const express=require('express');
const {randomBytes}=require('crypto');
const cors=require('cors');
const axios=require('axios');

const app=express();

app.use(express.json());
app.use(cors());

const commentsByPostId={

}

//getting my post id from my req.params
app.get('/posts/:id/comments',(req,res)=>{
   res.status(200).json(commentsByPostId[req.params.id] || []);
})

//getting my post id from my req.params
app.post('/posts/:id/comments',async(req,res)=>{
   const commentId=randomBytes(4).toString('hex');
   const {content}=req.body;

   const comments=commentsByPostId[req.params.id] || [];
   comments.push({id:commentId,content});
   commentsByPostId[req.params.id]=comments;

   //sending to event bus:
   await axios.post('http://localhost:4005/events',{
      type:'commentCreated',
      data:{
         id:commentId,
         content,
         postId:req.params.id  
      }
   })

   res.status(201).json(commentsByPostId[req.params.id]);
})

app.post('/events',(req,res)=>{
   console.log('Event recieved',req.body);
   res.status(200).send('Event recieved from comments')
})

app.listen(4001,()=>{
   console.log('comments listening on 4001');
})