require('dotenv').config()
const secret = process.env.X_GITLAB_TOKEN
const webhookController = {}

/**
 * Emits the data from the websocket into view.
 * Https://docs.gitlab.com/ee/user/project/integrations/webhooks.html.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Error handling.
 */
webhookController.posthook = async (req, res, next) => {
  try {
    const io = req.app.get('socketio')
    if (req.headers['x-gitlab-token'] !== secret) {
      throw new Error('Error')
    } else {
      const emitData = {
        action: req.body.object_attributes.action,
        state: req.body.object_attributes.state,
        title: req.body.object_attributes.title,
        repository: req.body.repository.name,
        user: req.body.user.name
      }
      io.emit('issue', emitData)
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = webhookController
