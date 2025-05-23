'use strict'

const fs = require('node:fs')
const t = require('tap')
const Fastify = require('fastify')
const fastifyGoogleCloudStorage = require('./index')


function personalProjectSettingsConfigured(){
  fs.existsSync('./testData')
}


t.test('should register', t => {
  
  if(!personalProjectSettingsConfigured()){
    return t.skip()
  }
  
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
  t.plan(3)

  const fastify = Fastify()

  fastify.register(fastifyGoogleCloudStorage, {
    projectId: 'FAKE-IT'
  })

  fastify.ready(err => {
    t.ok(err)
    t.match(err.message, 'Project id')
    t.match(err.message, 'invalid or not found')
    if (err) console.log(`Tried to register on not existing project. Result is: ${err.message}\n`)
  })
})
