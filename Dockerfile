############
# Build
FROM node:17 as builder
WORKDIR /usr/web-app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install 
COPY ./config ./config
COPY ./@types ./@types
COPY ./src ./src
COPY ./.eslintrc.js .
COPY ./.eslintignore .
COPY ./.prettierrc.js .
COPY ./.prettierignore .
COPY ./index.html .
COPY vite.config.ts .
COPY ./tsconfig.node.json .
COPY ./tsconfig.build.json ./tsconfig.json
RUN yarn build

############
# Production
FROM nginx
RUN rm -rf /etc/nginx/conf.d
COPY ./config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/web-app/build /usr/share/nginx/html
