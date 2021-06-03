const inputNewTask = document.querySelector('.input-new-task');
const buttonAddTask = document.querySelector('.button-add-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li'); // Criar uma lista HTML pelo Javascript
    return li;
}

inputNewTask.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { // Quando o botão enter for pressionado
        if (!inputNewTask.value) return; // Quando nada for digitado
        createTask(inputNewTask.value);
    }
});

function clearInput() {
    inputNewTask.value = ''; // Apagar sempre a escrita anterior
    inputNewTask.focus(); // Cursor ficar piscando
}

function createButtonErase(li) { 
    li.innerHTML += ' ';
    const buttonErase = document.createElement('button'); // Criar botão de apagar
    buttonErase.innerHTML = 'Apagar';
    buttonErase.setAttribute('class', 'apagar') 
    li.appendChild(buttonErase); // buttonErase é filho de li
}

function createTask(textInput) {
    const li = createLi();
    li.innerHTML = textInput;
    tasks.appendChild(li); // li é filha de tasks
    clearInput();
    createButtonErase(li);
    salveTasks();
}

buttonAddTask.addEventListener('click', function() {
    if (!inputNewTask.value) return;
    createTask(inputNewTask.value);
});

document.addEventListener('click', function(event) {
    const element = event.target;
    if (element.classList.contains('apagar')) { // Selecionar o botão apagar
        element.parentElement.remove(); // Remover o pai/mãe do botão apagar e ele mesmo
        salveTasks();
    }
})

function salveTasks() {
    const liTasks = tasks.querySelectorAll('li'); // Selecionar todos os li
    const listOfTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim(); // Remover o apagar escrito
        listOfTasks.push(taskText);
    }
    const tasksJSON = JSON.stringify(listOfTasks); // Converter o array em string
    localStorage.setItem('tasks', tasksJSON); // Salvar as strings no storage
}   // As conversões de JSON são para página não perder os dados salvos se for fechada

function addTasksSalve() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks); // Converter de volta a string em array

    for (let task of listOfTasks) {
        createTask(task);
    }
}
addTasksSalve();