import axios from 'axios';
import {useEffect, useState} from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList=()=>{
   const [posts,setPosts]=useState({});

   const fetchPosts=async()=>{
      try{
         const {data}=await axios.get('http://localhost:4000/posts');
         setPosts(data);
      }catch(err){
         console.log(err);
      }
   }

   useEffect(()=>{
      fetchPosts();
   },[]);

   const renderPosts=Object.keys(posts).map(id=>{
      const currentPost=posts[id];
      return (
         <div
            className='card'
            key={currentPost.id}
            style={{width:'30%',marginBottom:'20px'}}
         >
            <div className='card-body'>
               <h3>{currentPost.title}</h3>
               <CommentList postId={id}/>
               <CommentCreate postId={id}/>
            </div>
         </div>
      )
   });

   return (
      <div className='d-flex flex-row flex-wrap justify-content-between'>
         {renderPosts}
      </div>
   )
}

export default PostList;