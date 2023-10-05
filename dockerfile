FROM node:18-alpine

WORKDIR /back

COPY . .

RUN npm install

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]

# CMD ["npm", "run build && npm start"]