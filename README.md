# test-api-airbag

Api desarrollada con js, nodejs, express, jwt, postgresql,swagger,sequelize, jest <br>

Instrucciones para ejecutar el proyecto: <br>

Pegar el archivo ```.env ``` en la raiz <br>
Cambiar la información del archivo con tu informacion local <br>

Ejecutar el comando para instalar todas las librerias del proyecto <br>
```
npm install 
```

Ejecutar el comando para  postgressql
```
npm install --save pg pg-hstore
```

Ejecutar el comando para migrar las tablas en la bd local. <br>
(Cabe recalcar que antes de ejecutar el comando crear la base de datos vacia) <br>
```sequelize db:migrate```

Ejecutar el proyecto en modo dev <br>
```npm run dev``` 

Abrir en su navegador
```http://localhost:3000/api-airbatech```

Te aparecerá una ventana de swagger con todos los endpoints <br>
Deberas crear un usuario <br>
despues hacer login con el usuario creado <br>
El token que genere el login introducirlo en el candado de cualquier endpoint para que puedas acceder a los demas

Para las pruebas unitarias en el ```userId``` y ```email``` para generar el token, poner un usuario valido de su base de datos <br>
en el archivo. ```___tests___/index.test.js``` <br>  

Para ejecutar los tests con jest <br>
```npm run test``` 
