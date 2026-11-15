export default class {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.items = [];
    }

    #TodoItem = class {
        constructor(item) {
            this.id = crypto.randomUUID();
            this.title = item.title;
            this.description = item.description;
            this.dueDate = item.dueDate;
            this.priority = item.priority;
            this.checklist = item.checklist;
        }

        toggleChecklist() {
            this.checklist = !this.checklist;
        }
    };

    createTodoItem(item) {
        this.items.push(new this.#TodoItem(item));
    }

    deleteTodoItem(id) {
        const indexToDelete = this.items.findIndex((item) => item.id === id);
        this.items.splice(indexToDelete, 1);
    }

    editTodoItem(item) {
        const indexToEdit = this.items.findIndex((cur) => cur.id === item.id);
        this.items[indexToEdit].title = item.title;
        this.items[indexToEdit].description = item.description;
        this.items[indexToEdit].dueDate = item.dueDate;
        this.items[indexToEdit].priority = item.priority;
    }
}
