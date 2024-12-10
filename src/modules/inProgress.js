import deleteIcon from "../assets/icons/delete.svg";
import profileIcon from "../assets/icons/account-circle.svg";
import doneIcon from "../assets/icons/check-circle.svg";
import { renderTaskToDo, todoArray } from '../modules/toDo';
import { taskEventListeners, taskCounter } from "../index";

import Storage from "./storage";
const { saveTasksLocal, loadTasksLocal } = Storage();

let inProgressArray = [];

export const addTaskInProgressArray = (task) => {
    inProgressArray.push(task);
    saveTasksLocal(todoArray, inProgressArray);
};

export const handleMoveTask = (taskId, array) => {
    taskId = Number(taskId);

    const taskIndex = array.findIndex(t => t.taskId === taskId);
    if(taskIndex !== -1){
        const [movedTask] = array.splice(taskIndex, 1);
        addTaskInProgressArray(movedTask);
        saveTasksLocal(todoArray, inProgressArray);
        renderTaskToDo();
        renderTaskInProgress();
        taskCounter(todoArray, 'task-counter');
        taskCounter(inProgressArray, 'inprogress-counter');
    }
};

export const renderTaskInProgress = () => {
    const inProgressContainer = document.getElementById('inprogress-container');
    inProgressContainer.innerHTML = '';

    inProgressArray.forEach(({ taskId, taskName, taskCategory }) => {
        inProgressContainer.innerHTML += `
        <div class="task-card" data-id="${taskId}">
            <h2 class="card-name">${taskName}</h2>
            <div class="card-buttons">
                <button class="done-task-btn" data-id="${taskId}"><img src="${doneIcon}" alt="Done Icon"></button>
                <button class="delete-task-btn" data-id="${taskId}"><img src="${deleteIcon}" alt="Delete Icon"></button>
            </div>
            <div class="card-category">${taskCategory}</div>
            <img src="${profileIcon}" class="card-profile-image"></img>
        </div>`;
    });
    taskEventListeners();
};

export const initializeInProgress = () => { 
    const { inProgressTasks } = loadTasksLocal();
    inProgressArray = inProgressTasks;
    renderTaskInProgress();
    taskCounter(inProgressArray, 'inprogress-counter');
};

export { inProgressArray };
