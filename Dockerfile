FROM node
WORKDIR /dist
COPY package*.json ./
RUN npm install -g npm@8.12.1
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
