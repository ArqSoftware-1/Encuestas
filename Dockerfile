FROM node:6

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install
RUN npm install -g typescript@2.3.4
RUN tsc -p server
RUN tsc -p client 

EXPOSE 3000

CMD ["node", "server/bin/www"]