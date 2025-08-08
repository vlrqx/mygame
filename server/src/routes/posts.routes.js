const router = require('express').Router();
const PostsController = require('../controllers/posts.controller');

router.get('/', PostsController.getAllPosts);
router.get('/user/:userId', PostsController.getPostsByUser);
router.post('/add', PostsController.addPost);
router.get('/:id', PostsController.onePost);
router.patch('/update/:id',PostsController.updatePost)
router.delete('/delete/:id',PostsController.deletePost)
router.delete('/delete_all',PostsController.deleteAll)
router.delete('/delete_readed',PostsController.handleDeleteReaded)

module.exports = router;