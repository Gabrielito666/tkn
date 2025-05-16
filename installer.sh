#!/bin/bash

INSTALL_DIR="$HOME/.tkn"
BASHRC="$HOME/.bashrc"
BUNDLE_URL="https://raw.githubusercontent.com/Gabrielito666/tkn/main/bundle.js"

# Función para agregar líneas al bashrc si no existen
add_to_bashrc() {
  local LINE="$1"
  grep -qxF "$LINE" "$BASHRC" || echo "$LINE" >> "$BASHRC"
}

# Verificar dependencias
echo "🔍 Verificando dependencias..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js no está instalado. Instálalo antes de continuar."
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "❌ npm no está instalado. Instálalo antes de continuar."
  exit 1
fi

if ! command -v nvm &> /dev/null; then
  echo "❌ nvm no está instalado. Instálalo antes de continuar."
  exit 1
fi

# Descargar bundle.js
echo "⬇️ Descargando bundle.js..."
mkdir -p "$INSTALL_DIR"
curl -sSf "$BUNDLE_URL" -o "$INSTALL_DIR/bundle.js" || {
  echo "❌ Error: No se pudo descargar bundle.js"
  exit 1
}

# Instalar clipboardy
echo "📦 Instalando clipboardy..."
npm install clipboardy --prefix "$INSTALL_DIR"

# Agregar alias
echo "🛠 Configurando alias..."
add_to_bashrc "export TKN_PATH=$INSTALL_DIR"
add_to_bashrc "alias tkn='node \$TKN_PATH/bundle.js'"

# Aplicar cambios
source "$BASHRC"

echo "✅ Instalación completada. Usa 'tkn' en la terminal para comenzar."