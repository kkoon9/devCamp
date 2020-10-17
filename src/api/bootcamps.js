const express = require("express");
const { getBootcamps, getBootcamp, createBootcamps, updateBootcamps, deleteBootcamps } = require('../controllers/bootcamps');
const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamps);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;