# vscode-aliyun-upload-image


在markdown中支持图片粘贴上传。这个项目是fork https://github.com/dengchengmi/vscode-aliyun-upload-image **dcmjiayou@163.com** 的项目。

## 简介
这里面修改了原来的代码中只支持fetchTokenUrl获取accessKeyId、accessKeySecret

目前这个版本支持阿里云的RAM权限系统，支持
**accessKeyId**
**accessKeySecret**
**domain**

不支持gif
打算有时间支持下gif

之前用的七牛云，但是七牛云改了需要备案域名且临时域名不支持超过30天后，我的图床就挂了。所以想迁移到阿里云中，但是在**dcmjiayou@163.com**版本中不支持最新版的阿里云RAM系统，所以fork下来自己改了一边，也参考了https://github.com/yscoder/vscode-qiniu-upload-image。

(vscode的文档真不咋地。。。)

![2018-12-29-17-41-53](https://oss.weizongqi.com/static/image/9ab8c3c01614f16536b9c1e9562593d8.png)


## 安装
输入命令：
```bash
ext install aliyun-oss-upload-image
```
或者在插件应用商店搜索aliyun-oss-upload-image安装

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
