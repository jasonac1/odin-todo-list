import Project from "./todo.js";
import Storage from "./storage.js";
import Display from "./display.js";
import "./styles.css";

const appController = (() => {
    function parseAsProjects(data) {
        const savedProjects = [];
        if (!data) return savedProjects;

        data.forEach((project) => {
            const savedProject = new Project(project.title);
            project.items.forEach((item) => {
                savedProject.createTodoItem(item);
            });
            savedProjects.push(savedProject);
        });

        return savedProjects;
    }

    const data = Storage.loadProjectData();
    const savedProjects = parseAsProjects(data);

    const displayController = new Display();
    // displayController.displayCurrentProjectLayout(
    //     savedProjects,
    //     savedProjects[0],
    // );
    displayController.displayAllProjectsLayout(savedProjects);
})();
