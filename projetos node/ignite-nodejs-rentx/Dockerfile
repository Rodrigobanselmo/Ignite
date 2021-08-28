## NOME_APLICATION -- rentex
## NOME_QUE_PEGA_DO_DOCKER_PS -- 783266726753718279812
## NOME_QUE_PEGA_DO_DOCKER_PS -- rentex

## docker build -t NOME_APLICATION .
## docker run -p 3333:3333 NOME_APLICATION .
## docker start NOME_QUE_PEGA_DO_DOCKER_PS .
## docker ps  ###Lista dockers on
## docker exec -it NOME_QUE_PEGA_DO_DOCKER_PS  ###Lista dockers on
## docker stop NOME_QUE_PEGA_DO_DOCKER_PS
## docker rm NOME_QUE_PEGA_DO_DOCKER_PS ###deletar


## docker-compose up -d ##rodar em background
## docker logs NOME_APLICATION -f

##### COMEÇAR
## docker-compose up 
## docker-compose start ##PARA Iniciar depois de criar
## docker logs NOME_APLICATION -f

## docker-compose stop ##PARA SOMENTE
## docker-compose down ##REMOVER

#####ACESSAR PASTA DO CONTAINER
## docker exec -it NOME_QUE_PEGA_DO_DOCKER_PS /bin/bash  -- NO LINUS
##exit para sair

##RECRIAR COM MAIS UMA IMAGEM
## docker-compose up --force-recreate


# PROCURAR NET COMONADO DE PEGAR IP DA IMAGEM


FROM node:alpine


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 3333

CMD ["npm","run","dev"] 
