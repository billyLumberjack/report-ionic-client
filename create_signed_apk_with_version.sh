#!/usr/bin/env bash

#!/bin/bash

#get highest tag number
VERSION=`git describe --abbrev=0 --tags`

#replace . with space so can split into an array
VERSION_BITS=(${VERSION//./ })

#get number parts and increase last one by 1
VNUM1=${VERSION_BITS[0]}
VNUM2=${VERSION_BITS[1]}
VNUM3=${VERSION_BITS[2]}
VNUM3=$((VNUM3+1))

#create new tag
NEW_TAG="$VNUM1.$VNUM2.$VNUM3"

to_find_in_config="version=\"[0-9 .]*\""
to_replace_in_config="version=\"$NEW_TAG\""
sed -i .backup "s/$to_find_in_config/$to_replace_in_config/" ./config.xml

to_find_in_json="\"version\": \"[0-9 .]*\""
to_replace_in_json="\"version\": \"$NEW_TAG\""
sed -i .backup "s/$to_find_in_json/$to_replace_in_json/" ./package.json

git add config.xml package.json
git commit -m "Commit for version $NEW_TAG"

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
    
#get current hash and see if it already has a tag
GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT 2>/dev/null`

#only tag if no tag already
if [ -z "$NEEDS_TAG" ]; then
    git tag $NEW_TAG
    echo "Tagged with $NEW_TAG"
    git push --tags
else
    echo "Already a tag on this commit"
fi

open ./platforms/android/app/build/outputs/apk/release/
