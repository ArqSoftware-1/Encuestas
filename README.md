# Encuentas - Arquitectura de software 1

## Deploy en heroku

https://encuestas-inscripcion.herokuapp.com

## Tecnologías

- Angular 2 ( 2.0 final realase )
- Express 4.13.4
- NodeJS >= 5.4.1
- Bootstrap 3.3.7
- Mongoosejs 3.2.10
- Loggly (para guardar los logs en la nube)
- Mocha 2.4.5 (Para testear la API)

## Configuración del entorno

La aplicación se configuró en una pc con sistema operativo Windows

1- Instalar NodeJS y npm, para esto lo bajamos en https://nodejs.org/es/ y lo instalamos.  
2- Instalar Mongo, lo descargamos de su página oficial: https://www.mongodb.com/download-center#community.  
3- Instalar TypeScript de forma global, esto lo realizamos abriendo la consola y ejecutando npm install -g typescript.  
4- Para el desarrollo se utilizó el editor de textor SublimeTex 3 (https://www.sublimetext.com/3), se instaló el módulo Package Control que nos da la posibilidad de instalarle los plugins, en este caso instalaremos TypeScript.  
Para instalar el módulo podemos ver el siguiente tutorial que lo explica muy bien: https://openwebinars.net/instalar-sublime-text-3-y-package-controller/. Una vez instalado abrimos el sublime y apretamos las siguientes teclas para abrir el Package Control (ctrl + shift + p), tipeamos TypeScript y lo instalamos. Si vemos que el archivo .ts no tiene formato de TypeScript hacemos lo siguiente, Vamos a View -> Syntax -> TypeScript -> TypeScript.

## Instalación
```bash
git clone https://github.com/ArqSoftware-1/Encuestas.git
cd Encuestas

# Instalar dependencias
npm install

# Ejecutar mongodb
mongod --dbpath path\to\data

# Correr server
npm run develop

# URL: http://localhost:3000
```
## Correr test de integración (de la API)

```bash
# Correr server 
npm run develop

# Correr test
npm test
```

## Levantar la aplicación con Docker

En primer lugar se debe clonar el proyecto desde Github.

```bash
# Luego pararse en el directorio y correr el comando

cpu_quota=?? cpuset="??" mem_limit=??m memswap_limit=??m mem_reservation=??m docker-compose up

cpu_quota -> Limita el uso de la CPU del contenedor. Por ej: establezca este valor en 50000 para limitar el contenedor al 50% de un recurso de CPU
cpuset -> Indica en que CPU se ejecutara el proceso. Por ej: "0-2" se ejecutara en el 0, 1 y 2
mem_limit -> Limita el uso de memoria
memswap_limit: ??m
mem_reservation: ??m

```

## Correr test de integración con Docker 

Una vez inicializada la aplicación con docker compose ejecutar los siguientes comando en otra consola de docker desde el directorio root del proyecto

```bash
docker build -t encuesta-test -f Dockerfile.test .
# Para el siguiente comando modificar la direccion IP por la asignada en su caso.
docker run -e APP_HOST='http://192.168.99.100:3000' --rm encuesta-test
```

## Ejecutar test de performance con Docker (en desarrollo)

Una vez inicializada la aplicación con docker compose ejecutar los siguientes comando en otra consola de docker desde el directorio root del proyecto

```bash
docker build -t encuesta-performance -f Dockerfile.performance .
# Para el siguiente comando modificar la direccion IP por la asignada en su caso.
docker run -e APP_HOST='192.168.99.100' --rm encuesta-performance
```
## Informe tests de performance

https://github.com/ArqSoftware-1/Encuestas/wiki/Informe-tests-de-performance