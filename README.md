# Branches naming convention

```
wip       Works in progress; stuff I know won't be finished soon
feat      Feature I'm adding or expanding
bug       Bug fix or experiment
junk      Throwaway branch created to experiment
```

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

## Build for browser
```bash
ionic cordova build browser
```

## Run in browser
```bash
ionic cordova run browser
```