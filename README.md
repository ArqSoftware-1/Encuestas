# Encuentas - Arquitectura de software 1

## Deploy en heroku

https://encuestas-inscripcion.herokuapp.com

## Tecnologías

- Angular 2 ( 2.0 final realase )
- Express
- NodeJS
- Bootstrap 3.3.7
- Mongoosejs (próximamente)
- Loggly (para guardar los logs en la nube)

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
