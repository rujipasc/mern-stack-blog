const slugify = require("slugify");
const Blogs = require('../models/blogs');
const { v4: uuidv4 } = require('uuid');

//create a blog
exports.create = async (req, res) => {
    const { title, content, author } = req.body;
    let slug = slugify(req.body.title);

    if (!slug) slug=uuidv4();

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }
    try {
        const blog = await Blogs.create({ title, content, author, slug });
        res.status(200).json(blog)
    } catch (e) {
        res.status(400).json({ error: "Content is Duplicated" });
    }
};

exports.getAllblogs = async (req, res) => {
    try {
        const blogs = await Blogs.find({}); 
            res.status(200).json(blogs);
    } catch (e) {
            res.status(404).json({ error: "No blogs found" });
    }   
};
   
exports.singleBlog = async (req, res) => {
    try {
        const blog = await Blogs.findOne({ slug: req.params.slug });
            res.status(200).json(blog);
    } catch (e) {
        res.status(404).json({ error: "No blog found" });
    }
};

exports.removeBlog = async (req, res) => {
    try {
        const blog = await Blogs.findOneAndDelete({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ error: "No blog found to delete" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: `${e}` });
    }
};

exports.updateBlog = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const blog = await Blogs.findOneAndUpdate({ slug: req.params.slug }, { title, content, author }, { new: true })
        if (!blog) {
            return res.status(404).json({ error: "No blog found to update" });
        } else {
            res.status(200).json(blog);
        }
    } catch (e) {
        res.status(500).json({ error: `${e}` });
    }
};
