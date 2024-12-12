import "./styles.css";
import { openTaskDialogBtn, cancelAddTask, addTask } from "./modules/toDo";
import { handleMoveTask, renderTaskInProgress, inProgressArray, initializeInProgress } from "./modules/inProgress";
import { renderTaskToDo, todoArray, initializeTasks } from './modules/toDo';
import { handleDoneTask, renderTaskDone, doneArray, initializeDone } from "./modules/done";
import Storage from "./modules/storage";

const { saveTasksLocal } = Storage();

const confirmDialog = document.querySelector('.confirm');

const openConfirmDialog = () => {
    confirmDialog.showModal();
};

const closeConfirmDialog = () => {
    confirmDialog.close();
};

const cancelConfirmDialog = () => {
    const cancelConfirm = document.querySelector('.confirm-cancel-btn');

    cancelConfirm.addEventListener("click", () => {
        closeConfirmDialog();
    })
}

export const taskEventListeners = () => { 
    const moveTaskBtns = document.querySelectorAll('.move-task-btn'); 
    const deleteTaskBtns = document.querySelectorAll('.delete-task-btn'); 
    const completeTaskBtns = document.querySelectorAll('.done-task-btn');
    const confirmBtn = document.querySelector('.delete-btn');
    
    deleteTaskBtns.forEach(deleteTaskBtn => { 
        deleteTaskBtn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id;
            openConfirmDialog();
            confirmBtn.setAttribute('data-id', taskId);
        }); 
    });

    confirmBtn.addEventListener("click", (e) => {
        const taskId = e.currentTarget.dataset.id;
        e.preventDefault();
        closeConfirmDialog();
        handleDeleteTask(taskId, todoArray);
        handleDeleteTask(taskId, inProgressArray);
        handleDeleteTask(taskId, doneArray);
    })

    moveTaskBtns.forEach(moveTaskBtn => {
        moveTaskBtn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id;
            handleMoveTask(taskId, todoArray);
        });
    });

    completeTaskBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id;
            handleDoneTask(taskId, inProgressArray);
        })
    })
}

export const handleDeleteTask = (taskId, array) => {
    taskId = Number(taskId);

    const taskIndex = array.findIndex(t => t.taskId === taskId);
    if(taskIndex !== -1){
        array.splice(taskIndex, 1);
        saveTasksLocal(todoArray, inProgressArray, doneArray);
        renderTaskToDo();
        renderTaskInProgress();
        renderTaskDone();
        taskCounter(todoArray, 'task-counter');
        taskCounter(inProgressArray, 'inprogress-counter');
        taskCounter(doneArray, 'done-counter');
    };
};


export const taskCounter = (array, counterClass) => {
    const taskNumber = array.length;
    const taskDisplay = document.querySelector(`.${counterClass}`);

    taskDisplay.textContent = taskNumber;
};


//Innit
initializeTasks();
initializeInProgress();
initializeDone();
openTaskDialogBtn();
cancelAddTask();
addTask();
cancelConfirmDialog();