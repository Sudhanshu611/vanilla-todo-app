
export let incompleteToDoList = JSON.parse(localStorage.getItem('todo')) || [];

export function print(){
    console.log(incompleteToDoList);
}

export function saveToLocalStorage(){
    localStorage.setItem('todo', JSON.stringify(incompleteToDoList));
}

export function removeToDo(id){
    let newTodo =[];
    incompleteToDoList.forEach((todo) => {
        if (todo.id !== id){
            newTodo.push(todo);
        }
    });
    console.log(newTodo);
    incompleteToDoList = newTodo;
    console.log(incompleteToDoList);
    saveToLocalStorage(); 
}