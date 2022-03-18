/**
 * The router module for home.
 */

const router = require('express').Router()

const controller = require('../controllers/homeController')

router
  .get('/', controller.index)
  .post('/', controller.indexPost)

module.exports = router
