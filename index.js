'use strict';
const fs = require('fs');

const crypto = require('crypto');
const mqtt = require('mqtt');

exports.getHuaweiIoTClient = function(opts) {

    if (!opts || !opts.deviceId ||
        !opts.deviceSecret || !opts.host) {
        throw new Error('options need deviceId,deviceSecret,host,ca');
    }
    if (!opts.caFilePath) {
        throw new Error('options need ca file path');
    }

    opts.ca = fs.readFileSync(opts.caFilePath);
    delete opts.caFilePath;

    opts.rejectUnauthorized = false;
    opts.keepalive = opts.keepalive || 120;


    const deviceSecret = opts.deviceSecret;
    delete opts.deviceSecret;


    var timestamp = getIoTUTCString();

    opts.password = crypto.createHmac('sha256', timestamp).update(deviceSecret).digest('hex');
    opts.clientId = `${opts.deviceId}_0_1_${timestamp}`;
    opts.username = opts.deviceId;

    opts.port = opts.port || 8883;
    opts.protocol = 'mqtts';

    return mqtt.connect(opts);
}

function getIoTUTCString() {
    const d = new Date();
    var utcYear = d.getUTCFullYear();
    var utcMonth = prefix(2, d.getUTCMonth() + 1);
    var utcDay = prefix(2,d.getUTCDate());
    var utcHours = prefix(2,d.getUTCHours());

    return `${utcYear}${utcMonth}${utcDay}${utcHours}`;
}

function prefix(num, val) {
    return (new Array(num).join('0') + val).slice(-num);
}