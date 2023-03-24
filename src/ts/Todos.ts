import { Task } from "./Task";

export class Todos {
    public tasks: Array<Task> = [];
    private backendUrl;

    constructor(url: string) {
        this.backendUrl = url;
    }

    async getTasks() {
        const response: Response = await fetch(this.backendUrl);
        const result = await response.json();
        this.resolveJson(result);
        return this.tasks
    }

    async addTask(text: string) {
        const response: Response = await fetch(`${this.backendUrl}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: text })
        });
        const result = await response.json();
        return this.formatJson(+result.id, text);
    }

    async removeTask(id: number) {
        const response: Response = await fetch(`${this.backendUrl}/${id}`, { method: "DELETE" });
        const result = await response.json();
        return this.removeJson(+result.id);
    }

    private resolveJson(json: any): void {
        json.forEach(node => {
            const task = new Task(node.id, node.description);
            this.tasks.push(task)
        });
    }

    private formatJson(id: number, text: string): Task {
        const task = new Task(id, text);
        this.tasks.push(task);
        return task;
    }

    private removeJson(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
