const connection = require('../database/connection')

module.exports = {
  async index (request, response) {
    const ong_id = request.headers.authorization
    if (!ong_id) {
      return response.status(401).json({
        error: "Operação não autorizada"
      })
    }
    
    const incident = await connection('incidents').select('*').where('ong_id', ong_id)
    // console.log(incident)
    if (!incident.length) {
      return response.status(200).json({
        message: "Entidade sem registro de Casos no sistema"
      })
    }
    
    return response.json(incident)
  }
}