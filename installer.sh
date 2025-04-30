#!bin/bash

mkdir ~/.tkn
cd ~/.tkn
curl bla bla bla desde git
touch data.enc

echo "export TKN_PATH=~/.tkn/" >> ~/.bashrc
echo "alias tkn=node ~/.tkn/bundle.js" >> ~/.bashrc

npm install clipboardy

source ~/.bashrc