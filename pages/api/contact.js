const messages = [];

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, name, message } = req.body;
  if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }

  const newMessage = {
    id: `${Date.now()}-${messages.length + 1}`,
    email,
    name,
    message,
  };

  messages.push(newMessage);

  res.status(201).json({ message: 'Sucessfully stored message!', storedMessage: newMessage });
}

export default handler;
