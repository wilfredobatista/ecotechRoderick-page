import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(app, credentials) {
  const { email, password } = credentials;

  if (!email || !password) {
    return { error: 'Email and password are required.', code: 400 };
  }

  const user = await app.mongo.db.collection('users').findOne({ email });

  if (!user) {
    return { error: 'Invalid credentials.', code: 401 };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { error: 'Invalid credentials.', code: 401 };
  }

  // Crear JWT
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return {
    token
  };
}

export async function registerUser(app, request, reply) {
  const { email, password, name, role = 'client' } = request.body;

  if (!email || !password || !name) {
    return { error: 'Faltan campos obligatorios', code: 400 };
  }

  try {
    const existingUser = await app.mongo.db.collection('users').findOne({ email });
    if (existingUser) {
      return { error: 'Correo ya está registrado', code: 409 };
    }

    // 🔐 Validación para rol admin
    if (role === 'admin') {
      const creator = request.user;
      if (!creator || creator.role !== 'admin') {
        return { error: 'Solo un administrador puede crear otro admin', code: 403 };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      name,
      password: hashedPassword,
      role, // 'client' por defecto o 'admin' si autorizado
      createdAt: new Date()
    };

    const result = await app.mongo.db.collection('users').insertOne(newUser);

    return { message: 'Usuario creado correctamente', userId: result.insertedId };
  } catch (err) {
    app.log.error(err);
    return { error: 'Error al registrar usuario', code: 500 };
  }
}