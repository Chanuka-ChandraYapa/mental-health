// swagger/userManagement.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     interests:
 *                       type: array
 *                       items:
 *                         type: string
 *                     personality:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user details
 *     description: Retrieves details of the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 bio:
 *                   type: string
 *                   description: The user's biography
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The user's interests
 *                 personality:
 *                   type: string
 *                   description: The user's personality type
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /userInfo:
 *   post:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     description: Retrieves user details based on the provided user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 bio:
 *                   type: string
 *                   description: The user's biography
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The user's interests
 *                 personality:
 *                   type: string
 *                   description: The user's personality type
 *       400:
 *         description: Invalid user ID provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     description: Updates user information such as name, personality, bio, and interests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to update
 *               name:
 *                 type: string
 *                 description: The new name of the user
 *               personality:
 *                 type: string
 *                 description: The new personality type of the user
 *               bio:
 *                 type: string
 *                 description: The new biography of the user
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The new interests of the user
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The updated user's name
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 bio:
 *                   type: string
 *                   description: The updated user's biography
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The updated user's interests
 *                 personality:
 *                   type: string
 *                   description: The updated user's personality type
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /checkToken:
 *   get:
 *     summary: Check if token is valid
 *     tags: [Users]
 *     description: Verifies if the provided token is valid.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Indicates whether the token is valid
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */
