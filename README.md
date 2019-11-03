## 使用
先复制图片，然后在md文件格式中使用shift + P

## 参数设置
```js
{
    // 地区，在阿里云对象存储中bucket的概览里面有EndPoint（地域节点），oss-cn-hongkong.aliyuncs.com中的oss-cn-hongkong就是region
    "aliyun.region": "",    
    // accessKeyId（RAM中生成的accessKeyId）
    "aliyun.accessKeyId": "",
    // accessKeySecret（RAM中生成的accessKeySecret）
    "aliyun.accessKeySecret": "",
    // 输入你的bucket名称
    "aliyun.bucket": "",
    // remotePath，您的存储目录，例如要把文件存在http://${你的yuming}/images/png，则这里填写images/png）
    "aliyun.remotePath": "",
    // 阿里云oss域名，可以定义自己的域名，需要在oss中配置，支持https
    "aliyun.domain": "",
    // 本地文件，用于临时缓存（默认: /tmp/.aliyun）
    "aliyun.localPath": "/tmp/.aliyun"
}
```

## 参考

**[vscode-aliyun-upload-image](https://github.com/dengchengmi/vscode-aliyun-upload-image)**
**[vscode-qiniu-upload-image](https://github.com/yscoder/vscode-qiniu-upload-image)**
