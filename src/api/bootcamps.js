const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into ohter resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/radius')
  .get(getBootcampsInRadius);

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