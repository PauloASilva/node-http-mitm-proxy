'use strict';

var Q = require('q'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    pem = require('pem'),
    config = require('../config')
;

module.exports = {
    /**
     * Create the Certificate for a given \c commonName.
     * The certificate gets stored at \c files.certFile.
     *
     * @param   {string}    commonName  the domain name to which the certificate
     *                                  would be issued.
     * @param   {Object}    files       {certFile, keyFile}
     * @return  {Q.Promise}
     */
    createCertificate: function (commonName, files) {
        return Q.Promise(function (resolve, reject, notify) {
            var certOptions = _.clone(config.defaultCertificateOptions, true);
            certOptions.serviceCertificate = fs.readFileSync(path.resolve(config.certificateAuthority.certFile)).toString();
            certOptions.serviceKey = fs.readFileSync(path.resolve(config.certificateAuthority.keyFile)).toString();
            certOptions.serial = Date.now();

            certOptions.commonName = commonName;

            // if you need altNames, enable the line below
            // certOptions.altNames = [commonName, '*.'+commonName];

            Q.ninvoke(pem, 'createCertificate', certOptions)
                .then(function (obj) {
                    // we don't care about IO success because we can do
                    // persistence again on a later request
                    fs.writeFile(files.certFile, obj.certificate);
                    fs.writeFile(files.keyFile, obj.clientKey);

                    resolve(obj);
                })
                .catch(function (err) {
                    reject(err);
                })
                .done()
            ;
        });
    }
};
