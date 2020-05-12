# Simple HTTP Web - Server

## Cloning repository

L820:~ tushar$cd ~/workspace/src/github.com/  

L820:~ tushar$git clone https://github.com/patharetush/pucsd2020-pp.git 

## Configuration details 

Details must be checked and put in rest-api.cfg file

```

cd /etc
mkdir myproject
cp resource/config/configuration.cfg /etc/myproject/configuration.cfg

```

## HOW TO COMPILE

L820:~ tushar$cd ~/workspace/src/github.com/pucsd2020-pp/rest-api  

L820:rest-api tushar$ go build

## HOW TO RUN
L820:rest-api tushar$ ./rest-api

## SENDING HTTP REQUEST
Install curl if not already installed.  

command : apt install curl

L820:~ tushar$ curl http://localhost:8080/Golang
Hi there, I love Golang!
