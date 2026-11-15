import { format } from "date-fns";

export default class {
    // Source - https://stackoverflow.com/a/71964580
    // Posted by Manngo, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-11-11, License - CC BY-SA 4.0

    /*  createElementFromSelector(selector)
    ================================================
    Usage: element#id.class@attribute=value
    ================================================ */

    createElementFromSelector(selector) {
        const pattern = /^(.*?)(?:#(.*?))?(?:\.(.*?))?(?:@(.*?)(?:=(.*?))?)?$/;
        const matches = selector.match(pattern);
        const element = document.createElement(matches[1] || "div");
        if (matches[2]) element.id = matches[2];
        if (matches[3]) element.className = matches[3];
        if (matches[4]) element.setAttribute(matches[4], matches[5] || "");
        return element;
    }

    buildSidebar(projects) {
        const sidebarAside = this.createElementFromSelector("aside");
        const sidebarH1 = this.createElementFromSelector("h1");
        sidebarH1.textContent = "Todo";
        const sidebarNav = this.createElementFromSelector("nav");
        const sidebarUl = this.createElementFromSelector("ul");
        const sidebarLi = this.createElementFromSelector("li");
        const sidebarH2 = this.createElementFromSelector("h2");
        sidebarH2.textContent = "All Projects";
        sidebarH2.addEventListener("click", () => {
            this.displayAllProjectsLayout(projects);
        });

        const sidebarProjectUl =
            this.createElementFromSelector("ul.project-list");

        const sidebarProjectLis = [];
        projects.forEach((project) => {
            const sidebarProjectLi = this.createElementFromSelector(
                "li.project-list-item",
            );
            sidebarProjectLi.addEventListener("click", () => {
                this.displayCurrentProjectLayout(projects, project);
            });

            sidebarProjectLis.push(sidebarProjectLi);

            const sidebarProjectIconDiv =
                this.createElementFromSelector("div.project-icon");
            const sidebarProjectP = this.createElementFromSelector("p");
            sidebarProjectP.textContent = project.title;

            sidebarProjectLi.appendChild(sidebarProjectIconDiv);
            sidebarProjectLi.appendChild(sidebarProjectP);
        });

        sidebarAside.appendChild(sidebarH1);
        sidebarAside.appendChild(sidebarNav);
        sidebarNav.appendChild(sidebarUl);
        sidebarUl.appendChild(sidebarLi);
        sidebarLi.appendChild(sidebarH2);
        sidebarLi.appendChild(sidebarProjectUl);

        sidebarProjectLis.forEach((sidebarProjectLi) => {
            sidebarProjectUl.appendChild(sidebarProjectLi);
        });

        return sidebarAside;
    }

    buildAllProjectsMain(projects) {
        const main = this.createElementFromSelector("main.all-projects");
        const mainH1 = this.createElementFromSelector("h1");
        mainH1.textContent = "Projects";
        const mainNewProjectButton =
            this.createElementFromSelector("button.new-project");
        mainNewProjectButton.addEventListener("click", (e) => {
            this.displayProjectDialog({}, mainNewProjectButton.className);
        });

        const mainProjectsDiv = this.createElementFromSelector("div.projects");

        const mainProjectCardDivs = [];
        projects.forEach((project) => {
            const mainProjectCardDiv =
                this.createElementFromSelector("div.project-card");
            mainProjectCardDiv.addEventListener("click", (e) => {
                if (e.target.matches(".project-card"))
                    this.displayCurrentProjectLayout(projects, project);
            });
            mainProjectCardDivs.push(mainProjectCardDiv);

            const mainProjectCardH2 = this.createElementFromSelector("h2");
            mainProjectCardH2.textContent = project.title;

            const mainProjectCardActionsDiv = this.createElementFromSelector(
                "div.project-actions",
            );
            const mainProjectCardEditButton =
                this.createElementFromSelector("button.edit");
            mainProjectCardEditButton.addEventListener("click", (e) => {
                this.displayProjectDialog(
                    project,
                    mainProjectCardEditButton.className,
                );
            });
            const mainProjectCardDeleteButton =
                this.createElementFromSelector("button.delete");
            mainProjectCardDeleteButton.addEventListener("click", (e) => {
                this.displayProjectDialog(
                    project,
                    mainProjectCardDeleteButton.className,
                );
            });

            mainProjectCardDiv.appendChild(mainProjectCardH2);
            mainProjectCardDiv.appendChild(mainProjectCardActionsDiv);

            mainProjectCardActionsDiv.appendChild(mainProjectCardEditButton);
            mainProjectCardActionsDiv.appendChild(mainProjectCardDeleteButton);

            mainProjectCardDivs.forEach((mainProjectCardDiv) => {
                mainProjectsDiv.appendChild(mainProjectCardDiv);
            });
        });

        main.appendChild(mainH1);
        main.appendChild(mainNewProjectButton);
        main.appendChild(mainProjectsDiv);

        return main;
    }

    buildCurrentProjectMain(project) {
        const main = this.createElementFromSelector("main.current-project");
        main.dataset.id = project.id;
        const mainH1 = this.createElementFromSelector("h1");
        mainH1.textContent = project.title;

        const mainListDiv = this.createElementFromSelector("div.list");
        const mainTodoDivs = [];
        project.items.forEach((todo) => {
            const mainTodoDiv = this.createElementFromSelector("div.todo");
            mainTodoDiv.dataset.id = todo.id;
            mainTodoDiv.dataset.priority = todo.priority;
            mainTodoDivs.push(mainTodoDiv);

            const mainTodoCheckbox = this.createElementFromSelector(
                "input@type=checkbox",
            );
            mainTodoCheckbox.checked = todo.checklist;

            const mainTodoH2 = this.createElementFromSelector("h2");
            mainTodoH2.textContent = todo.title;

            const mainTodoP = this.createElementFromSelector("p");
            mainTodoP.textContent = `Due ${format(todo.dueDate, "MMM d, yyyy HH:mm")}`;

            const mainTodoActionsDiv =
                this.createElementFromSelector("div.todo-actions");
            const mainTodoViewButton =
                this.createElementFromSelector("button.view");
            mainTodoViewButton.addEventListener("click", (e) => {
                this.displayTodoDialog(todo, mainTodoViewButton.className);
            });

            const mainTodoEditButton =
                this.createElementFromSelector("button.edit");
            mainTodoEditButton.addEventListener("click", (e) => {
                this.displayTodoDialog(todo, mainTodoEditButton.className);
            });

            const mainTodoDeleteButton =
                this.createElementFromSelector("button.delete");
            mainTodoDeleteButton.addEventListener("click", (e) => {
                this.displayTodoDialog(todo, mainTodoDeleteButton.className);
            });

            mainTodoDiv.appendChild(mainTodoCheckbox);
            mainTodoDiv.appendChild(mainTodoH2);
            mainTodoDiv.appendChild(mainTodoP);
            mainTodoDiv.appendChild(mainTodoActionsDiv);

            mainTodoActionsDiv.appendChild(mainTodoViewButton);
            mainTodoActionsDiv.appendChild(mainTodoEditButton);
            mainTodoActionsDiv.appendChild(mainTodoDeleteButton);
        });

        const mainNewTodoDiv = this.createElementFromSelector("div.new-todo");
        mainTodoDivs.push(mainNewTodoDiv);
        const mainNewTodoCreateButton =
            this.createElementFromSelector("button.create");
        mainNewTodoCreateButton.addEventListener("click", (e) => {
            this.displayTodoDialog({}, mainNewTodoCreateButton.className);
        });

        mainNewTodoDiv.appendChild(mainNewTodoCreateButton);

        mainTodoDivs.forEach((mainTodoDiv) => {
            mainListDiv.appendChild(mainTodoDiv);
        });

        main.appendChild(mainH1);
        main.appendChild(mainListDiv);

        return main;
    }

    buildProjectDialog(project, mode) {
        const dialogForm = this.createElementFromSelector(
            "form#project-dialog-form",
        );
        dialogForm.action = "#";
        if (Object.keys(project).length > 0) {
            dialogForm.dataset.id = project.id;
        }
        dialogForm.dataset.mode = mode === "new-project" ? "create" : mode;

        const dialogFormH2 = this.createElementFromSelector("h2");
        dialogFormH2.textContent = `${
            mode === "new-project"
                ? "Create"
                : mode.charAt(0).toUpperCase() + mode.slice(1)
        } Project`;

        const dialogFormControlTitleDiv =
            this.createElementFromSelector("div.form-control");
        const dialogFormControlTitleLabel =
            this.createElementFromSelector("label@for=title");
        dialogFormControlTitleLabel.textContent = "Title";
        const dialogFormControlTitleInput = this.createElementFromSelector(
            "input#title@type=text",
        );
        dialogFormControlTitleInput.name = "title";
        dialogFormControlTitleInput.required = true;

        const inputStateMapping = {
            "new-project": { disabled: false, value: "" },
            edit: { disabled: false, value: project.title },
            delete: { disabled: true, value: project.title },
        };
        dialogFormControlTitleInput.disabled = inputStateMapping[mode].disabled;
        dialogFormControlTitleInput.value = inputStateMapping[mode].value;

        const dialogFormActionsDiv =
            this.createElementFromSelector("div.form-actions");
        const dialogFormCancelButton =
            this.createElementFromSelector("button.btn-cancel");
        dialogFormCancelButton.addEventListener("click", (e) => {
            e.target.closest("dialog").close();
        });
        dialogFormCancelButton.formNoValidate = true;
        dialogFormCancelButton.type = "button";

        const modeMapping = {
            "new-project": "create",
            edit: "save",
            delete: "delete",
        };
        const dialogFormActionButton = this.createElementFromSelector(
            `button.btn-${modeMapping[mode]}`,
        );

        dialogForm.appendChild(dialogFormH2);
        dialogForm.appendChild(dialogFormControlTitleDiv);
        dialogFormControlTitleDiv.appendChild(dialogFormControlTitleLabel);
        dialogFormControlTitleDiv.appendChild(dialogFormControlTitleInput);
        dialogForm.appendChild(dialogFormActionsDiv);
        dialogFormActionsDiv.appendChild(dialogFormCancelButton);
        dialogFormActionsDiv.appendChild(dialogFormActionButton);

        return dialogForm;
    }

    buildTodoDialog(todo, mode) {
        const dialogForm = this.createElementFromSelector(
            "form#todo-dialog-form",
        );
        dialogForm.action = "#";
        if (Object.keys(todo).length > 0) {
            dialogForm.dataset.id = todo.id;
        }
        dialogForm.dataset.mode = mode;

        const dialogFormH2 = this.createElementFromSelector("h2");
        dialogFormH2.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Todo`;

        const dialogFormControlTitleDiv =
            this.createElementFromSelector("div.form-control");
        const dialogFormControlTitleLabel =
            this.createElementFromSelector("label@for=title");
        dialogFormControlTitleLabel.textContent = "Title";
        const dialogFormControlTitleInput = this.createElementFromSelector(
            "input#title@type=text",
        );
        dialogFormControlTitleInput.name = "title";
        dialogFormControlTitleInput.required = true;

        const dialogFormControlDescriptionDiv =
            this.createElementFromSelector("div.form-control");
        const dialogFormControlDescriptionLabel =
            this.createElementFromSelector("label@for=description");
        dialogFormControlDescriptionLabel.textContent = "Description";
        const dialogFormControlDescriptionTextarea =
            this.createElementFromSelector("textarea#description");
        dialogFormControlDescriptionTextarea.name = "description";
        dialogFormControlDescriptionTextarea.required = false;

        const dialogFormControlDueDateDiv =
            this.createElementFromSelector("div.form-control");
        const dialogFormControlDueDateLabel =
            this.createElementFromSelector("label@for=duedate");
        dialogFormControlDueDateLabel.textContent = "Due Date";

        // valueAsDate is not supported for input datetime-local so we use text for view and delete
        // input on create and edit will still have to be empty
        let dialogFormControlDueDateInput;
        if (mode === "create" || mode === "edit") {
            dialogFormControlDueDateInput = this.createElementFromSelector(
                "input#duedate@type=datetime-local",
            );
        } else {
            dialogFormControlDueDateInput = this.createElementFromSelector(
                "input#duedate@type=text",
            );
        }

        dialogFormControlDueDateInput.name = "duedate";
        dialogFormControlDueDateInput.required = true;

        const dialogFormControlPriorityDiv =
            this.createElementFromSelector("div.form-control");
        const dialogFormControlPriorityLabel =
            this.createElementFromSelector("label@for=priority");
        dialogFormControlPriorityLabel.textContent = "Priority";
        const dialogFormControlPrioritySelect =
            this.createElementFromSelector("select#priority");
        dialogFormControlPrioritySelect.name = "priority";
        dialogFormControlPrioritySelect.required = true;

        const dialogFormControlPriorityOptions = [];
        const priorityValues = ["low", "medium", "high"];

        priorityValues.forEach((value, index) => {
            const dialogFormControlPriorityOption =
                this.createElementFromSelector("option");
            dialogFormControlPriorityOptions.push(
                dialogFormControlPriorityOption,
            );
            dialogFormControlPriorityOption.value = index;
            dialogFormControlPriorityOption.textContent = value;
        });

        dialogFormControlPriorityOptions.forEach(
            (dialogFormControlPriorityOption) => {
                dialogFormControlPrioritySelect.appendChild(
                    dialogFormControlPriorityOption,
                );
            },
        );

        const inputValuesMapping = {
            values: {
                title: todo.title ?? "",
                description: todo.description ?? "",
                dueDate: todo.dueDate
                    ? format(todo.dueDate, "MMM d, yyyy HH:mm")
                    : null,
                priority: todo.priority,
            },
        };

        const inputStateMapping = {
            create: {
                disabled: false,
                values: inputValuesMapping.values,
            },
            view: { disabled: true, values: inputValuesMapping.values },
            edit: { disabled: false, values: inputValuesMapping.values },
            delete: { disabled: true, values: inputValuesMapping.values },
        };

        dialogFormControlTitleInput.disabled = inputStateMapping[mode].disabled;
        dialogFormControlTitleInput.value =
            inputStateMapping[mode].values.title;

        dialogFormControlDescriptionTextarea.disabled =
            inputStateMapping[mode].disabled;
        dialogFormControlDescriptionTextarea.value =
            inputStateMapping[mode].values.description;

        dialogFormControlDueDateInput.disabled =
            inputStateMapping[mode].disabled;

        if (mode === "create" || mode === "edit") {
            // pass
        } else {
            dialogFormControlDueDateInput.value =
                inputStateMapping[mode].values.dueDate;
        }

        dialogFormControlPrioritySelect.disabled =
            inputStateMapping[mode].disabled;
        dialogFormControlPrioritySelect.value =
            inputStateMapping[mode].values.priority;

        const dialogFormActionsDiv =
            this.createElementFromSelector("div.form-actions");
        const dialogFormCancelButton =
            this.createElementFromSelector("button.btn-cancel");
        dialogFormCancelButton.addEventListener("click", (e) => {
            e.target.closest("dialog").close();
        });
        dialogFormCancelButton.formNoValidate = true;
        dialogFormCancelButton.type = "button";

        const dialogFormCloseButton =
            this.createElementFromSelector("button.btn-close");
        dialogFormCloseButton.formMethod = "dialog";
        dialogFormCloseButton.formNoValidate = true;

        const modeMapping = {
            create: "create",
            view: "view",
            edit: "save",
            delete: "delete",
        };
        const dialogFormActionButton = this.createElementFromSelector(
            `button.btn-${modeMapping[mode]}`,
        );

        dialogForm.appendChild(dialogFormH2);

        dialogForm.appendChild(dialogFormControlTitleDiv);
        dialogFormControlTitleDiv.appendChild(dialogFormControlTitleLabel);
        dialogFormControlTitleDiv.appendChild(dialogFormControlTitleInput);

        dialogForm.appendChild(dialogFormControlDescriptionDiv);
        dialogFormControlDescriptionDiv.appendChild(
            dialogFormControlDescriptionLabel,
        );
        dialogFormControlDescriptionDiv.appendChild(
            dialogFormControlDescriptionTextarea,
        );

        dialogForm.appendChild(dialogFormControlDueDateDiv);
        dialogFormControlDueDateDiv.appendChild(dialogFormControlDueDateLabel);
        dialogFormControlDueDateDiv.appendChild(dialogFormControlDueDateInput);

        dialogForm.appendChild(dialogFormControlPriorityDiv);
        dialogFormControlPriorityDiv.appendChild(
            dialogFormControlPriorityLabel,
        );
        dialogFormControlPriorityDiv.appendChild(
            dialogFormControlPrioritySelect,
        );

        dialogForm.appendChild(dialogFormActionsDiv);

        if (mode === "view") {
            dialogFormActionsDiv.appendChild(dialogFormCloseButton);
        } else {
            dialogFormActionsDiv.appendChild(dialogFormCancelButton);
            dialogFormActionsDiv.appendChild(dialogFormActionButton);
        }

        return dialogForm;
    }

    displayAllProjectsLayout(projects) {
        const sidebar = this.buildSidebar(projects);
        const main = this.buildAllProjectsMain(projects);

        document.querySelector(".layout").textContent = "";
        document.querySelector(".layout").appendChild(sidebar);
        document.querySelector(".layout").appendChild(main);
    }

    displayCurrentProjectLayout(projects, project) {
        const sidebar = this.buildSidebar(projects);
        const main = this.buildCurrentProjectMain(project);

        document.querySelector(".layout").textContent = "";
        document.querySelector(".layout").appendChild(sidebar);
        document.querySelector(".layout").appendChild(main);
    }

    displayProjectDialog(project, mode) {
        const dialog = document.querySelector("#dialog");
        dialog.textContent = "";
        const dialogContent = this.buildProjectDialog(project, mode);
        dialog.appendChild(dialogContent);
        dialog.showModal();
    }

    displayTodoDialog(todo, mode) {
        const dialog = document.querySelector("#dialog");
        dialog.textContent = "";
        const dialogContent = this.buildTodoDialog(todo, mode);
        dialog.appendChild(dialogContent);
        dialog.showModal();
    }
}
