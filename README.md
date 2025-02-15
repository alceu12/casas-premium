  # Projeto de Acomodações de Temporada

  Este repositório contém uma aplicação completa para gerenciar e exibir acomodações de temporada. O projeto está dividido em duas partes:

  1. **Backend** (API em Python + FastAPI)
  2. **Frontend** (Aplicação React)

  A aplicação permite buscar acomodações por cidade, filtrar, visualizar detalhes de cada acomodação e favoritar listagens (salvando no localStorage do navegador). Um arquivo JSON com dados fictícios funciona como “banco de dados” para fins de demonstração.

  ---

  ## Sumário

  - [Tecnologias](#tecnologias)
  - [Pré-requisitos](#pré-requisitos)
  - [Estrutura do Repositório](#estrutura-do-repositório)
  - [Executando sem Docker](#executando-sem-docker)
    - [Instruções para o Backend](#instruções-para-o-backend)
    - [Instruções para o Frontend](#instruções-para-o-frontend)
  - [Executando com Docker](#executando-com-docker)
  - [Endpoints da API](#endpoints-da-api)
  - [Contribuindo](#contribuindo)
  - [Licença](#licença)

  ---

  ## Tecnologias

  - **Python 3.10+** com **FastAPI**
  - **React**
  - **Docker** e **Docker Compose** para orquestração
  - **Banco de dados** fictício em formato JSON

  ## Pré-requisitos

  - **Python 3.10** ou superior instalado (caso você queira rodar o backend localmente, sem Docker).
  - **Node.js** (14+) e **npm** ou **yarn** instalados (para rodar o frontend sem Docker).
  - **Docker Desktop** instalado, se desejar subir tudo via Docker/Compose.

---

## Executando sem Docker

### Instruções para o Backend

1. **Instalar dependências**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. **Iniciar a API**:
   ```bash
   # Exemplo usando Uvicorn:
   python -m uvicorn app.main:app --reload
   ```
   - A API FastAPI ficará disponível em [http://localhost:8000](http://localhost:8000).

3. **Verificando**:
   - Acesse [http://localhost:8000/docs](http://localhost:8000/docs) para visualizar a documentação Swagger gerada automaticamente.
   - O arquivo `db.json` em `backend/data/db.json` contém todas as acomodações.
   - 
4. **Ajustar Caso Alterar a Porta do Frontend** `main.py` para apontar a URL da sua API (por padrão `http://localhost:3000`).

### Instruções para o Frontend

1. **Instalar dependências**:
   ```bash
   cd frontend
   npm install
   ```
   ou
   ```bash
   yarn
   ```
2. **Iniciar** o modo de desenvolvimento:
   ```bash
   npm start
   ```
   ou
   ```bash
   yarn start
   ```
   - O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

3. **Ajustar Caso Alterar a Porta do Backend** `AcomodacaoService.js` para apontar a URL da sua API (por padrão `http://localhost:8000`).

---

## Executando com Docker

Para subir **tudo** (API + Frontend) via Docker Compose:

1. **Certifique-se** de ter o **Docker Desktop** aberto e em execução.
2. Na raiz do projeto (onde está `docker-compose.yml`), rode:
   ```bash
   docker-compose up --build
   ```
   - Isso construirá as imagens do **backend** e **frontend** e subirá ambos os containers.
   - O backend ficará acessível em [http://localhost:8000](http://localhost:8000).
   - O frontend, em [http://localhost:3000](http://localhost:3000).

3. **Verificando**:
   - Para ver logs, deixe o terminal aberto.
   - Se desejar rodar em segundo plano, use `-d`:
     ```bash
     docker-compose up --build -d
     ```

4. **Parar os containers**:
   ```bash
   docker-compose down
   ```

---

## Endpoints da API

A API do **backend** (FastAPI) expõe, por exemplo:

- **GET /acomodacoes**  
  - Retorna uma lista com todas as acomodações.
  - Possíveis filtros via query params (ex.: `cidade`, `tipo_imovel` etc.).
  - Exemplo: `GET /acomodacoes?cidade=Florianópolis`

- **GET /acomodacoes/{id}**  
  - Retorna detalhes de uma acomodação específica.

Para mais detalhes, consulte a [documentação automática Swagger](http://localhost:8000/docs) quando a API estiver rodando.

---


