## Correr en dev
1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```pnpm install```
4. Levantar la base de datos ```docker compose up -d ```
5. Correr las migraciones de Prisma ```pnpm prisma migrate dev```
6. Generar el cliente de Prisma ```pnpm prisma generate```
7. Limpiar el localStorage del navegador
8. Ejecutar seed ```pnpm seed```
9. Correr el proyecto ```pnpm dev```