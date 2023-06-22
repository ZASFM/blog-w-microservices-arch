const express=require('express');
const cors=require('cors');

const app=express();

const posts={

}
//schema example:
/* {
   'post123':{
      id:'post123',
      title:'post 1',
      comments:[
         {
            id:'comment1',
            content:'some comment to post 1',
            status:['pending','approaved','rejected]
         }
      ]
   }
} */

app.use(cors());
app.use(express.json());

app.get('/posts',(req,res)=>{
   res.status(200).send(posts);
})

app.post('/events',(req,res)=>{
   const {type,data}=req.body;

   if(type==='postCreated'){
      const {id,title}=data;
      posts[id]={
         id,
         title,
         comments:[]
      }
      console.log(posts);
   }

   if(type==='commentCreated'){
      const {id,content,postId,status}=data;
      const post=posts[postId];
      post.comments.push({id,content,status});
   }

   if(type==='commentUpdated'){
      const {id,postId,content,status}=data;

      const post=posts[postId];
      const comment=post.comments.map(comment=>comment.id===id);
      comment.status=status;
      comment.content=content;
   }

   res.status(200).json({});
})

app.listen(4002,()=>{
   console.log('query on 4003');
})