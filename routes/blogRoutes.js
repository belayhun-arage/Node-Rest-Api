const express = require('express');
const router = express.Router();

const blogController=require("../controller/blogCOntroller")

router.use(express.static(__dirname+"./public/"))

//Blog routes---
router.get('/',blogController.blog_index)
router.get('/create',blogController.blog_create_get)
router.post('/create',blogController.upload,blogController.blog_create_post)
router.get('/:id', blogController.blog_details)
router.delete('/:id',blogController.blog_delete)

module.exports = router;