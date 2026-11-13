export default class {
    static saveProjectData(data) {
        localStorage.setItem("projects", JSON.stringify(data));
    }

    static loadProjectData() {
        return JSON.parse(localStorage.getItem("projects"));
    }
}
