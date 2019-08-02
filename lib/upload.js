const axios = require('axios')
const path = require('path')
const OSS = require('ali-oss')
const crypto = require('crypto')
const fs = require('fs');
const url = require('url')

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

const getMD5 = (file) => {
    return new Promise((resolve, reject) => {
        var rs = fs.createReadStream(file);
        var hash = crypto.createHash('md5');
        rs.on('data', hash.update.bind(hash));
        rs.on('end', function () {
          resolve(hash.digest('hex'));
        });
        rs.on('error', function(err) {
            reject(err);
        });
    });
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

module.exports = (config, file, mdFile) => {
    let localFile = file
    if (/^".+"$/.test(localFile)) {
        localFile = file.substring(1, file.length - 1)
    }

    return new Promise((resolve, reject) => {
        getMD5(file).then((md5) => {
            const dotFileNames = file.split('.');
            const fileExtension = dotFileNames[dotFileNames.length - 1] ? `.${dotFileNames[dotFileNames.length - 1]}` : '.png';
            const remoteFile = config.remotePath + '/' + md5 + fileExtension;
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
        }).catch((err) => {
            reject(err);
        });
    })
}

