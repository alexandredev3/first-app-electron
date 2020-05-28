const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config');

let win;
// Estou criando um variavel global para que toda a minha aplicação tenha acesso ao Window.

function createWindow() {
  // Criando o Browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden', // Ele vai tirar aquela parte debaixo.
    // alwaysOnTop: true, // Ele sempre vai ficar em cima de tudo.
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Carregando o index.html no app
  // win.loadFile('index.html');
  win.loadURL('index.html');
    // Ele vai abrir a janela em um url.

  // Abrir o Dev Tools.
  // win.webContents.openDevTools();
}

function toogleDevTools() {
// Função para abilitar o DevTools.
  win.webContents.toogleDevTools()
}

function createShortcuts() {
  // Posso criar quantos atalhos que eu quiser dentro dessa função.
  globalShortcut.register('CmdOrCtrl+J', toogleDevTools);
    // O primeiro parametro e o atalho, e o segundo e a função que ele vai executar.
    // CmdOrCtrl+J se for no mac: "Cmd", se for no windows: "Ctrl".
}

// Aqui e uma promisse
app.whenReady()
  .then(createWindow)
  .then(createShortcuts)
  // Depois que ele criar a janela ele vai criar o Shortcuts.

// Quando nos abertar no "X", ele vai fazer isso:
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Quando nos abertar para abrir a aplicação ele vai fazer isso:
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
  // Se não tiver nenhuma janela, ele vai criar um nova janela. 

    createWindow();
  }
});