FROM node:18.15.0

WORKDIR /

COPY dist /

COPY package.json /

COPY .env /

RUN npm i --omit=dev

EXPOSE 38406

CMD ["node", "api/index.js"]