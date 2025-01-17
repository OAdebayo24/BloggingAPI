const Blog = require('../models/Article')

const createBlog = async (req, res, next) => {
  try {

    const { title, description, tags, body } = req.body

    const newBlog = new Blog({
      title,
      description: description || title,
      tags,
      author: req.user._id,
      body,
      owner: req.user.username,
    })

    const createdBlog = await newBlog.save()

    req.user.articles = req.user.articles.concat(createdBlog._id)
    await req.user.save()

    return res.status(201).json({
      status: true,
      data: createdBlog,
    })
  } catch (err) {
    e.source = 'creating a blog'
    next(err)
  }
}

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog
      .find(req.findFilter)
      .select(req.fields)
      .populate('author', { username: 1 })
      .skip(req.pagination.start)
      .limit(req.pagination.sizePerPage)

    const pageInfo = req.pageInfo

    return res.json({
      status: true,
      pageInfo,
      data: blogs,
    })
  } catch (err) {
    err.source = 'get published blogs controller'
    next(err)
  }
}

const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id).populate('author', { username: 1 })

    if (blog.state !== 'published') {
      return res.status(403).json({
        status: false,
        error: 'Requested article is not published',
      })
    }

    blog.read_count += 1
    await blog.save()

    return res.json({
      status: true,
      data: blog,
    })
  } catch (err) {
    err.source = 'get published blog controller'
    next(err)
  }
}

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
}
