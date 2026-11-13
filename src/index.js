import Project from "./todo.js";
import Storage from "./storage.js";
import Display from "./display.js";
import "./styles.css";

// const projects = [];
// for (let i = 0; i < 3; i++) {
//     const project = new Project(`Project ${i + 1}`);
//     projects.push(project);

//     project.addTodoItem({
//         title: `Title ${i + 1}A`,
//         description: "bleh",
//         dueDate: new Date(2027, 10, 9, 23, 59),
//         priority: 1,
//         checklist: true,
//     });

//     project.addTodoItem({
//         title: `Title ${i + 1}B`,
//         description: "bleh",
//         dueDate: new Date(2028, 11, 23, 1, 1),
//         priority: 2,
//         checklist: true,
//     });
// }
// Storage.saveProjectData(projects);

const data = Storage.loadProjectData();
const savedProjects = Storage.parseAsProjects(data);

const displayController = new Display();
// displayController.displayCurrentProjectLayout(savedProjects, savedProjects[0]);

displayController.displayAllProjectsLayout(savedProjects);
