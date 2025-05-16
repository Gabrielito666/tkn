# TKN

Este es un gestor de contraseñas seguro que permite almacenar y recuperar contraseñas desde la terminal, cifradas con una única contraseña maestra.

Es una app 100% de terminal.

## 🚀 Instalación

Para instalarlo, abre tu terminal y ejecuta:

```bash
curl -s https://raw.githubusercontent.com/Gabrielito666/tkn/main/installer.sh | bash
```

Esto descargará el script `bundle.js`, creará la carpeta oculta `~/.tkn/`, instalará lo necesario y configurará un alias llamado `tkn`.

(si el alias no se configura bien puedes ejecutar luego `source ~/.bashrc` ya que esta linea en el instalador a veces falla)

Para actualizar el paquete a alguna futura versión puedes ejecutar el mismo comando.

La data está dentro de ~/.tkn/data.enc

Recomiendo siempre tener un respaldo fisico de tus contraseñas por si pierdes este archivo. Tkn se diseñó como una forma de acceder a claves con velocidad y de forma local, pero no guarda respaldos en ninguna parte.


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

## 🆕 Nuevos métodos en la versión `1.0.1`

La versión `1.0.1` de `tkn` incorpora nuevas formas de uso directo, permitiendo ejecutar acciones sin pasar por el menú interactivo.

---

### 📋 Menú principal

```bash
tkn
```

Ejecuta el menú interactivo como de costumbre.

---

### 🔐 Crear un token

```bash
tkn create
# o
tkn c
```

Lanza directamente el flujo para crear un nuevo token. Puedes agregar un parámetro `--tag` para omitir la solicitud de nombre:

```bash
tkn c --tag "mi-tag"
```

Se te solicitará el token secreto directamente.

---

### ❌ Eliminar un token

```bash
tkn delete
# o
tkn d
```

Inicia el flujo para eliminar un token. Puedes usar `--tag` para evitar la selección manual:

```bash
tkn d --tag "mi-tag"
```

---

### 🔍 Obtener un token

```bash
tkn get
# o
tkn g
```

Muestra el selector de token. Puedes usar:

```bash
tkn g --tag "mi-tag" --log --clipboard
```

* `--tag` especifica el token a recuperar directamente
* `--log` imprime el valor en consola (precaución si usas historial de terminal)
* `--clipboard` copia el token al portapapeles

Si no especificas `--log` ni `--clipboard`, por defecto **solo se copiará al portapapeles**. Si usas ambos, irá a ambos destinos.

---

### ❓ Ayuda

```bash
tkn help
# o
tkn h
```

Muestra los comandos disponibles.

---

### 🎮 Ejemplo de atajo

Puedes crear funciones en tu `.bashrc` para automatizar acciones. Por ejemplo:

```bash
open-ssh() {
  tkn get --tag "mi-clave-de-ssh"
  ssh usuario@ip
}
```

Esto primero pondrá la clave SSH en el portapapeles (previa autorización), y luego podrás pegarla directamente al conectarte por `ssh`, sin pasar por el menú.

---
### Node versions
Funcióna desde la versión 18 en adelante