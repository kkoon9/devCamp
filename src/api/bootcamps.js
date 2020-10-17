const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
});
router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Show bootcamps ${req.params.id}` });
})
router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamps' });
});
router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Update bootcamps ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
})


module.exports = router;