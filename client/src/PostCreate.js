import {useState} from 'react';
import axios from 'axios';

const PostCreate = () => {
   const [title,setTitle]=useState('');

   const onSubmit=async(e)=>{
      e.preventDefault();
      ///create comes from because i have to assign a unique path to it to deffierente from get posts on query service
      await axios.post('http://posts.com/posts/create',{
         title
      });
      setTitle('');
   }

   return (
      
      <div>
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <label htmlFor='title'>Title</label>
               <input id="title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='add post'/>
               <button type='submit' className="btn btn-primary submit-post">Submit</button>
            </div>
         </form>
      </div>
   )
}

export default PostCreate;