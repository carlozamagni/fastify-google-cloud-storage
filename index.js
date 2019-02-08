'use strict'


const fp = require('fastify-plugin')
const { Storage } = require('@google-cloud/storage')

function fastifyGoogleCloudStorage(fastify, options, next) {

    var gcsOpts = {projectId: options.projectId }
    if(options.keyFilename){
        gcsOpts.keyFilename = options.keyFilename
    }

    try {
        const storage = new Storage(gcsOpts)

        fastify.decorate('googleCloudStorage', storage)
    } catch (err) {
        next(err)
    }

    next()
}


module.exports = fp(fastifyGoogleCloudStorage, {  
    name: 'fastify-google-cloud-storage' 
})