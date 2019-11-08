const axios = require('axios')
const path = require('path')
const OSS = require('ali-oss')
const crypto = require('crypto')
const fs = require('fs');
const url = require('url')
const moment = require('moment');

let client = null
let expiration = 0;

const initClient = (config) => {
    return new Promise((resolve, reject) => {
        client = new OSS({
            region: config.region,
            accessKeyId: config.accessKeyId,
            accessKeySecret: config.accessKeySecret,
            bucket: config.bucket
        });
        resolve(true);
    })
}

const uploadImg = (remoteFile, localFile) => {
    return new Promise((resolve, reject) => {
        client.put(remoteFile, localFile).then(data => {
            client.putACL(remoteFile, "public-read").then(data1 => {
                data.name = path.basename(localFile, '.png');
                resolve(data);
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err);
        });
    })
}

module.exports = (config, file, imageFileName) => {
    let localFile = file
    if (/^".+"$/.test(localFile)) {
        localFile = file.substring(1, file.length - 1)
    }

    return new Promise((resolve, reject) => {
        const remoteFile = config.remotePath + '/' + imageFileName;
        if(client && expiration > new Date().getTime()) {
            uploadImg(remoteFile, localFile).then((data) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        } else {
            initClient(config).then(() => {
                uploadImg(remoteFile, localFile).then((data) => {
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err);
            });
        }
       
    })
}


