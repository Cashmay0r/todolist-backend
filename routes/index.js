import express from 'express';
import {addListItem, getItemList} from '../collections/listItems.js';

const router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('');
});

router.post('/addlistitem', async (req, res, next) => {
  //console.log(req.body);
  const add = await addListItem(req.body);
  res.send({message: 'Added new list item.'}).status(200);
});

router.get('/getlist', async (req, res, next) => {
  //console.log(req.query);
  let list;
  if ('id' in req.query) {
    list = await getItemList(req.query.id);
  }
  res.send(list).status(200);
});

export default router;
