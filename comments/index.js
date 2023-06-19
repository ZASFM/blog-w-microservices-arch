const express=require('express');
const {randomBytes}=require('crypto');

const app=express();

app.use(express.json());

const commentsByPostId={

}

//getting my post id from my req.params
app.get('/posts/:id/comments',(req,res)=>{
   res.status(200).json(commentsByPostId[req.params.id] || id);
})

//getting my post id from my req.params
app.post('/posts/:id/comments',(req,res)=>{
   const commentId=randomBytes(4).toString('hex');
   const {content}=req.body;

   const comments=commentsByPostId[req.params.id] || [];
   comments.push({id:commentId,content});
   commentsByPostId[req.params.id]=comments;

   res.status(201).json({success:true,comment:commentsByPostId[req.params.id]})
})

app.listen(4001,()=>{
   console.log('comments listening on 4001');
})