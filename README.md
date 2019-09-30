# Useful commands
## List emulators
```bash
ionic cordova emulate --list --no-native-run                            # List any OS
cordova run --list --no-native-run                                      # List any OS
cordova run <platform> --list --no-native-run                           # List specific OS
```
## Start local emulator
```bash
ionic cordova emulate ios --target="iPhone-SE" --prod --no-native-run   #runs with PROD config 
ionic cordova emulate ios --target="iPhone-SE" --no-native-run          #runs with DEV config

ionic cordova emulate android --target=e78ab88d --prod --no-native-run  #runs with PROD config   
ionic cordova emulate android --target=e78ab88d --no-native-run         #runs with DEV config   
```
## Deploy on physical device
```bash
ionic cordova run android --device
```


# OLD md content
This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

