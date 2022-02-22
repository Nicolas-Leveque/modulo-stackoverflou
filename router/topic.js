const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const topicCtrl = require('../controllers/topic');

router.post('/', auth, topicCtrl.createTopic);
router.get('/', auth, topicCtrl.getTopics);
router.get('/:id', auth, topicCtrl.getOneTopic);
router.put('/:id', auth, topicCtrl.modifyTopic);
router.delete('/:id', auth, topicCtrl.deleteTopic);

module.exports = router;
