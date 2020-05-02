#!/usr/bin/env bash

. get_and_increase_tag.sh

to_find_in_config="version=\"[0-9 .]*\""
to_replace_in_config="version=\"$NEW_TAG\""
sed -i .backup "s/$to_find_in_config/$to_replace_in_config/" ./config.xml

to_find_in_json="\"version\": \"[0-9 .]*\""
to_replace_in_json="\"version\": \"$NEW_TAG\""
sed -i .backup "s/$to_find_in_json/$to_replace_in_json/" ./package.json

ionic cordova build android --prod --release
#keytool -genkey -v -keystore play-store-private-key.keystore -alias play-store-private-key -keyalg RSA -keysize 2048 -validity 10000
jarsigner \
    -verbose \
    -sigalg SHA1withRSA \
    -digestalg SHA1 \
    -keystore play-store-private-key.keystore \
    ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
    play-store-private-key

zipalign \
    -v 4 \
    ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
    ./platforms/android/app/build/outputs/apk/release/app-release-signed.apk

rm ./platforms/android/app/build/outputs/apk/release/app-release-signed.apk

/Users/samuele/Library/Android/sdk/build-tools/27.0.3/zipalign \
    -v 4 \
    ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
    ./platforms/android/app/build/outputs/apk/release/app-release-signed.apk
    
open ./platforms/android/app/build/outputs/apk/release/
