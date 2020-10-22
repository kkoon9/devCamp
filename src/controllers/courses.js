const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");



/**
 * @api {get} /api/v1/courses
 * @api {get} /api/v1/bootcamps/:bootcampId/courses
 * @apiName getCourses
 * @apiGroup courses
 *
 * @apiParams bootcampId : bootcamp의 id
 * @apiBody
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {Number} count courses의 개수
 * @apiSuccess {Object} data courses
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

/**
 * @api {get} /api/v1/courses/:id
 * @apiName getCourse
 * @apiGroup courses
 *
 * @apiParams id : course의 id
 * @apiBody
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {Object} data course
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: course
  })
});

/**
 * @api {post} /api/v1/bootcamps/:bootcampId/courses
 * @apiName addCourse
 * @apiGroup courses
 *
 * @apiParams bootcampId : bootcamp의 id
 * @apiBody title : course 제목
 * @apiBody description : course 소개
 * @apiBody weeks : course 주차
 * @apiBody tuition : 코스 회원 수
 * @apiBody minimumSkill : 난이도
 * @apiBody scholarhipsAvailable : true/false
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {Object} data course
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not uthorized to add ac course to bootcamp ${bootcamp._id}`, 401));
  }
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  })
});

/**
 * @api {put} /api/v1/courses/:id
 * @apiName updateCourse
 * @apiGroup courses
 *
 * @apiParams id : course id
 * @apiBody title : course 제목
 * @apiBody description : course 소개
 * @apiBody weeks : course 주차
 * @apiBody tuition : 코스 회원 수
 * @apiBody minimumSkill : 난이도
 * @apiBody scholarhipsAvailable : true/false
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {Object} data course
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.bootcampId}`),
      404
    );
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not uthorized to update course ${course._id}`, 401));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  })
});

/**
 * @api {delete} /api/v1/courses/:id
 * @apiName deleteCourse
 * @apiGroup courses
 *
 * @apiParams id : course id
 *
 * @apiSuccess {Boolean} success 성공 여부
 * @apiSuccess {Object} data course : {}
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.bootcampId}`),
      404
    );
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not uthorized to delete course ${course._id}`, 401));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
});