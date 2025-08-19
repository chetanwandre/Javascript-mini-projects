document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('input-todo')
const addTaskButton = document.getElementById('add-task-btn')
const todoList = document.getElementById('todo-list')

let taskArray = JSON.parse(localStorage.getItem('tasks')) || []

taskArray.forEach((task) => renderTask(task)) 

addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim()   // removes spaces
    if(taskText === "") return;

    // create object for each task
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    // store tasks in array and display for console
    taskArray.push(newTask)
    saveTask()
    renderTask(newTask)
    todoInput.value = ""
    console.log(taskArray);
    
})



function renderTask(task) {
    const li = document.createElement('li')
    li.setAttribute('data-id', task.id)
    li.innerHTML = `
    <span>${task.text}</span>
    <button> delete </button>
    `
    
    li.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTask()
    })

    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation()
        taskArray = taskArray.filter(t => t.id !== task.id)
        li.remove()
        saveTask()
    })

    todoList.appendChild(li)
}



// saving data to local storage
function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(taskArray))
}
})