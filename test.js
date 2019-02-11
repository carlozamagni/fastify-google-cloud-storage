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
        t.ok(fastify.googleCloudStorage)
    })
})

t.test('should not register on invalid credentials', t => {
    t.plan(1)

    const fastify = Fastify()

    fastify.register(fastifyGoogleCloudStorage, {
        projectId: 'FAKE-IT'
    })

    fastify.ready(err => {
        t.ok(err)
    })
})