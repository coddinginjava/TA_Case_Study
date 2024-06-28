
FROM node:21-alpine as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# the below is for Vite app
COPY --from=builder /app/dist .        

ENTRYPOINT ["nginx", "-g", "daemon off;"]
