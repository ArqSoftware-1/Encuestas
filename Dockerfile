FROM node:6

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install &&\
    npm install -g typescript &&\
    tsc -p server &&\
	tsc -p client 

EXPOSE 3000

CMD ["node", "server/bin/www"]