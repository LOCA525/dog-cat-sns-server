const { Router } = require("express");
const router = Router();
const ctrl = require("./account.ctrl");
const passport = require("../../middleware/passport-local");
const upload = require("../../middleware/multer");

/**
 * @swagger
 * components:
 *  schemas:
 *    Join:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - username
 *      properties:
 *        email:
 *          type: string
 *          description: 이메일
 *        password:
 *          type: string
 *          description: 비밀번호
 *        username:
 *          type: string
 *          description: 이름
 *        phone:
 *          type: string
 *          description: 휴대폰 번호
 *        intro:
 *          type: string
 *          description: 인트로
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: 이메일
 *        password:
 *          type: string
 *          description: 비밀번호
 */

/**
 * @swagger
 *  /api/account:
 *    get:
 *      summary : 로그인 조회 api
 *      tags: [ 로그인 ]
 *      responses:
 *        200:
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Login'
 */
router.get("/", ctrl.get_is_login);

/**
 * @swagger
 *  /api/account/join:
 *    post:
 *      summary : 회원가입 api
 *      tags: [ 회원가입 ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Join'
 *      responses:
 *        200:
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Join'
 */
router.post("/join", ctrl.post_join);

/**
 * @swagger
 *  /api/account/login:
 *    post:
 *      summary : 로그인 api
 *      tags: [ 로그인 ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        200:
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Login'
 */
router.post("/login", passport.authenticate("local"), ctrl.post_login);
router.post("/logout", ctrl.post_logout);

router.get("/follow/:id", ctrl.get_follow);
router.post("/follow/:id", ctrl.post_follow);
router.delete("/follow/:id", ctrl.delete_follow);

router.get("/mypage/:id", ctrl.get_mypage);
router.put("/mypage", ctrl.put_profile);

module.exports = router;
