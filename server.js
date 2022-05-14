const fastify = require('fastify')({ 
    logger: true,
    ignoreTrailingSlash: true
})

const PORT = process.env.PORT || 5000

const db = require('./queries')

fastify.get('/', (request, reply) => {
    reply.send({hello: 'world'})
});

fastify.get('/employees', db.getEmployees);
fastify.get('/employees/:id', db.getEmployeeById);
fastify.post('/employees', db.createEmployee);
fastify.put('/employees/:id', db.updateEmployee);
fastify.delete('/employees/:id', db.deleteEmployee);


const start = async () => {
    try {
        await fastify.listen(PORT, '0.0.0.0')
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()

