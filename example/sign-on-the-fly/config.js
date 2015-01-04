'use strict';
var config = {};
module.exports = config;

config.port = 8081;
config.sslCertCacheDir = './cache';

config.certificateAuthority = {
    certFile: './ca/ca.crt',
    keyFile: './ca/ca.key'
};

config.defaultCertificateOptions = {
    keyBitsize: 1024,
    country: 'PT',
    state: 'PT',
    locality: 'PT',
    organization: 'pauloasilva.com',
    organizationUnit: 'IT',
    altName: '',
    emailAddress: 'pauloasilva@gmail.com'
};
