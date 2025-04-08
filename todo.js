import {incompleteToDoList, saveToLocalStorage, removeToDo} from './incompleteToDoList.js'


function renderTodoList(){
    const todoTextHTML = incompleteToDoList.map((todo) => {return `<div class="todo-value ">
                        <div class="text-container">
                        <input type="checkbox" ${todo.completed ? 'checked' : ''} class="js-checkbox-value checkbox-value" data-checkbox-id="${todo.id}">
                        <div class="value ${todo.completed ? 'line-through' : ''} text-${todo.id}">${todo.text}</div>
                        </div>
                        <button class="js-delete-btn" data-todo-id="${todo.id}"><img src="images/cancel.png" alt=""></button>
                    </div>
                    
                    `}).join('');
    
        // incompleteToDoList.forEach((todo)=>{
        //     todoTextHTML += `<div class="todo-value ">
        //                 <div class="text-container">
        //                 <input type="checkbox" ${todo.completed ? 'checked' : ''} class="js-checkbox-value checkbox-value" data-checkbox-id="${todo.id}">
        //                 <div class="value ${todo.completed ? 'line-through' : ''} text-${todo.id}">${todo.text}</div>
        //                 </div>
        //                 <button class="js-delete-btn" data-todo-id="${todo.id}"><img src="images/cancel.png" alt=""></button>
        //             </div>
                    
        //             `
                    
        // })
        document.querySelector('.js-todo-list-container').innerHTML = todoTextHTML;

        document.querySelectorAll('.js-delete-btn').forEach((button)=>{
            button.addEventListener('click', () => {
                let todoId= Number(button.dataset.todoId);
                removeToDo(todoId);
                renderTodoList();   
            })
        })     
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

                if (checkbox.checked){
                    text.classList.add('line-through');
                    todoObj.completed = true;
                }
                else{
                    text.classList.remove('line-through');
                    todoObj.completed = false;
                }
                saveToLocalStorage();
            })
        })   
    }
document.querySelector('.js-add-btn').addEventListener('click', () => {
    const todoText = document.querySelector('.js-todo-input-value').value;
    const id = Date.now();
    incompleteToDoList.push({
        id: id,
        text: todoText,
        completed: false
    });
    renderTodoList();
    saveToLocalStorage();
})



renderTodoList();



