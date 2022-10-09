const { Router } = require("express");
const router = Router();
const ctrl = require("./photo.ctrl");
const upload = require("../../middleware/multer");

/**
 * @swagger
 *  /api/photo:
 *    post:
 *      summary : photo 저장 api
 *      tags: [ photo ]
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: url
 *          type: file
 *          required: true
 *          description: file.
 *        - in: formData
 *          name: filter
 *          type: string
 *          required: true
 *          description: filter name.
 *      responses:
 *        200:
 *          description: 게시글 작성 성공
 * */
router.post("/", upload.single("url"), ctrl.upload_image);

module.exports = router;
