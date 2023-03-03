import fastify from 'fastify'

const app = fastify()

app.get('/', (req, res) => {})

app.listen({ port: 3333 }).then(() => {
  console.log('Server is Running!')
})
