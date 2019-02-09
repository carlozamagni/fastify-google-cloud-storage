'use strict'

const t = require('tap')
const Fastify = require('fastify')
const fastifyGoogleCloudStorage = require('./index')

const testProjectId = ''


t.test('should register', t => {
    t.plan(2)

    const fastify = Fastify()

    fastify.register(fastifyGoogleCloudStorage, {
        projectId: testProjectId
    }, err => {
        t.error(err)
    })

    fastify.ready(err => {
        t.error(err)
        t.ok(fastify.googleCloudStorage)
    })
})