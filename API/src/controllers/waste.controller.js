export async function createWasteType(req, reply) {
    const { name, category, base_price } = req.body;

    const collection = req.server.mongo.db.collection('waste_types');


    const exists = await collection.findOne({ name, category });
    if (exists) return reply.code(400).send({ message: 'Waste type already exists in this category' });

    const result = await collection.insertOne({ name, category, base_price });
    reply.code(201).send({ message: 'Waste type created', id: result.insertedId });
}

export async function getAllWasteTypes(req, reply) {
  const collection = req.mongo.db.collection('waste_types');
  const result = await collection.find().toArray();
  reply.send(result);
}

export async function getWasteTypeById(req, reply) {
  const { id } = req.params;
  const collection = req.mongo.db.collection('waste_types');

  try {
    const result = await collection.findOne({ _id: new req.mongo.ObjectId(id) });
    if (!result) return reply.code(404).send({ message: 'Waste type not found' });
    reply.send(result);
  } catch {
    reply.code(400).send({ message: 'Invalid ID format' });
  }
}
