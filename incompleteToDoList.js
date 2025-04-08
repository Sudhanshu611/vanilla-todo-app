export class Todo {
    constructor(text){
        this.id = Date.now();
        this.text = text;
        this.completed = false;
    }

    toggleComplete(){
        this.completed = !this.completed;
    }

    className(){
        return this.completed ? 'line-through' : '';
    }
}
export let incompleteToDoList = (JSON.parse(localStorage.getItem('todo')) || []);

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