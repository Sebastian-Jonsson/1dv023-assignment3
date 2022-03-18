/**
 * The router module for issueView.
 */

const router = require('express').Router()

const controller = require('../controllers/issueViewController')

router
  .get('/', controller.hookGet)

module.exports = router
