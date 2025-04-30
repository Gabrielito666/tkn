#!/bin/bash

INSTALL_DIR="$HOME/.tkn"
BASHRC="$HOME/.bashrc"
BUNDLE_URL="https://raw.githubusercontent.com/Gabrielito666/tkn/main/bundle.js"

# Crear carpeta si no existe
mkdir -p "$INSTALL_DIR"

# Descargar bundle.js
curl -sSf "$BUNDLE_URL" -o "$INSTALL_DIR/bundle.js"
if [ $? -ne 0 ]; then
  echo "❌ Error: No se pudo descargar bundle.js"
  exit 1
fi

# Agregar variable de entorno si no existe
if ! grep -q 'TKN_PATH' "$BASHRC"; then
  echo "export TKN_PATH=$INSTALL_DIR" >> "$BASHRC"
fi

# Agregar alias si no existe
if ! grep -q 'alias tkn=' "$BASHRC"; then
  echo "alias tkn='node $INSTALL_DIR/bundle.js'" >> "$BASHRC"
fi

npm install clipboardy --prefix $INSTALL_DIR

# Aplicar cambios sin reiniciar
source "$BASHRC"

echo "✅ Instalación completada. Usa 'tkn' en la terminal para comenzar."