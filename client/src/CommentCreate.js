import { useState } from "react"
import axios from 'axios';

const CommentCreate=({postId})=>{
   const [content,setContent]=useState('');

   const onSubmit=async(e)=>{
      e.preventDefault();
      try{
         await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            content
         });
         setContent('')
      }catch(err){

      }
   }

   return (
      <div>
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <label htmlFor="comment">New comment</label>
               <input
                  type="text"
                  id="comment"
                  onChange={(e)=>setContent(e.target.value)}
                  value={content}
                  style={{marginBottom:'0.5rem'}}
                  placeholder="add comment"
               />
            </div>
            <button className="btn btn-primary">Submit</button>
         </form>
      </div>
   )
}

export default CommentCreate;