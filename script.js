/* DRAG AND DROP */

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".lane");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone,e.clientY);
        const curTask = document.querySelector(".is-dragging");

        if(!bottomTask){
            zone.appendChild(curTask);
        }
        else{
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const elements = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    elements.forEach((task) => {
        const { top } = task.getBoundingClientRect();
        const offset = mouseY - top;
        if(offset < 0 && offset > closestOffset){
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
};

/* TODO ADD */

const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    if(!value) {
        input.classList.add("error");
        setTimeout(() => {
            input.classList.remove("error");
        }, 1000);
        return;
    }

    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    todoLane.appendChild(newTask);

    input.value = "";

}); 