const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require("../models/Bootcamp");
const geocoder = require('../utils/geocoder');
const e = require('express');

/**
 * @api {get} /api/v1/bootcamps?averageCost[gte]=5000&location.city=Boston&select=name,description,housing&sort=-name
 * @apiName getBootcamps
 * @apiGroup bootcamps
 *
 * @apiHeader bootcamp의 모든 parameters를 query에 담을 수 있다.
 * @apiHeader {String} select query문에 select 역할
 * @apiHeader {String} sort query문에 sort 역할
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Show all bootcamps
 * @apiSuccess {Object} data bootcamps 
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @api {get} /api/v1/bootcamps/:id
 * @apiName getBootcamp
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiParams id User Id(PK)
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Show bootcamps id
 * @apiSuccess {Object} data bootcamp 
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    msg: `Show bootcamps ${req.params.id}`,
    data: bootcamp
  });
});

/**
 * @api {post} /api/v1/bootcamps
 * @apiName createBootcamps
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Create new bootcamps
 */
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one bootcamp
  if (publishedBootcamp && req.user.role != 'admin') {
    return next(new ErrorResponse(`The user with ID ${rqe.user.id} `, 400));

  }

  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    msg: 'Create new bootcamps',
    data: bootcamp
  });
});

/**
 * @api {put} /api/v1/bootcamps/:id
 * @apiName updateBootcamps
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiParams id User Id(PK)
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Update bootcamp id
 */
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not uthorized to update this bootcamp`, 401));
  }

  bootcamp = await Bootcamp.findById(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `Update bootcamps ${req.params.id}`,
    data: bootcamp
  });
});

/**
 * @api {delete} /api/v1/bootcamps/:id
 * @apiName deleteBootcamps
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiParams id User Id(PK)
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Delete bootcamps id
 */
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not uthorized to update this bootcamp`, 401));
  }

  bootcamp.remove();

  res.status(200).json({
    success: true
  });
});

/**
 * @api {get} /api/v1/bootcamps/radius?zipcode=1&distance=1
 * @apiName getBootcampsInRadius
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiParam {String} zipcode zip code
 * @apiParam {Number} distance 거리
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Show bootcamps
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.query;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  /**
   * Calc radius using radians
   * Divide dist by radius of Earth
   * Earth Radius = 3,963 mi / 6,378 km
   */
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius]
      }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })
});

/**
 * @api {put} /api/v1/bootcamps/:id/photo
 * @apiName bootcampPhotoUpload
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiParams id User Id(PK)
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message file name
 */
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not uthorized to update this bootcamp`, 401));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;

  //Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
  });

  await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
  res.status(200).json({
    success: true,
    data: file.name
  });
});