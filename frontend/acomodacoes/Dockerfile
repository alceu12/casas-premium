# Etapa 1: Construção do build
FROM node:18 AS build-stage

WORKDIR /app

# Primeiro copia os package*.json para instalar dependências
COPY package*.json ./

RUN npm install

# Agora copia todo o restante do frontend
COPY . .

# Gera o build de produção
RUN npm run build

# Etapa 2: Servir o build com Nginx (outra opção é rodar local dev server, mas a forma clássica de produção é com Nginx)
FROM nginx:alpine

# Remove configuração default do Nginx e adiciona a nossa se quiser customizar
# COPY nginx.conf /etc/nginx/conf.d/default.conf  (caso deseje)

# Copia o build gerado na etapa anterior
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
