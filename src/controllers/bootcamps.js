const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require("../models/Bootcamp");

/**
 * @api {get} /api/v1/bootcamps
 * @apiName getBootcamps
 * @apiGroup bootcamps
 *
 * @apiHeader 
 * @apiBody 
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {String} message Show all bootcamps
 * @apiSuccess {Object} data bootcamps 
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      msg: 'Show all bootcamps',
      data: bootcamps
    });
  } catch (error) {
    next(error);
  }
};

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
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true,
      msg: `Show bootcamps ${req.params.id}`,
      data: bootcamp
    });
  } catch (error) { // catch가 다음에 할 일인 비동기 핸들러를 만들 수 있습니다.
    //next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    next(error);
  }
};

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
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      msg: 'Create new bootcamps',
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

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
exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true,
      msg: `Update bootcamps ${req.params.id}`,
      data: bootcamp
    });
  } catch (error) {
    nexxt(error);
  }
};

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
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};
