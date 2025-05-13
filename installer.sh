#!/bin/bash

INSTALL_DIR="$HOME/.tkn"
BASHRC="$HOME/.bashrc"
BUNDLE_URL="https://raw.githubusercontent.com/Gabrielito666/tkn/main/bundle.js"
NODE_VERSION="23"

# Función para agregar líneas al bashrc si no existen
add_to_bashrc() {
  local LINE="$1"
  grep -qxF "$LINE" "$BASHRC" || echo "$LINE" >> "$BASHRC"
}

# Instalar NVM si no existe
if ! command -v nvm &> /dev/null; then
  echo "🛠 Instalando NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # Cargar NVM para esta sesión
  export NVM_DIR="$HOME/.nvm"
  # shellcheck disable=SC1091
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
  # shellcheck disable=SC1091
  [ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"
else
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
fi

# Verificar Node 23
if ! nvm ls "$NODE_VERSION" &> /dev/null; then
  echo "📦 Instalando Node.js $NODE_VERSION..."
  nvm install "$NODE_VERSION"
fi

# Usar Node 23 para instalar clipboardy
nvm use "$NODE_VERSION"
mkdir -p "$INSTALL_DIR"
curl -sSf "$BUNDLE_URL" -o "$INSTALL_DIR/bundle.js" || {
  echo "❌ Error: No se pudo descargar bundle.js"
  exit 1
}

npm install clipboardy --prefix "$INSTALL_DIR"

# Variables y alias
add_to_bashrc "export TKN_PATH=$INSTALL_DIR"
add_to_bashrc "alias tkn='nvm use $NODE_VERSION > /dev/null && node \$TKN_PATH/bundle.js'"

# Aplicar cambios
source "$BASHRC"

echo "✅ Instalación completada. Usa 'tkn' en la terminal para comenzar."