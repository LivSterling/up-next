const express = require('express')
const router = express.Router()
const Project = require('../models/project')

// Middleware to protect the dashboard, this will push someone back to login of they arnt already
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
  }

router.get('/', isLoggedIn, async (req, res) => {
    try { // a simple get to display all the projects
      const projects = await Project.find().populate('createdBy').sort({ createdAt: -1 })
      res.render('home', { projects })
    } catch (err) {
      console.error(err)
      res.redirect('/')
    }
  })

  router.get('/new', isLoggedIn, (req, res) => {
    res.render('new-project')
  })

  //handle a new project form submit and CREATes a new one
  router.post('/', isLoggedIn, async (req, res) => {
    try {//were gonna use a try block so it runs. good data or bad
      const { title, description, beforeImg, afterImg, tags } = req.body//pulling all at the same time instead of one by one/saves time and key strokes
  
  
      const newProject = await Project.create({
        title,
        description,
        beforeImg,
        afterImg,
        tags: tags.split(',').map(tag => tag.trim()), // turn string into array, my schemas asking for an array.makes it esier to search later. Maybe a map would work better tho?
        createdBy: req.user._id,
      })
  
      res.redirect(`/projects/${newProject._id}`)
    } catch (err) {
      console.error(err)
      res.redirect('/projects/new')
    }
  })

  router.get('/:id', isLoggedIn, async (req, res) => {
    try {//  shows a single project using single-project.ejs
      const project = await Project.findById(req.params.id).populate('createdBy')
      res.render('single-project', { project })
    } catch (err) {
      console.error(err)
      res.redirect('/projects')
    }
  })
  
  module.exports = router