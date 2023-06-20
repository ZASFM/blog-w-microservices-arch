
const CommentList = ({ comments }) => {

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