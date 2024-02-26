const express = require('express');
const router = express.Router();
const { create, getAllblogs, singleBlog, removeBlog, updateBlog } = require('../controller/blogController')

router.post('/create', create)
router.get('/blogs', getAllblogs)
router.get('/blog/:slug', singleBlog)
router.delete('/blog/:slug', removeBlog)
router.put('/blog/:slug', updateBlog)

module.exports = router;