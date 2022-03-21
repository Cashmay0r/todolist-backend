import {ObjectId} from 'mongodb';
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
      checked: body.checked,
      title: body.title,
      description: body.description,
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
  try {
    const query = {
      uid: uid,
    };
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

const removeListItem = async (_id, uid) => {
  const collection = await initCollection();

  try {
    const query = {
      _id: ObjectId(_id),
    };

    await collection.deleteOne(query);

    const list = await getItemList(uid);

    return list;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const updateListItem = async (data) => {
  const collection = await initCollection();

  try {
    const filter = {_id: ObjectId(data._id)};
    console.log(data);
    const updateQuery = {
      $set: {
        checked: data.checked,
      },
    };
    const result = await collection.updateOne(filter, updateQuery);

    const list = await getItemList(data.uid);
    return list;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

export {addListItem, getItemList, removeListItem, updateListItem};
