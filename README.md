# Encuentas - Arquitectura de software 1

## Deploy en heroku

https://encuestas-inscripcion.herokuapp.com

## Tecnologías

- Angular 2 ( 2.0 final realase )
- Express
- NodeJS
- Bootstrap 3.3.7
- Mongoosejs
- Loggly (para guardar los logs en la nube)

## Configuración del entorno

La aplicación se configuró en una pc con sistema operativo Windows

1- Instalar NodeJS y npm, para esto lo bajamos en https://nodejs.org/es/ y lo instalamos.
2- Instalar Mongo, lo descargamos de su página oficial: https://www.mongodb.com/download-center#community.
3- Instalar TypeScript de forma global, esto lo realizamos abriendo la consola y ejecutando npm install -g typescript.
4- Para el desarrollo se utilizó el editor de textor SublimeTex 3 (https://www.sublimetext.com/3), se instaló el módulo Package Control que nos da la posibilidad de instalarle los plugins, en este caso instalaremos TypeScript.
Para instalar el módulo podemos ver el siguiente tutorial que lo explica muy bien: https://openwebinars.net/instalar-sublime-text-3-y-package-controller/. Una vez instalado abrimos el sublime y apretamos las siguientes teclas para abrir el Package Control (ctrl + shift + p), tipeamos TypeScript y lo instalamos. Si vemos que el archivo .ts no tiene formato de TypeScrip hacemos lo siguiente, Vamos a View -> Syntax -> TypeScript -> TypeScript.

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

## Para desarrollar
Descomentar en public/index.html:

```html
<script src="assets/js/systemjs.config.js"></script>
<script>
    System.import('app').catch(function(err) { console.error(err); });
</script>
```

Comentar
```html
<!-- Production mod -->
<script src="js/bundle.min.js"></script>
```
