window.addEventListener('load',start);

var globalNames = [];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start(){
  inputName = document.querySelector('#inputName')
  
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit(){ // Esta função deverá tirar o recarregamento da pagina após pressionar enter
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName){
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event){
    var hasText = !!event.target.value && event.target.value.trim() !== ''; // o trim elimina os espaços em branco

    if (!hasText){
      clearInput();
      return;
    }

    if (event.key === 'Enter'){ // Serve para capturar a tecla enter, quando pressionada
      if(isEditing){
        updateName(event.target.value);
      } else {
        insertName(event.target.value); // Serve para pegar o que foi escrito na label, no caso no id #inputName
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus(); // Esta função deve deixar o inputName ativo logo após o carregamento da página.
}

function render(){ // pegar elemento das divs (#names) e inserir as coisas dinamicamente
  function createDeleteButton(index){
    function deleteName(){
      globalNames.splice(index, 1); // splice - remove os elementos de um vetor e se necessario insere novos elementos no seu lugar retornando os elementos excluidos
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton'); // Puxa o estilo da classe deleteButton no css
    button.textContent = 'x';
    button.addEventListener('click', deleteName)
    return button;
  }

  function createSpan(name, index){
    function editItem(){
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span'); // inserir um texto dentro de um elemento
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = ''; // Serve para não criar várias listas a cada nome inserido
  
  // criar ul
  // fazer n li's, consforme tamanho do vetor (globalNames)

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++){
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput(){
  inputName.value = ''; // deixando o inputName.value vazio ele apaga o nome apos adiciona-lo a lista
  inputName.focus();
}
