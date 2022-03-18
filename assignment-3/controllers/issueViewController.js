const fetch = require('node-fetch')
require('dotenv').config()
const secret = process.env.SECRET_TOKEN_STRING

const issueViewController = {}

/**
 * Receives the hook information.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next error.
 */
issueViewController.hookGet = async (req, res, next) => {
  try {
    const data = await fetch('https://gitlab.lnu.se/api/v4/projects/937/issues', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': secret
      }
    })
    const viewData = await data.json()
    res.render('issueView/index', { viewData })
  } catch (error) {
    next(error)
  }
}

module.exports = issueViewController
