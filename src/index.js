import "./styles.css";
import { openTaskDialogBtn, cancelAddTask, addTask } from "./modules/toDo";
import { handleMoveTask, renderTaskInProgress, inProgressArray, initializeInProgress } from "./modules/inProgress";
import { renderTaskToDo, todoArray, initializeTasks } from './modules/toDo';

import Storage from "./modules/storage";
const { saveTasksLocal } = Storage();

export const taskEventListeners = () => { 
    const moveTaskBtns = document.querySelectorAll('.move-task-btn'); 
    const deleteTaskBtns = document.querySelectorAll('.delete-task-btn'); 
    const completeTaskBtns = document.querySelectorAll('.complete-task-btn'); 
    
    deleteTaskBtns.forEach(deleteTaskBtn => { 
        deleteTaskBtn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id; 
            handleDeleteTask(taskId, todoArray);
            handleDeleteTask(taskId, inProgressArray);
        }); 
    });

    moveTaskBtns.forEach(moveTaskBtn => {
        moveTaskBtn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id;
            handleMoveTask(taskId, todoArray);
        });
    });

    completeTaskBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id;
            handleCompleteTask(taskId, inProgressArray);
        })
    })
}

export const handleDeleteTask = (taskId, array) => {
    taskId = Number(taskId);

    const taskIndex = array.findIndex(t => t.taskId === taskId);
    if(taskIndex !== -1){
        array.splice(taskIndex, 1);
        saveTasksLocal(todoArray, inProgressArray);
        renderTaskToDo();
        renderTaskInProgress();
        taskCounter(todoArray, 'task-counter');
        taskCounter(inProgressArray, 'inprogress-counter');
    }
};


export const taskCounter = (array, counterClass) => {
    const taskNumber = array.length;
    const taskDisplay = document.querySelector(`.${counterClass}`);

    taskDisplay.textContent = taskNumber;
};


//Innit
initializeTasks();
initializeInProgress();
openTaskDialogBtn();
cancelAddTask();
addTask();