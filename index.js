'use strict'

const fp = require('fastify-plugin')
const { Storage } = require('@google-cloud/storage')

function fastifyGoogleCloudStorage (fastify, options, next) {
  const gcsOpts = { projectId: options.projectId }
  if (options.keyFilename) {
    gcsOpts.keyFilename = options.keyFilename
  }

  const storage = new Storage(gcsOpts)

  storage.getBuckets((err, _) => {
    if (err) return next(err)

    fastify.decorate('googleCloudStorage', storage)

    next()
  })
}

module.exports = fp(fastifyGoogleCloudStorage, {
  name: 'fastify-google-cloud-storage'
})
