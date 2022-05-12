#!/bin/bash

source ~/.nvm/nvm.sh

case $1 in
  start)
    cd /home/thomas/tjdance
    DEBUG=I2cWS281xDriver node ./bin/www
    ;;
  stop)
    curl http://localhost:3000/exit
    ;;
esac
