const {incompleteToDoList, saveToLocalStorage, removeToDo, Todo} = require('./incompleteToDoList.js')


function renderTodoList(){

    // Used map() for cleaner code
    const todoTextHTML = incompleteToDoList.map((todo) => {return `<div class="todo-value ">
                        <div class="text-container">
                        <input type="checkbox" ${todo.completed ? 'checked' : ''} class="js-checkbox-value checkbox-value" data-checkbox-id="${todo.id}">
                        <div class="value ${todo.completed ? 'line-through' : ''} text-${todo.id}">${todo.text}</div>
                        </div>
                        <button class="js-delete-btn" data-todo-id="${todo.id}"><img src="../images/cancel.png" alt=""></button>
                        </div>
                    `}).join('');
    document.querySelector('.js-todo-list-container').innerHTML = todoTextHTML;

    // Delete Event Listener
    document.querySelectorAll('.js-delete-btn').forEach((button)=>{
        button.addEventListener('click', () => {
            let todoId= Number(button.dataset.todoId);
            removeToDo(todoId);
            renderTodoList();   
        })
    })     

    // Checkbox Event Listener
    document.querySelectorAll('.js-checkbox-value').forEach((checkbox) =>{
        checkbox.addEventListener('change', () => {
            const id = checkbox.dataset.checkboxId;
            const text = document.querySelector(`.text-${id}`);
            let todoObj;
            incompleteToDoList.forEach((list) => {
                if (list.id === Number(id)){
                    todoObj = list;
                }
            })
            todoObj.toggleComplete();
            text.classList.toggle('line-through',todoObj.completed);
            saveToLocalStorage();
        })
    })   
    }

// Add BTN Event listener
document.querySelector('.js-add-btn').addEventListener('click', () => {
    const todoText = document.querySelector('.js-todo-input-value').value;
    const newTodo = new Todo(todoText);
    incompleteToDoList.push(newTodo);
    renderTodoList();
    saveToLocalStorage();
})

renderTodoList();



