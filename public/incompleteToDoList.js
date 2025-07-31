class Todo {
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
let incompleteToDoList = (JSON.parse(localStorage.getItem('todo')) || []);

function print(){
    console.log(incompleteToDoList);
}

function saveToLocalStorage(){
    localStorage.setItem('todo', JSON.stringify(incompleteToDoList));
}

function removeToDo(id){
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

modeule.exports = {
    incompleteToDoList,
    saveToLocalStorage,
    removeToDo,
    Todo
};