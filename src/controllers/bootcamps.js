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
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
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
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show bootcamps ${req.params.id}` });
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
exports.createBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamps' });
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
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bootcamps ${req.params.id}` });
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
exports.deleteBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
};
