
const CommentList = ({ comments }) => {

   return (
      <div>
         <ul>
            {
               comments && comments.map(comment => {
                  let content;

                  if(comment.status==='pending'){
                     content='Message awaiting approval'
                  }

                  if(comment.status==='rejected'){
                     content='Message rejected'
                  }

                  if(comment.status==='approved'){
                     content=comment.content
                  }

                  return (
                     <li key={comment.id}>
                        {content}
                     </li>
                  )
               })
            }
         </ul>
      </div>
   )
}

export default CommentList;