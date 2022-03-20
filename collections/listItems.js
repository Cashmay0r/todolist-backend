import {connect, client} from '../db.js';

const initCollection = async () => {
  const db = await connect();
  const listItems = db.collection('listItems');
  return listItems;
};

const addListItem = async (body) => {
  const collection = await initCollection();
  try {
    const document = {
      uid: body.uid,
      active: body.active,
      message: body.message,
    };

    const insertDoc = await collection.insertOne(document);
    return insertDoc;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const getItemList = async (uid) => {
  const collection = await initCollection();
  console.log(collection);
  try {
    const query = {
      uid: uid,
    };
    console.log(query);
    const docs = collection.find(query);
    let arr = [];
    await docs.forEach((doc) => {
      arr.push(doc);
    });
    return arr;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

export {addListItem, getItemList};
