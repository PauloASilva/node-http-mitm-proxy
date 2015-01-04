On-the-fly signing
==================

This is a working example of on-the-fly ssl signing feature.

## How to install

1. Run `npm install`

2. Import the `ca/ca.crt` certificate on your browser to trust all certificates signed on the fly, otherwise your browser will popup a security warning.


## How to run
To test with Chromium Browser, start is as follow

`$ chromium-browser --proxy-server=127.0.0.1:8081 --user-data-dir=/tmp`

## Notes

* You can improve on-the-fly signing if you sign wildcards certificates ;)
