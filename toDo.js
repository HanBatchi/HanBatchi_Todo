const todoName = document.querySelector('input[name="todoname"]');
const todoDate = document.querySelector('input[name="tododate"]');
const todoTime = document.querySelector('input[name="todotime"]');
const form = document.querySelector('#formTodo');
const todoList = document.querySelector('#toDos');

// Class names for styling
const liClass = 'todo-task';
const completedClass = 'completed-task';
const spanClass = 'spanTodo';
const crossTask = 'cross-task';
const deleteClass = 'delete-button' ;

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = Array.from(todoList.children).map(task => {
    return {
      text: task.innerText,
      completed: task.classList.contains(crossTask),
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskData => {
    const newTodo = document.createElement('li');
    newTodo.classList.add(liClass);
    newTodo.innerText = taskData.text;
    if (taskData.completed) {
      newTodo.classList.add(crossTask);
    }
    todoList.appendChild(newTodo);
  });
}

// Load local storage when the page loads
loadTasksFromLocalStorage();

todoList.addEventListener('click', function(e){
  if(e.target.tagName === 'BUTTON'){
    e.target.parentElement.remove();
    saveTasksToLocalStorage();
  } else if (e.target.tagName === 'LI'){
    e.target.classList.toggle('important-task');
  }
});

form.addEventListener('submit', function(e){
  e.preventDefault();
  const newTodo = document.createElement('li');
  const newDate = document.createElement('span');
  const newTime = document.createElement('span');
  const completedBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  completedBtn.addEventListener('click', function(e){
    alert('Nice Job!');
    newTodo.classList.toggle(crossTask);
    completedBtn.remove();
    saveTasksToLocalStorage(); 
  });

  newTodo.classList.add(liClass);
  completedBtn.classList.add(completedClass);
  removeBtn.classList.add(deleteClass);
  newDate.classList.add(spanClass);
  newTime.classList.add(spanClass);
  
  completedBtn.innerText = 'Completed';
  removeBtn.innerText = 'Delete';

  // Creating space between span and newTodo 
  const space1 = document.createElement('span');
  const space2 = document.createElement('span');
  space1.innerText = ' - '; 
  space2.innerText = ' - '; 

  // Set the content-date-time of the new elements
  newTodo.innerText = todoName.value;
  newDate.innerText = todoDate.value;
  newTime.innerText = todoTime.value;
  
  newTodo.appendChild(space1); 
  newTodo.appendChild(newDate);
  newTodo.appendChild(space2); 
  newTodo.appendChild(newTime);
  newTodo.appendChild(completedBtn);
  newTodo.appendChild(removeBtn);
  todoList.appendChild(newTodo);

  todoName.value = '';
  todoDate.value = '';
  todoTime.value = '';
  
  saveTasksToLocalStorage(); 
});
