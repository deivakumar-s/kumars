const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Set your desired port

app.use(bodyParser.json());

// Inside your webhook handling logic
app.post('/webhook', (req, res) => {
  const { messaging } = req.body;
  messaging.forEach(async (event) => {
    if (event.message && event.message.text) {
      const text = event.message.text.toLowerCase();
      if (text === 'hi' || text === 'hello') {
        // Ask a custom question
        const messageData = {
          recipient: {
            id: event.sender.id,
          },
          message: {
            text: 'Welcome to our chatbot! What is your name?',
          },
        };
        await callSendAPI(messageData);
      }
    }
  });
  res.sendStatus(200);
});

// Add the callSendAPI function (replace with your actual implementation)
async function callSendAPI(messageData) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v13.0/me/messages?access_token=EAAFWZBsGyreUBOZCDiWq9idv4AlwkOt6JIGZAfQyOta3FsobpKke3ecvRvdkbZCoWxdUy3JxnNk5WvGItZCzSMnY1fU3wi8ey6R7FDSKaovPFExjZBgw5JKPjwqdZB4JraTyz52hXMchuBzx5u7o2kZABkqP5ZA3MJqXW4OtyljyIUK1JleE4uGY5cZCQwPyYKgupQ`,
      messageData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle the response, e.g., log it
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    // Handle errors, e.g., log them
    console.error('Error sending message:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
