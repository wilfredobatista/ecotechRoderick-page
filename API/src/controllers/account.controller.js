import bcrypt from 'bcryptjs';

export async function getAccount(app, userId) {
  try {
    const user = await app.mongo.db.collection('users').findOne({
      _id: new app.mongo.ObjectId(userId)
    });

    if (!user) {
      return { error: 'User not found', code: 404 };
    }

    const { password, ...userData } = user;

    return { user: userData };
  } catch (err) {
    console.error('Error in getAccount:', err);
    return { error: 'Server error', code: 500 };
  }
}

export default {
  updateAccount: async (app, request, reply) => {
    const userId = request.user?.id;

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    // ✅ Solo permitir estos campos
    const allowedFields = ['name', 'location', 'phone'];

    // Filtra lo permitido
    const updateData = Object.fromEntries(
      Object.entries(request.body).filter(([key]) => allowedFields.includes(key))
    );

    if (Object.keys(updateData).length === 0) {
      return reply.code(400).send({ error: 'No se enviaron campos válidos para actualizar' });
    }

    try {
      const result = await app.mongo.db.collection('users').updateOne(
        { _id: new app.mongo.ObjectId(userId) },
        { $set: updateData }
      );

      if (result.modifiedCount === 0) {
        return reply.code(404).send({ error: 'Usuario no encontrado o sin cambios' });
      }

      return reply.send({ message: 'Datos actualizados correctamente' });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Error al actualizar la cuenta' });
    }
  },

  changePassword: async (app, request, reply) => {
    const userId = request.user?.id;
    const { currentPassword, newPassword } = request.body;

    if (!userId || !currentPassword || !newPassword) {
      return reply.code(400).send({
        error: 'Campos requeridos: currentPassword y newPassword'
      });
    }

    try {
      const user = await app.mongo.db.collection('users').findOne({
        _id: new app.mongo.ObjectId(userId)
      });

      if (!user) {
        return reply.code(404).send({ error: 'Usuario no encontrado' });
      }

      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return reply.code(401).send({ error: 'Contraseña actual incorrecta' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await app.mongo.db.collection('users').updateOne(
        { _id: user._id },
        { $set: { password: hashedNewPassword } }
      );

      return reply.send({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: 'Error al cambiar contraseña' });
    }
  }
};
