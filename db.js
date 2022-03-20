import {MongoClient} from 'mongodb';
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const connect = async () => {
  try {
    await client.connect();

    const database = client.db('Todolist');
    return database;
  } catch (err) {
    console.log(err);
  }
};

export {connect, client};
