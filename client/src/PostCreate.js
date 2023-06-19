import {useState} from 'react';
import axios from 'axios';

const PostCreate = () => {
   const [title,setTitle]=useState('');

   const onSubmit=async(e)=>{
      e.preventDefault();
      await axios.post('http://localhost:4000/posts',{
         title
      });
      setTitle('');
   }

   return (
      
      <div>
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <label for='title'>Title</label>
               <input id="title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
               <button type='submit' className="btn btn-primary submit-post">Submit</button>
            </div>
         </form>
      </div>
   )
}

export default PostCreate;