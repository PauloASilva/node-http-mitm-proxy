'use strict';

var config = require('./config'),
    path = require('path'),
    signing = require('./lib/signing'),
    Proxy = require('../../index'),
    proxy = Proxy()
;

proxy.onError(function (ctx, err) {
    console.log('Proxy error: %s', err);
});

proxy.onCertificateRequired = function (hostname, callback) {
    return callback(null, {
        keyFile: path.resolve(this.sslCertCacheDir, hostname+'.key'),
        certFile: path.resolve(this.sslCertCacheDir, hostname+'.crt')
    });
};

proxy.onCertificateMissing = function(ctx, files, callback) {
    console.log('Certificate missing for "%s"', ctx.hostname);

    signing.createCertificate(ctx.hostname, files)
        .then(function(data) {
            console.log('Certificate issued for "%s"', ctx.hostname);

            callback(null, {
                keyFileData: data.clientKey,
                certFileData: data.certificate
            });
        })
        .catch(function(err) {
            callback(err);
        })
        .done()
    ;
};

proxy.listen({
    port: config.port,
    sslCertCacheDir: path.resolve(config.sslCertCacheDir)
});
