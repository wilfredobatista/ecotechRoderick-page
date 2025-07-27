db = db.getSiblingDB('mydb')

// --- Users ---
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'password', 'role', 'created_at'],
      properties: {
        username: { bsonType: 'string' },
        email: { bsonType: 'string', pattern: '^.+@.+\\..+$' },
        password: { bsonType: 'string' },
        role: { bsonType: 'string' },
        created_at: { bsonType: 'date' }
      }
    }
  }
});
db.users.createIndex({ email: 1 }, { unique: true });

// Usuario preinsertado (con contraseña: 123456)
db.users.insertOne({
  username: 'Maria Rodriguez',
  email: 'maria@example.com',
  password: '$2b$10$gMvfInx.rCMk0RwVlGQZ0eRNPN00ydU34WDoVKO5ubWQp2cKfsiOq', // bcrypt hash de "123456"
  role: 'user',
  created_at: new Date()
});

// --- Waste Types ---
db.createCollection('waste_types', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'category', 'base_price'],
      properties: {
        name: { bsonType: 'string' },
        category: { bsonType: 'string' },
        base_price: { bsonType: 'double' }
      }
    }
  }
});

// --- Collection Requests ---
db.createCollection('collection_requests', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'waste_type_id', 'amount', 'location', 'request_date', 'status'],
      properties: {
        user_id: { bsonType: 'objectId' },
        waste_type_id: { bsonType: 'objectId' },
        amount: { bsonType: 'double' },
        location: { bsonType: 'string' },
        request_date: { bsonType: 'date' },
        collection_date: { bsonType: 'date' },
        photos: { bsonType: 'array', items: { bsonType: 'string' } },
        price: { bsonType: 'double' },
        status: { bsonType: 'string' },
        collector_id: { bsonType: 'objectId' },
        user_confirmation: { bsonType: 'bool' }
      }
    }
  }
});

// --- Payments ---
db.createCollection('payments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['request_id', 'amount', 'status', 'payment_date'],
      properties: {
        request_id: { bsonType: 'objectId' },
        amount: { bsonType: 'double' },
        status: { bsonType: 'string' },
        payment_date: { bsonType: 'date' }
      }
    }
  }
});

// --- Service Ratings ---
db.createCollection('service_ratings', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['request_id', 'rating'],
      properties: {
        request_id: { bsonType: 'objectId' },
        rating: { bsonType: 'int' },
        comment: { bsonType: 'string' }
      }
    }
  }
});

// --- Notifications ---
db.createCollection('notifications', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'message', 'read', 'created_at'],
      properties: {
        user_id: { bsonType: 'objectId' },
        message: { bsonType: 'string' },
        read: { bsonType: 'bool' },
        created_at: { bsonType: 'date' }
      }
    }
  }
});

print("✅ Base de datos inicializada con validaciones y usuario María.");
