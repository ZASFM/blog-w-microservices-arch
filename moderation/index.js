const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
   const { type, data } = req.body;
   
   if (type === 'commentCreated') {
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
      await axios.post('http://localhost:4005/events', {
         type: 'commentModerated',
         data: {
            id: data.id,
            content: data.content,
            status,
            postId: data.postId
         }
      });
   }

   res.status(200).send('moderated')
})

app.listen(4003, () => {
   console.log('moderation on 4003');
})