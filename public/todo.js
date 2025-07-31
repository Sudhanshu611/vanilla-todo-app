let currentStatusFilter = 'incomplete';

async function renderTodoList(){
    const fetchedTasks = await fetchAllTask(currentStatusFilter);
    console.log(fetchedTasks)
    

    // Used map() for cleaner code
    const todoTextHTML = fetchedTasks.map((todo) => {return `<div class="todo-value ">
                        <div class="text-container">
                        <input type="checkbox" class="js-checkbox-value checkbox-value" data-checkbox-id="${todo.id}" ${todo.status === 'complete' ? 'checked' : ''}>
                        <div class="value ${todo.status === 'complete' ? 'line-through' : ''} text-${todo.id}">${todo.task}</div>
                        </div>
                        <button class="js-delete-btn" data-todo-id="${todo.id}"><img src="../images/cancel.png" alt=""></button>
                        </div>
                    `}).join('');
    document.querySelector('.js-todo-list-container').innerHTML = todoTextHTML;

    // Delete Event Listener
    document.querySelectorAll('.js-delete-btn').forEach((button)=>{
        button.addEventListener('click', async () => {
            let todoId= Number(button.dataset.todoId);
            await deleteTask(todoId);
            renderTodoList();   
        })
    })     

    // Checkbox Event Listener
    document.querySelectorAll('.js-checkbox-value').forEach((checkbox) =>{
        checkbox.addEventListener('change', async () => {
            const id = checkbox.dataset.checkboxId;
            const newStatus = checkbox.checked ? 'complete' : 'incomplete';
            await updateTask(newStatus, id);
            await renderTodoList();
        })
    })   
    }

document.querySelectorAll('.toggleBtn').forEach(btn => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        currentStatusFilter = btn.innerText.toLowerCase();
        await renderTodoList();    
    });
});

// Add BTN Event listener
document.querySelector('.js-add-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const todoText = document.querySelector('.js-todo-input-value').value;
    await insertTask(todoText);
    renderTodoList();
})




// Backend script

async function fetchAllTask(status = 'incomplete'){
    const response = await fetch(`/task/status/${status}`, {
        method : 'GET',
        headers : {'Content-Type' : 'application/json'}
    });

    const {fetchedTasks} = await response.json();
    return fetchedTasks;
}
async function deleteTask(id){
    const response = await fetch('/task/' + id, {
        method : 'DELETE',
        headers : {'Content-Type' : 'application/json'}
    });
}
async function insertTask(taskText){
    const response = await fetch('/task', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body:JSON.stringify({
            task : taskText
        })
    });
}
async function updateTask(status, id){
    const response = await fetch('/task/status/' + id, {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body:JSON.stringify({
            status : status
        })
    });
}

renderTodoList();
