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
 * components:
 *  schemas:
 *    Follow:
 *      type: object
 *      required:
 *        - from
 *        - to
 *      properties:
 *        from:
 *          type: integer
 *          description: 유저 id
 *        to:
 *          type: integer
 *          description: 팔로잉할 id
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Mypage:
 *      type: object
 *      required:
 *        - userId
 *        - intro
 *        - profile
 *      properties:
 *        userId:
 *          type: number
 *          description: 유저 id
 *        intro:
 *          type: string
 *          description: 인트로
 *        profile:
 *          type: string
 *          description: 프로필 사진 url
 */

/**
 * @swagger
 *  /api/account:
 *    get:
 *      summary : 로그인 조회 api
 *      tags: [ account ]
 *      responses:
 *        200:
 *          description: 회원가입 성공
 */
router.get("/", ctrl.get_is_login);

/**
 * @swagger
 *  /api/account/join:
 *    post:
 *      summary : 회원가입 api
 *      tags: [ account ]
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
 *      tags: [ account ]
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

/**
 * @swagger
 *  /api/account/logout:
 *    post:
 *      summary : 로그아웃 api
 *      tags: [ account ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        200:
 *          description: 로그아웃 성공
 */
router.post("/logout", ctrl.post_logout);

/**
 * @swagger
 *  /api/account/follow/{id}:
 *    get:
 *      summary : 팔로우 상태 조회 api
 *      tags: [ account ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      responses:
 *        200:
 *          description: 팔로우 상태 조회 성공
 *    post:
 *      summary : 팔로잉 api
 *      tags: [ account ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Follow'
 *      responses:
 *        200:
 *          description: 팔로잉 성공
 *    delete:
 *      summary : 팔로우 취소 api
 *      tags: [ account ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Follow'
 *      responses:
 *        200:
 *          description: 팔로잉 성공
 *
 */
router.get("/follow/:id", ctrl.get_follow);
router.post("/follow/:id", ctrl.post_follow);
router.delete("/follow/:id", ctrl.delete_follow);

/**
 * @swagger
 *  /api/account/mypage/{id}:
 *    get:
 *      summary : 마이페이지 조회 api
 *      tags: [ account ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      responses:
 *        200:
 *          description: 마이페이지 조회 성공
 */
router.get("/mypage/:id", ctrl.get_mypage);
/**
 * @swagger
 *  /api/account/mypage:
 *    put:
 *      summary : 마이페이지 수정 api
 *      tags: [ account ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Mypage'
 *      responses:
 *        200:
 *          description: 마이페이지 수정 성공
 */
router.put("/mypage", ctrl.put_profile);

module.exports = router;
