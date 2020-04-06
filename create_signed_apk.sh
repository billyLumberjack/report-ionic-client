#!/usr/bin/env bash
ionic cordova build android --prod --release
#keytool -genkey -v -keystore play-store-private-key.keystore -alias play-store-private-key -keyalg RSA -keysize 2048 -validity 10000
jarsigner \
    -verbose \
    -sigalg SHA1withRSA \
    -digestalg SHA1 \
    -keystore play-store-private-key.keystore \
    /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
    play-store-private-key

zipalign \
    -v 4 \
    /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
    /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/app-release-signed.apk

rm /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/app-release-signed.apk

/Users/samuele/Library/Android/sdk/build-tools/27.0.3/zipalign \
    -v 4 \
    /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
    /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/app-release-signed.apk
    
open /Users/samuele/Desktop/MY_PROJECT/manna/platforms/android/app/build/outputs/apk/release/