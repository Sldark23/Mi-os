const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filesFolderPath = path.join(__dirname, 'files');

function showFiles() {
  fs.readdir(filesFolderPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler a pasta de arquivos:', err);
    } else {
      console.log('\n╭─────────────── Arquivos ───────────────╮');
      files.forEach((file) => {
        console.log(`│ ${file}`);
      });
      console.log('╰───────────────────────────────────────╯');
      showMenu();
    }
  });
}

function createFileOrFolder(name, type) {
  const newFilePath = path.join(filesFolderPath, name);

  if (!name) {
    console.error('O nome é obrigatório.');
    return;
  }

  if (fs.existsSync(newFilePath)) {
    console.error('Já existe um arquivo ou pasta com esse nome.');
    return;
  }

  if (type === 'file') {
    fs.writeFile(newFilePath, '', (err) => {
      if (err) {
        console.error('Erro ao criar o arquivo:', err);
      } else {
        console.log('Arquivo criado com sucesso!');
        showFiles();
      }
    });
  } else if (type === 'folder') {
    fs.mkdir(newFilePath, (err) => {
      if (err) {
        console.error('Erro ao criar a pasta:', err);
      } else {
        console.log('Pasta criada com sucesso!');
        showFiles();
      }
    });
  } else {
    console.error('Tipo inválido. Escolha entre "file" ou "folder".');
  }
}

const apps = [
  { name: 'Arquivos', action: showFiles },
  // Adicione mais aplicativos aqui conforme necessário
];

function showMenu() {
  console.log('\n===== Aplicativos =====\n');
  apps.forEach((app, index) => {
    console.log(`${index + 1}. ${app.name}`);
  });

  rl.question('\nDigite o número do aplicativo desejado: ', (answer) => {
    const appIndex = parseInt(answer) - 1;
    if (appIndex >= 0 && appIndex < apps.length) {
      const selectedApp = apps[appIndex];
      selectedApp.action();
    } else {
      console.log('\nOpção inválida. Tente novamente.\n');
      showMenu();
    }
  });
}

function main() {
  console.log('\nBem-vindo ao Sistema Operacional do Termux!\n');
  showMenu();
}

main();
