import { useState, useEffect } from "react";
import axios from 'axios';

const CommentList = ({ postId }) => {
   const [comments, setComments] = useState([]);

   const fetchData = async () => {
      try {
         const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
         setComments(data);
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      fetchData();
   }, [])

   return (
      <div>
         <ul>
            {
               comments && comments.map(comment => {
                  return (
                     <li key={comment.id}>
                        {comment.content ? comment.content : ''}
                     </li>
                  )
               })
            }
         </ul>
      </div>
   )
}

export default CommentList;