#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR /usr/src/user_api

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
RUN npm install 

#Copy remaining files
COPY ./ ./

#Default command
CMD ["npm","start"]