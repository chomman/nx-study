FROM node:14 AS nx-study-base
WORKDIR /app
COPY . .
RUN npm ci -S
RUN npm run build -S
RUN npm prune --production -S

FROM nginx:alpine AS nx-study-todos
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=nx-study-base /app/dist/apps/todos .

FROM node:14 AS nx-study-api
EXPOSE 3333
WORKDIR /app
COPY --from=nx-study-base /app/node_modules /app/node_modules
COPY --from=nx-study-base /app/dist/apps/api .
CMD ["node", "main.js"]
