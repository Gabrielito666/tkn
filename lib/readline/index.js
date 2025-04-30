const readline = require('readline');
const { EventEmitter } = require('events');
const colors = require('../colors');

const inputPassword = (query) => new Promise((resolve) => {
  process.stdout.write(query + "\n");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  let password = '';

  process.stdin.on('data', function onData(char) {
    if (char === '\r' || char === '\n') {
      process.stdout.write('\n');
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.removeListener('data', onData);
      resolve(password);
    } else if (char === '\u0003') { // Ctrl+C
      process.stdout.write('\n');
      process.exit();
    } else if (char === '\u007f') { // Backspace
      if (password.length > 0) {
        password = password.slice(0, -1);
        process.stdout.write('\b \b');
      }
    } else {
      password += char;
      process.stdout.write('*');
    }
  });
});


// Función input normal (con prompt)
function input(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

// Clase para eventos de teclas especiales
class KeyListener extends EventEmitter {
  constructor() {
    super();
    this.listen();
  }

  listen() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (key) => {
      if (key === '\u001b[A') this.emit('up');    // Flecha arriba
      else if (key === '\u001b[B') this.emit('down');  // Flecha abajo
      else if (key === '\u0003') process.exit(0)// Ctrl+C
      else if (key === '\n' || key === '\r') this.emit('enter');
      else this.emit('key', key); // cualquier otra tecla
    });
  }

  stop() {
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }
}

const keyListener = new KeyListener();

const select = (...options) => new Promise((resolve, reject) =>
{
    console.clear();
    const selected = { index: 0, options };
    const keyListener = new KeyListener();
    
    const render = () => {
        console.clear();
        options.forEach((option, index) => {
        if (index === selected.index) {
            console.log(`> ${colors.cyan}${option}`);
        } else {
            console.log(`  ${colors.white}${option}`);
        }
        });
    };
    
    keyListener.on('up', () => {
        selected.index = (selected.index - 1 + options.length) % options.length;
        render();
    });
    
    keyListener.on('down', () => {
        selected.index = (selected.index + 1) % options.length;
        render();
    });
    
    keyListener.on('enter', (key) => {
        keyListener.stop();
        resolve(options[selected.index]);
    });
    
    render();
});

module.exports = {  
  input,
  inputPassword,
  KeyListener,
  keyListener,
  select
};