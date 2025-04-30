# TKN

Este es un gestor de contraseñas seguro que permite almacenar y recuperar contraseñas desde la terminal, cifradas con una única contraseña maestra.

Es una app 100% de terminal.

## 🚀 Instalación

Para instalarlo, abre tu terminal y ejecuta:

```bash
curl -s https://raw.githubusercontent.com/Gabrielito666/tkn/main/installer.sh | bash
```

Esto descargará el script `bundle.js`, creará la carpeta oculta `~/.tkn/`, instalará lo necesario y configurará un alias llamado `tkn`.

## 🔐 Primer uso

Al ejecutar el comando:

```bash
tkn
```

Se te pedirá que configures una contraseña maestra. Esta será la clave que se usará para cifrar y descifrar tus contraseñas.

Cada vez que ingreses a la app, deberás escribir esta contraseña para acceder.

## 🧭 Menú principal

Una vez dentro, verás el siguiente menú con 4 opciones:

- `create tkn` → Guarda una nueva contraseña
- `delete tkn` → Elimina una contraseña guardada
- `get tkn` → Recupera una contraseña (y la copia al portapapeles)
- `salir` → Cierra la aplicación

¡Eso es todo! Simple, seguro, local y sin conexión a internet.
