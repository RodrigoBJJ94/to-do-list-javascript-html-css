const inputNewTask = document.querySelector('.input-new-task');
const buttonAddTask = document.querySelector('.button-add-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li'); 
    return li;
}

inputNewTask.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { 
        if (!inputNewTask.value) return; 
        createTask(inputNewTask.value);
    }
});

function clearInput() {
    inputNewTask.value = '';
    inputNewTask.focus();
}

function createButtonErase(li) { 
    li.innerHTML += ' ';
    const buttonErase = document.createElement('button'); 
    buttonErase.innerHTML = 'Delete';
    buttonErase.setAttribute('class', 'delete') 
    li.appendChild(buttonErase); 
}

function createTask(textInput) {
    const li = createLi();
    li.innerHTML = textInput;
    tasks.appendChild(li);
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
    if (element.classList.contains('delete')) { 
        element.parentElement.remove(); 
        salveTasks();
    }
})

function salveTasks() {
    const liTasks = tasks.querySelectorAll('li'); 
    const listOfTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim(); 
        listOfTasks.push(taskText);
    }
    const tasksJSON = JSON.stringify(listOfTasks); 
    localStorage.setItem('tasks', tasksJSON); 
}   

function addTasksSalve() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks); 

    for (let task of listOfTasks) {
        createTask(task);
    }
}
addTasksSalve();