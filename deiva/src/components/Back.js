// Back.js
import axios from 'axios';

export const sendTextMessage = async (recipientId, messageText) => {
  try {
    const response = await axios.post(
      'https://graph.facebook.com/v12.0/me/messages',
      {
        recipient: {
          id: recipientId,
        },
        message: {
          text: messageText,
        },
      },
      {
        params: {
          access_token: 'EAAFWZBsGyreUBO4rfC4QqY8VIkqrYIZCEekSimB6qmsLWmBscbovb55HvQ9C27dqFWNH2sKZACrn5ZCuYXb6VDXHZCZAfoDLQjbnhyrJx1fbzXppxkzINS2hqZAt8CrsB8ziR6KYiiSB9orlkJNRMPQWQvcDMIW7xCAZCbTO6I8haAjz7AZCSAbxqrFOdN4GO5g60',
        },
      }
    );

    if (response.status === 200) {
      console.log('Message sent successfully:', response.data);
    } else {
      console.error('Error sending message:', response.data);
    }
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
};

export const handleUserMessage = async (event) => {
  const senderId = event.sender.id;
  const messageText = event.message.text;

  // Your logic to handle user messages and trigger the appropriate chatbot step
  switch (messageText.toLowerCase()) {
    case 'doctor appointment':
      await sendTextMessage(senderId, 'Welcome to Alagar Clinic. Available Doctors: Dr.JothiPriya, Dr.Vasudevan');
      break;
    case 'dr.jothipriya':
      await sendTextMessage(senderId, 'You selected Dr. JothiPriya. Please choose your appointment date and time.');
      // You can add more logic here based on the selected doctor
      break;
    case 'dr.vasudevan':
      await sendTextMessage(senderId, 'You selected Dr. Vasudevan. Please choose your appointment date and time.');
      // You can add more logic here based on the selected doctor
      break;
    // Add more cases for other steps in your chatbot
    case 'yes':
      await sendTextMessage(senderId, 'Great! What is your name?');
      // Add more logic here for handling user responses
      break;
    case 'no':
      await sendTextMessage(senderId, 'Okay. How can I assist you with something else?');
      // Add more logic here for handling user responses
      break;
    // Custom questions
    case 'how can I schedule an appointment?':
      await sendTextMessage(senderId, 'To schedule an appointment, please type "doctor appointment" to get started.');
      break;
    case 'tell me about your services':
      await sendTextMessage(senderId, 'We offer various medical services. How can I assist you today?');
      break;
    default:
      await sendTextMessage(senderId, 'Hi there, how can I help you?');
  }
};
