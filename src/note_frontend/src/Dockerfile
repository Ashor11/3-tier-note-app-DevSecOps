FROM node:18 AS build

WORKDIR /app
COPY src/note_frontend/src/package.json ./
RUN npm install
COPY src/note_frontend/ ./
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY src/note_frontend/src/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]