const express=require('express');
const axios=require('axios');
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

const handleEvent=(type,data)=>{
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
}

app.post('/events',(req,res)=>{
   const {type,data}=req.body;

   handleEvent(type,data)

   res.status(200).json({});
})

//on firing up the server, im gonna go and ask for all the data from my event bus storage:
app.listen(4002,async()=>{
   try{
      console.log('query on 4002');
  
      const res=await axios.get('http://localhost:4005/events');
      for(let event in res.data){
         console.log('processing',event.type);
         handleEvent(event.type,event.data);
      }
   }catch(err){
      console.log(err);
   }
})