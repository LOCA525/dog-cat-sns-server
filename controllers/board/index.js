const { Router } = require("express");
const router = Router();
const ctrl = require("./board.ctrl");

/**
 * @swagger
 * components:
 *  schemas:
 *    AddBoard:
 *      type: object
 *      required:
 *        - description
 *      properties:
 *        description:
 *          type: string
 *          description: 게시글 내용
 *        isDog:
 *          type: boolean
 *          description: 게시글 타입
 *        isCat:
 *          type: boolean
 *          description: 게시글 타입
 *        tag:
 *          type: string
 *          description: 태그
 *        photo:
 *          type: number
 *          description: photo id
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    EditBoard:
 *      type: object
 *      required:
 *        - description
 *      properties:
 *        description:
 *          type: string
 *          description: 수정할 게시글 내용
 *        addTags:
 *          type: array
 *          description: 추가할 태그
 *          items:
 *            type: string
 *        removeTags:
 *          type: array
 *          description: 삭제할 태그
 *          items:
 *            type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Like:
 *      type: object
 *      required:
 *        - board_id
 *        - user_id
 *      properties:
 *        board_id:
 *          type: number
 *          description: 좋아요 할 게시글 id
 *        user_id:
 *          type: number
 *          description: 좋아요 하는 유저 id
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - content
 *        - writer
 *      properties:
 *        content:
 *          type: string
 *          description: 댓글 내용
 *        writer:
 *          type: number
 *          description: 댓글 작성 하는 유저 id
 */

/**
 * @swagger
 *  /api/board:
 *    get:
 *      summary : 게시글 조회 api
 *      tags: [ board ]
 *      parameters:
 *        - name: userId
 *          in: query
 *          required: false
 *      responses:
 *        200:
 *          description: 게시글 조회 성공
 */
router.get("/", ctrl.get_boards);

// 게시글 CRUD

/**
 * @swagger
 *  /api/board/write/{id}:
 *    get:
 *      summary : 게시글 조회 api
 *      tags: [ board ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      responses:
 *        200:
 *          description: 게시글 조회 성공
 *    post:
 *      summary : 게시글 작성 api
 *      tags: [ board ]
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
 *              $ref: '#/components/schemas/AddBoard'
 *      responses:
 *        200:
 *          description: 게시글 작성 성공
 *    put:
 *      summary : 게시글 수정 api
 *      tags: [ board ]
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
 *              $ref: '#/components/schemas/EditBoard'
 *      responses:
 *        200:
 *          description: 게시글 수정 성공
 *    delete:
 *      summary : 게시글 삭제 api
 *      tags: [ board ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      responses:
 *        200:
 *          description: 게시글 삭제 성공
 */
router.get("/write/:id", ctrl.get_board);
router.post("/write/:id", ctrl.post_board);
router.put("/write/:id", ctrl.put_board);
router.delete("/write/:id", ctrl.del_board);

// 좋아요
/**
 * @swagger
 *  /api/board/like:
 *    post:
 *      summary : 게시글 좋아요 api
 *      tags: [ board ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Like'
 *      responses:
 *        200:
 *          description: 게시글 좋아요 성공
 *    delete:
 *      summary : 게시글 좋아요 취소 api
 *      tags: [ board ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Like'
 *      responses:
 *        200:
 *          description: 게시글 좋아요 취소 성공
 */
router.post("/like", ctrl.post_like);
router.delete("/like", ctrl.delete_like);

// 댓글
/**
 * @swagger
 *  /api/board/{id}/comment:
 *    get:
 *      summary : 댓글 조회 api
 *      tags: [ board ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      responses:
 *        200:
 *          description: 댓글 조회 성공
 *    post:
 *      summary : 댓글 작성 api
 *      tags: [ board ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      responses:
 *        200:
 *          description: 댓글 작성 성공
 */
router.get("/:id/comment", ctrl.get_comment);
router.post("/:id/comment", ctrl.post_comment);

router.get("/explore", ctrl.get_search);
router.get("/explore/tag", ctrl.get_searchTag);
router.get("/explore/user", ctrl.get_searchUser);

module.exports = router;
