import Project from "./todo.js";

export default class {
    static saveProjectData(data) {
        localStorage.setItem("projects", JSON.stringify(data));
    }

    static loadProjectData() {
        return JSON.parse(localStorage.getItem("projects"));
    }

    static parseAsProjects(data) {
        const savedProjects = [];
        if(!data) return savedProjects;

        data.forEach(project => {
            const savedProject = new Project(project.title);
            (project.items).forEach(item => {
                savedProject.addTodoItem(item);
            });
            savedProjects.push(savedProject);
        });
        
        return savedProjects;
    }
}