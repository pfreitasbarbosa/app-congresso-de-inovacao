<p align="center">
  <img alt="FEI" src="https://raw.githubusercontent.com/pfreitasbarbosa/mobilefei-todolist/master/.github/feilogo.png" />
</p>
<h3 align='center'> Engenharia de Software - CC5511 </h3>

# Especificação de requisitos

## Descrição

O projeto visa a criação de uma aplicação em plataforma móvel que reúne informações úteis aos participantes do evento [Congresso de Inovação FEI](https://congressodeinovacao.fei.edu.br/) visando melhorar a experiência destes ao agregar funcionalidades que integram os serviços oferecidos no congresso com a praticidade de um aplicativo móvel.

O escopo do problema abrange a competência técnica dos estudantes, viabilizando tecnicamente o desenvolvimento do produto.

## Proposta

O projeto tem como objetivo trazer mais praticidade às pessoas interessadas em participar dos workshops e palestras do Congresso de Inovação da FEI, fornecendo informações adicionais acerca do evento, para que pessoas novas na área possam escolher as apresentações de acordo com sua área de interesse.

## Equipe

A condução do desenvolvimento seguirá a linha ágil do SCRUM, contando com os membros:

- <strong>Product Owner - </strong> Pedro Barbosa
- <strong>Scrum Master - </strong> Rafael Palierini
- <strong>Dev Team - </strong> Andy Barbosa, Rubens Mendes e Vitor Costa

## Funcionalidades

### Requisitos funcionais

- [ ] Cadastro e login do usuário
- [ ] Listagem de palestras, painéis e oficinas
- [ ] Gestão de cadastro em palestras, painéis e oficinas
- [ ] Confirmação de presença no evento cadastrado
- [ ] Categorizar os eventos por área de interesse

### Requisitos não funcionais

- [ ] Usar a biblioteca React Native para construir a aplicação móvel
- [ ] Utilizar Node.js para a construção da API
- [ ] Utilizar JWT para controle de sessões
- [ ] Usar o banco de dados relacional PostgreSQL em um container (docker)

### Regras de negócio

- O cadastro em eventos só é possível caso haja vagas
- A sessão do usuário expira em 3 dias (duração do evento)
- A contagem de vagas é feita utilizando presenças confirmadas em cada evento
- O usuário deve confirmar a presença antes do tempo limite (10 minutos antes do início)
- No tempo limite, qualquer usuário pode se cadastrar/confirmar a presença enquanto houver vagas no evento
