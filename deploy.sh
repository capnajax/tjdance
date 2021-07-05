#!/bin/bash

rsyncIgnore=(node_modules .git)

# context
remoteHost=pi@tjbot-ibm.moon
remoteDir=/home/pi/tjdance
baseUrl=http://tjbot-ibm.moon:3000

# parameters
isClean=false

for param in $@; do
  case $param in
    --clean)
      isClean=true
      ;;
    *)
      echo "Unknown parameter ${param}"
      exit 1
  esac
done

if ${isClean}; then
  ssh ${remoteHost} rm -rf ${remoteDir}
fi
ssh ${remoteHost} "mkdir -p ${remoteDir}"

rsyncExclude=''
for i in ${rsyncIgnore[@]}; do
  rsyncExclude+=" --exclude=${i}"
done

curl -s ${baseUrl}/exit --connect-timeout 1 >/dev/null || true 

rsync -avz -e ssh --stats --progress . ${rsyncExclude} \
    ${remoteHost}:${remoteDir}

ssh ${remoteHost} "source .nvm/nvm.sh ; cd ${remoteDir} ;\
  if [ ! -e node_modules ]; then npm install; fi"

rsync -avz -e ssh --stats --progress . ${rsyncExclude} \
    /Users/thomas/Dropbox/Development/IBM/My_Projects/i2c-ws2812-adapter \
    ${remoteHost}:${remoteDir}/node_modules

echo "Starting..."

ssh ${remoteHost} "source .nvm/nvm.sh ; cd ${remoteDir} ; sudo su -c 'source /root/.nvm/nvm.sh ; DEBUG=I2cWS281xDriver,I2cWS281xDriver:* npm run start'"
# ssh ${remoteHost} "source .nvm/nvm.sh ; cd ${remoteDir} ; sudo su -c 'source /root/.nvm/nvm.sh ; npm run start'"
