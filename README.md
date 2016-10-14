# Encuentas - Arquitectura de software 1

## Tecnologías

- Angular 2 ( 2.0 final realase )
- Express
- NodeJS
- Bootstrap 3.3.7
- Mongoosejs (próximamente)

## Instalación
```bash
git clone https://github.com/ArqSoftware-1/Encuestas.git
cd Encuestas

# Instalar dependencias
npm install

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
