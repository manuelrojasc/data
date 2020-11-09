FROM node:stretch-slim
# Create app directory
WORKDIR /usr/src/app/ms2
# Bundle app source
COPY package.json .
RUN npm install
# Bundle app source
COPY . .
EXPOSE 7000
CMD [ "npm", "start" ]