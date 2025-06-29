# SISTEMA DE GESTIÓN DE MANTENIMIENTO (GEMA)

Breve descripción sobre el mismo.

## INSTALACIÓN

Una vez clonado el repositorio, se deben seguir los siguientes pasos:

1. Instalar dependencias con composer

```bash
    composer install
```

2. Instalar dependencias del frontend por medio de npm

```bash
    npm install
```

3. Construir paquete del frontend por medio de npm

```bash
    npm run build
```

4. Crear archivo .env por medio de copiar el archivo .env.example asignando credenciales de tu base de datos

5. Correr migración de la base de datos

```bash
    php artisan migrate:fresh --seed
```

6. Generar llave única de la aplicación

```bash
    php artisan key:generate
```

7. Correr proyecto

```bash
    composer run dev
```
