'use strict'

const t = require('tap')
const Fastify = require('fastify')
const fastifyGoogleCloudStorage = require('./index')

t.test('should register', t => {
  t.plan(2)

  const realProjectId = require('./testData/realConfiguration.json').projectId
  const realKeyFilename = './testData/sa.json'

  const fastify = Fastify()

  fastify.register(fastifyGoogleCloudStorage, {
    projectId: realProjectId,
    keyFilename: realKeyFilename
  })

  fastify.ready(err => {
    t.error(err)
    if (err) console.log(`Could not register GCS plugin. Reason is: ${err.message}\n`)
    t.ok(fastify.googleCloudStorage)
  })
})

t.test('should not register on invalid credentials', t => {
  t.plan(2)

  const fastify = Fastify()

  fastify.register(fastifyGoogleCloudStorage, {
    projectId: 'FAKE-IT'
  })

  fastify.ready(err => {
    t.ok(err)
    t.equal(err.message.includes('Invalid project number'), true)
    if (err) console.log(`Tried to register on not existing project. Result is: ${err.message}\n`)
  })
})
