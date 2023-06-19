const express=require('express');
const app=express();
const {randomBytes}=require('crypto');
const cors=require('cors');

const posts={

}

app.use(express.json());
app.use(cors())

app.get('/posts',(req,res)=>{
   res.status(200).json(posts);
})

app.post('/posts',(req,res)=>{
   const id=randomBytes(4).toString('hex');
   const {title}=req.body;
   posts[id]={
      id, 
      title
   }
   res.status(200).send(posts[id]);
})

app.listen(4000,()=>{
   console.log('post listening to 4000');
})