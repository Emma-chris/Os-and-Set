import express, { Request, Response } from 'express';

// Create the express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define a simple interface for the "reply" object
interface Reply {
  userId: string;
  message: string;
  timestamp: string;
}

// Example in-memory "replies" storage (you can replace this with a database)
let replies: Reply[] = [];

// Create a POST endpoint to receive replies
app.post('/reply', (req: Request, res: Response) => {
  const { userId, message }: { userId: string, message: string } = req.body;

  // Basic validation for required fields
  if (!userId || !message) {
    return res.status(400).json({ error: 'userId and message are required' });
  }

  // Create a reply object with a timestamp
  const newReply: Reply = {
    userId,
    message,
    timestamp: new Date().toISOString(),
  };

  // Store the reply (in a real app, you'd likely insert this into a database)
  replies.push(newReply);

  // Send the created reply back as the response
  return res.status(201).json(newReply);
});

// Get all replies (for testing purposes)
app.get('/replies', (req: Request, res: Response) => {
  res.json(replies);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
