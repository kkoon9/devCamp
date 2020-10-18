const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require("../models/Course");
const e = require('express');



/**
 * @api {get} /api/v1/courses
 * @api {get} /api/v1/bootcamps/:bootcampId/courses
 * @apiName getCourse
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
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  })
});