FROM node:18

WORKDIR /back

COPY package*.json ./

RUN npm install

COPY . .

ENV URL=$URL

EXPOSE 3001

CMD ["npm", "run","start"] 

# CMD ["npm", "run build && npm start"]