const connection = require('../database/connection')

module.exports = {

  async create (request, response) {
    const { id } = request.body
    
    if (!id) {
      return response.status(401).json({
        error: "Credenciais de acesso [ID] não informadas"
      })
    }

    const ong = await connection('ongs').select('name').where('id', id).first()

    if (!ong) {
      return response.status(404).json({
        error: "Entidade não cadastrada no sistema"
      })
    } 

    return response.json(ong)
  }
}