## huaweicloud-iot-device-sdk

[![npm-version](https://img.shields.io/npm/v/huaweicloud-iot-device-sdk.svg)](https://npmjs.org/package/huaweicloud-iot-device-sdk)
[![npm-download](https://img.shields.io/npm/dm/huaweicloud-iot-device-sdk.svg)](https://npmjs.org/package/huaweicloud-iot-device-sdk)

[Huawei IoT SDK](https://www.aliyun.com/product/iot) MQTT client for Node.js


## Installation

You can install it as dependency with npm.

```sh
$ # save into package.json dependencies with -S
$ npm install huaweicloud-iot-device-sdk -S
```

## Usage

Huawei IoT mqtt client with authrozied by deviceId & deviceSecret.


### GET Data 

```js
const path = require('path');
const huaweiIoT = require('huaweicloud-iot-device-sdk');

const options = {
    deviceId: "your deviceId",
    deviceSecret: "your deviceSecret",
    caFilePath: path.join(__dirname, 'hw-iot-root.pem'),
    host:'your iot host'
}


//建立连接
var client = huaweiIoT.getHuaweiIoTClient(options);
client.on('message', function(topic, message) {
    console.log("topic " + topic)
    console.log("message " + message)

})
client.subscribe(`/huawei/v1/devices/${options.deviceId}/command/json`)

var topic = `/huawei/v1/devices/${options.deviceId}/data/json`
var postJson = {
    msgType: "deviceReq",
    data: [
        {
            serviceId: "pop",
            serviceData: {
                stackId:4
            }
        }
    ]
}
client.publish(topic, JSON.stringify(postJson))

client.end(function (){
    console.log("end")
})

```


### Subscribe Topic 

```js
client.subscribe(topic)

```
### Publish Message 

```js
client.publish(topic, 'Hello mqtt')
client.publish(topic, 'Hello mqtt', { qos: 1 })

```

### Receive Message 

```js
client.on('message', function(topic, message) {
    console.log(topic+"," + message.toString())
})

```
