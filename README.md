# fastify-google-cloud-storage

## Install

```
npm install --save fastify-google-cloud-storage
```

## Usage

Import "fastify-google-cloud-storage" and register it into Fastify instance

```javascript
fastify.register(require('fastify-google-cloud-storage'), {
  projectId: '',    // [string, required] GCP project id
  keyFilename: ''   // [string, optional] path to service account json file 
})
```
you can access the Cloud Storage client via: 

```javascript
const cloudStorage = fastify.googleCloudStorage
```