import deleteIcon from "../assets/icons/delete.svg";
import profileIcon from "../assets/icons/account-circle.svg";
import { renderTaskToDo, todoArray } from '../modules/toDo';
import { taskEventListeners, taskCounter } from "../index";

import Storage from "./storage";
import { renderTaskInProgress, inProgressArray } from "./inProgress";
const { saveTasksLocal, loadTasksLocal } = Storage();

let doneArray = [];

export const addTaskDoneArray = (task) => {
    doneArray.push(task);
    saveTasksLocal(todoArray, inProgressArray, doneArray);
};

export const handleDoneTask = (taskId, array) => {
    taskId = Number(taskId);

    const taskIndex = array.findIndex(t => t.taskId === taskId);
    if(taskIndex !== -1){
        const [mTask] = array.splice(taskIndex, 1);
        addTaskDoneArray(mTask);
        saveTasksLocal(todoArray, inProgressArray, doneArray);
        renderTaskToDo();
        renderTaskInProgress();
        renderTaskDone();
        taskCounter(todoArray, 'task-counter');
        taskCounter(inProgressArray, 'inprogress-counter');
        taskCounter(doneArray, 'done-counter');
    }
};

export const renderTaskDone = () => {
    const doneContainer = document.getElementById('done-container');
    doneContainer.innerHTML = '';

    doneArray.forEach(({ taskId, taskName, taskCategory }) => {
        doneContainer.innerHTML += `
        <div class="task-card" data-id="${taskId}">
            <h2 class="card-name">${taskName}</h2>
            <div class="card-buttons">
                <button class="delete-task-btn" data-id="${taskId}"><img src="${deleteIcon}" alt="Delete Icon"></button>
            </div>
            <div class="card-category">${taskCategory}</div>
            <img src="${profileIcon}" class="card-profile-image"></img>
        </div>`;
    });
    taskEventListeners();
};

export const initializeDone = () => { 
    const { doneT } = loadTasksLocal();
    doneArray = doneT;
    renderTaskDone();
    taskCounter(doneArray, 'done-counter');
};

export { doneArray };
