const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
  async index (request, response) {

    const { page = 1 } = request.query
    
    const consult = await connection('incidents')
      .join('ongs', 'ongs.id','=','incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
    
    const [count] = await connection('incidents').count()
    console.log(count['count(*)'])
    response.header('X-Total-Count', count['count(*)'])
    
    return response.json(consult)
  },

  async create (request, response) {
    const {title, description, value} = request.body
    const ong_id = request.headers.authorization
    
    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    })
    
    return response.json({id})
  },

  async delete (request, response) {
    const { id } = request.params

    const ongAuth = request.headers.authorization
    
    const incident = await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first()
    
    if (!incident) {
      return response.status(404).json({
        error: "Caso não existe no sistema"
      })
    }else if (incident.ong_id === ongAuth) {
      await connection('incidents').where('id', id).delete()
      return response.status(200).json({
        success: "Caso removido do sistema"
      })
      
    } else {
      return response.status(401).json({
        error: "Operação não autorizada"
      })      
    }
  }
}