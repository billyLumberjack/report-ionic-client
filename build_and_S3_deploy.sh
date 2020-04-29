#!/usr/bin/env bash
aws s3 rm s3://web-skiapp/
ionic cordova build browser --prod
aws s3 cp /Users/samuele/Desktop/MY_PROJECT/ionic_skiapp/platforms/browser/www s3://web-skiapp/ --acl public-read --recursive