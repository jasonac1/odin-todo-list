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

    let data = Storage.loadProjectData();
    if (!data || data.length === 0) {
        const defaultProject = new Project("Default Project");
        Storage.saveProjectData([defaultProject]);
        data = Storage.loadProjectData();
    }

    const projects = parseAsProjects(data);

    const displayController = new Display();
    displayController.displayAllProjectsLayout(projects);

    const dialog = document.querySelector("dialog");
    dialog.addEventListener("submit", (e) => {
        e.preventDefault();
        const dialogForm = document.querySelector("form");
        const formData = new FormData(dialogForm);
        const dialogMode = dialogForm.dataset.mode;
        const dialogType = dialogForm.id;
        const dialogDataId = dialogForm.dataset.id;

        if (dialogType === "project-dialog-form") {
            switch (dialogMode) {
                case "create":
                    projects.push(new Project(formData.get("title")));
                    break;

                case "edit":
                    projects.find(
                        (project) => project.id === dialogDataId,
                    ).title = formData.get("title");
                    break;

                case "delete":
                    const indexOfProject = projects.findIndex(
                        (project) => project.id === dialogDataId,
                    );
                    projects.splice(indexOfProject, 1);
                    break;
            }

            displayController.displayAllProjectsLayout(projects);
        } else if (dialogType === "todo-dialog-form") {
            const mainProjectId = document.querySelector("main").dataset.id;
            const correspondingProject = projects.find(
                (project) => project.id === mainProjectId,
            );
            const dataObj = Object.fromEntries(formData);
            dataObj.id = dialogDataId;
            dataObj.dueDate = new Date(dataObj.duedate);

            switch (dialogMode) {
                case "create":
                    dataObj.checklist = false;
                    correspondingProject.createTodoItem(dataObj);
                    break;
                case "edit":
                    correspondingProject.editTodoItem(dataObj);
                    break;
                case "delete":
                    correspondingProject.deleteTodoItem(dataObj.id);
                    break;
            }

            displayController.displayCurrentProjectLayout(
                projects,
                correspondingProject,
            );
        }

        Storage.saveProjectData(projects);
        dialog.close();
    });

    document.body.addEventListener("change", (e) => {
        if (e.target.matches(`input[type="checkbox"]`)) {
            const mainProjectId = document.querySelector("main").dataset.id;
            const correspondingProject = projects.find(
                (project) => project.id === mainProjectId,
            );

            const todoId = e.target.closest(".todo").dataset.id;
            const correspondingTodo = correspondingProject.items.find(
                (todo) => todo.id === todoId,
            );
            correspondingTodo.toggleChecklist();
        }

        Storage.saveProjectData(projects);
    });
})();
