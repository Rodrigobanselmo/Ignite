
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
## docker exec -i/t NOME_QUE_PEGA_DO_DOCKER_PS /bin/bash  -- NO LINUS
##exit para sair

##RECRIAR COM MAIS UMA IMAGEM
## docker-compose up --force-recreate


# PROCURAR NET COMONADO DE PEGAR IP DA IMAGEM
# Cadastro de Categoria

**RF**
[x] Deve ser possível cadastro uma categoria de carros.

**RN**
[x] Não deve ser possível cadastrar uma categoria já existente.
[x] Apenas usuários administradores podem adicionar categorias.

# Cadastro de Carro

**RF**
[x] Deve ser possível cadastro um novo carro.

**RN**
[x] Não deve ser possível cadastrar um carro com a placa existente.
[x] O carro ao ser cadastrado, deve estar disponível.
[x] Apenas usuários administradores podem adicionar carros.
[x] Não deve ser possível alterar a placa de um carro já cadastrado.

# Listagem de Carros

**RF**
[x] Deve ser possível listar todos os carros disponíveis
[ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
[ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca
[ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RN**
[x] O usuário não precisa estar logado para listagem

# Cadastro de Especificações no Carro

**RF**
[x] Deve ser possível cadastrar uma especificação para um carro
[x] Deve ser possível listar todas as especificações
[ ] Deve ser possível listar todos os carros

**RN**
[x] Não deve ser possível cadastrar uma especificação para um carro não existente
[ ] Não deve ser possível um carro ter especificação duplicada
[ ] O usuário não precisa estar logado para listagem de especificações

# Cadastro de Imagem de Carros

**RF**
[x] Deve ser possível adicionar uma imagem a um carro

**RN**
[x] O usuário pode cadastrar mais de uma imagem para o mesmo carro
[x] Apenas administrador pode adicionar uma imagem

# Alugel de Carro

**RF**
[x] Deve ser possível cadastrar um alugel de carro

**RN**
[x] O alugel deve ter duração mínima de 24 horas
[x] Apenas clientes podem alugar carros
[x] Não pode alugar um carro de carro já esteja alugado
[x] Um carro não pode ser alugado por um cliente que já tenha um alugel

# Devolução de Carro

**RF**
[x] Deve ser possível realizar a devolução de um carro

**RN**
[x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
[x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
[x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
[x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
[x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcionao aos dias de atraso.
[x] Caso haja multa, deverá ser somado ao total do aluguel.

# Recuperar Senha

**RF**
[ ] Deve ser possível o usuário recuperar a senha informando o e-mail
[ ] O usuário deve receber um e-mail com o passo a passo para recuperar a senha
[ ] O usuário deve conseguir inserir a nova senha

**RN**
[ ] O usuário precisa informar a nova senha
[ ] O link enviado para recuperar a senha deve expirar em 3 horas
