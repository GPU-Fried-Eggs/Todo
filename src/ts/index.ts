import { SERVICE_URL } from "./config";
import { Todos } from "./Todos";
import { Task } from "./Task";

const todos = new Todos(SERVICE_URL);

const list = <HTMLUListElement>document.querySelector("#todo-list");
const input = <HTMLInputElement>document.querySelector("#new-todo");

input.disabled = true

todos.getTasks().then((tasks: Array<Task>) => {
    tasks.forEach(task => renderTask(task));
    input.disabled = false;
}).catch(error => alert(error));

input.addEventListener("keypress", event => {
    if (event.key == "Enter") {
        event.preventDefault();
        const text = input.value.trim();
        if (text.length !== 0) {
            todos.addTask(text).then((task: Task) => {
                input.value = '';
                input.focus();
                renderTask(task)
            });
        }
    }
});

const renderTask = (task: Task) => {
    const item = document.createElement("li");
    item.setAttribute("class", "list-group-item");
    item.textContent = task.text;
    renderSpan(item, task.text);
    renderLink(item, task.id);
    list.append(item);
};

const renderSpan = (item: HTMLLIElement, text: string) => {
    const span = document.createElement("span");
    span.innerHTML = text;
    item.append(span);
};

const renderLink = (item: HTMLLIElement, id: number) => {
    const link = document.createElement("a");
    link.innerHTML = '<i class="bi bi-trash"></i>';
    link.setAttribute("style", "float: right");
    link.addEventListener("click", event => {
        todos.removeTask(id).then(id => {
           const target = document.querySelector(`[data-key='${id}']`);
           if (target) list.removeChild(target);
        });
    });
    item.append(link);
};
