const messages = [];

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ message: 'Invalid input' }, { status: 422 });
  }

  const { email, name, message } = body;

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    return Response.json({ message: 'Invalid input' }, { status: 422 });
  }

  const newMessage = {
    id: `${Date.now()}-${messages.length + 1}`,
    email,
    name,
    message,
  };

  messages.push(newMessage);

  return Response.json(
    { message: 'Sucessfully stored message!', storedMessage: newMessage },
    { status: 201 },
  );
}
