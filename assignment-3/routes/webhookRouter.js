/**
 * The router module for webhook.
 */

const router = require('express').Router()

const controller = require('../controllers/webhookController')

router
  .post('/webhook', controller.posthook)

module.exports = router
