# Influencer Management Platform

Este projeto é uma plataforma de gerenciamento de influenciadores, desenvolvida utilizando **Node.js**, **Express**, **React**, **MongoDB** e outras tecnologias. A plataforma permite a criação, edição, visualização e associação de influenciadores e marcas, além de autenticação de usuários.

## Índice
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o projeto](#executando-o-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Tecnologias utilizadas](#tecnologias-utilizadas)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (para banco de dados local)
- [Git](https://git-scm.com/) (para clonar o repositório)

Além disso, será necessário um editor de código como [VSCode](https://code.visualstudio.com/).

## Instalação

### 1. Clone o repositório

Primeiro, clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/nferdica/m4-technical.git
```

### 2. Acesse o diretório do projeto

```bash
cd m4-technical
```

### 3. Instale as dependências do projeto

O projeto possui dois diretórios principais: o diretório do frontend e o do backend. Você precisará instalar as dependências em ambos os diretórios.

#### Backend

1. Entre no diretório `backend`:

```bash
cd m4-technical
```

2. Instale as dependências:

```bash
npm install
```

#### Frontend

1. Navegue até o diretório `frontend`:

```bash
cd ../frontend
```

2. Instale as dependências:

```bash
npm install
```

## Configuração

### Backend

1. No diretório `backend`, crie um arquivo `.env` para configurar variáveis de ambiente. O arquivo deve conter as seguintes variáveis:

```makefile
PORT=
MONGO_URI=
JWT_SECRET=
```

2. Certifique-se de que o MongoDB está rodando em sua máquina local ou em um servidor configurado.

## Executando o projeto

### Backend

1. Para iniciar o servidor do backend, execute:

```bash
npm run dev
```

2. Isso iniciará o servidor em modo de desenvolvimento. O backend estará acessível em `http://localhost:3001`.

### Frontend

1. Para iniciar o frontend, navegue até o diretório `frontend` e execute:

```bash
npm start
```

2. Isso iniciará o frontend da aplicação, que estará acessível em `http://localhost:3000`.

## Endpoints da API

Aqui estão alguns dos principais endpoints da API:

### Autenticação

- `POST /api/auth/register`: Registra um novo usuário.
- `POST /api/auth/login`: Faz login de um usuário.

### Influenciadores

- `POST /api/influencers`: Cria um novo influenciador (com ou sem upload de foto).
- `GET /api/influencers`: Retorna todos os influenciadores.
- `GET /api/influencers/:id`: Retorna os detalhes de um influenciador por ID.
- `PUT /api/influencers/:id`: Atualiza um influenciador existente.
- `DELETE /api/influencers/:id`: Deleta um influenciador

### Marcas

- `POST /api/brands`: Cria uma nova marca.
- `GET /api/brands`: Retorna todas as marcas.
- `GET /api/brands/:id`: Retorna os detalhes de uma marca por ID.
- `PUT /api/brands/:id`: Atualiza uma marca existente.
- `DELETE /api/brands/:id`: Deleta uma marca.

## Tecnologias utilizadas

### Backend

- **Node.js**
- **Express**
- **MongoDB** (Mongoose)
- **Multer** (para upload de arquivos)
- **JWT** (para autenticação)

### Frontend

- **React**
- **Axios** (para requisições HTTP)
- **Material-UI** (para componentes de interface)
- **React Router** (para navegação entre páginas)

### Ferramentas adicionais:

- `react-toastify`: Exibe notificações para o usuário
- `dotenv`: Gerenciamento de variáveis de ambiente

## Contribuindo

Se você deseja contribuir para o projeto, fique à vontade para enviar PRs. Certifique-se de seguir o guia de contribuição e as convenções de codificação.
