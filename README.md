## TP-Encuetas-MEAN

## Instalación
```bash
git clone https://github.com/ArqSoftware-1/Encuestas.git
cd Encuestas

# Instalar dependencias
npm install

# Correr sercer
npm run develop

# url: http://localhost:3000
```
##En public/index.html:

###Para modo desarrollo

<script src="assets/js/systemjs.config.js"></script>
<script>
    System.import('app').catch(function(err) { console.error(err); });
</script>

###Para modo producción

<!-- Production mod -->
<script src="js/bundle.min.js"></script>
