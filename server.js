const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');

const app = express();
const port = 3000;

// Firebase configuration
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.database();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Telegram Bot API token
const telegramBotToken = '8367516207:AAG6uKkLQffJyGkBPPJCU6YUilh-qcaUhfU';

// Endpoint to handle media uploads
app.post('/upload', upload.single('media'), async (req, res) => {
  try {
    const mediaFile = req.file;
    const chatId = req.body.chatId;

    // Here you would process the media file and upload to Telegram
    // For simplicity, let's just log the media info
    console.log('Received media:', mediaFile);

    // Upload media to Telegram
    await sendMediaToTelegram(chatId, mediaFile);

    // Save to Firebase database
    await db.ref('uploads/').push({
      chatId: chatId,
      mediaFile: mediaFile.originalname,
    });

    res.status(200).send('Media uploaded and processed successfully.');
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).send('Error uploading media.');
  }
});

const sendMediaToTelegram = async (chatId, mediaFile) => {
  // Implement the logic to send media to Telegram
  console.log(`Sending '${mediaFile.originalname}' to Telegram chat ID: ${chatId}`);
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
