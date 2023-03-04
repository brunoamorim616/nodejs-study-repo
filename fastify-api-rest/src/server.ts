import fastify from 'fastify'
import { knex } from '../db/database'
const app = fastify()

app.get('/', async (req, res) => {
  const data = await knex('sqlite_schema').select('*')

  return data
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server is Running!')
})
