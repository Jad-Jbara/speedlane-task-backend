class BaseController {
  handleResponse(response, data) {
    response.json(data)
  }

  handleError(response, error) {
    console.error('Error:', error)
    response.send({ error: 'Internal server error' })
  }

  async performQuery(response, query) {
    try {
      const result = await query()
      this.handleResponse(response, result)
    } catch (error) {
      this.handleError(response, error)
    }
  }
}

module.exports = BaseController