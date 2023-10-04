FROM node:alpine

WORKDIR /back

COPY package*.json ./

RUN npm install

COPY . .

ENV URL=$URL

EXPOSE 3001

CMD ["npm", "run","dev"] 

# CMD ["npm", "run build && npm start"]