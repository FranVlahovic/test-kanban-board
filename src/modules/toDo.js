import deleteIcon from "../assets/icons/delete.svg";
import moveIcon from "../assets/icons/arrow-down-circle.svg";
import profileIcon from "../assets/icons/account-circle.svg";
import editIcon from "../assets/icons/pencil.svg"

import { taskEventListeners, taskCounter } from "../index";

import Storage from "./storage";
import { inProgressArray } from "./inProgress";
import { doneArray } from "./done";
const { saveTasksLocal, loadTasksLocal } = Storage();

//toDo.js
let todoArray = [];

const taskInput = document.querySelector('.task-name-input');
const taskCategory = document.querySelector('.task-category-input');

const createTask = (name, category) => {
    const id = Date.now();

    return {
        taskId: id,
        taskName: name,
        taskCategory: category,
        isCompleted: false,
    };
};

export const openTaskDialogBtn = () => {
    const addTaskBtn = document.querySelector('.add-task');

    addTaskBtn.addEventListener("click", () => {
        openTaskDialog();
    })
};

const addTaskDialog = document.querySelector('.task-dialog');

const setupTaskDialog = (task = null) => {
     //Edit task
    if (task){
    taskInput.value = task.taskName;
    taskCategory.value = task.taskCategory;
    addTaskDialog.dataset.mode = 'edit';
    addTaskDialog.dataset.taskId = task.taskId;
    }
    else {
        resetTaskForm(taskInput, taskCategory);
        addTaskDialog.dataset.mode = 'add';
    }
}

export const openTaskDialog = (task = null) => {
    setupTaskDialog(task);
    addTaskDialog.showModal();
    document.body.classList.add('no-scroll');
};

const closeTaskDialog = () => {
    addTaskDialog.close();
    document.body.classList.remove('no-scroll');
};

const resetTaskForm = (input, category) => {
    input.value = '';
    category.value = '';
}

export const addTask = () => {
    const taskForm = document.querySelector('.task-form');

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskInputValue = taskInput.value.trim();
        const taskCategoryValue = taskCategory.value.trim();
        const mode = addTaskDialog.dataset.mode;
        const taskId = addTaskDialog.dataset.taskId;
        
        if(taskInputValue && taskCategoryValue){
            //Edit task
            if(mode === 'edit'){
                updateTask(taskId, taskInputValue, taskCategoryValue);
            }
            else {
                addTaskInArray(createTask(taskInputValue, taskCategoryValue));
            }
            resetTaskForm(taskInput, taskCategory);
            closeTaskDialog();
            saveTasksLocal(todoArray, inProgressArray, doneArray);
            renderTaskToDo();
            taskCounter(todoArray, 'task-counter');
        };
    });
};

export const cancelAddTask = () => {
    const cancelBtn = document.querySelector('.cancel-btn');

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resetTaskForm(taskInput, taskCategory);
        closeTaskDialog();
    });
};

const addTaskInArray = (task) => {
    todoArray.push(task);
    saveTasksLocal(todoArray, inProgressArray, doneArray);
};

export const renderTaskToDo = () => {
    const todoContainer = document.getElementById('todo-container');
    todoContainer.innerHTML = '';

    todoArray.forEach(({ taskId, taskName, taskCategory }) => {
        todoContainer.innerHTML += `
        <div class="task-card" data-id="${taskId}">
            <h2 class="card-name">${taskName}</h2>
            <div class="card-buttons">
                <button class="move-task-btn" data-id="${taskId}"><img src="${moveIcon}" alt="Down Arrow Icon"></button>
                <button class="edit-task-btn" data-id="${taskId}"><img src="${editIcon}" alt="Edit Icon"></button>
                <button class="delete-task-btn" data-id="${taskId}"><img src="${deleteIcon}" alt="Delete Icon"></button>
            </div>
            <div class="card-category">${taskCategory}</div>
            <img src="${profileIcon}" class="card-profile-image"></img>
        </div>`;
    });
    taskEventListeners();
};

//Edit task
const updateTask = (taskId, name, category) => {
    taskId = Number(taskId);
    const taskIndex = todoArray.findIndex(t => t.taskId === taskId);
    if(taskIndex !== -1){
        todoArray[taskIndex].taskName = name;
        todoArray[taskIndex].taskCategory = category;
        saveTasksLocal(todoArray, inProgressArray, doneArray);
        renderTaskToDo();
        taskCounter(todoArray, 'task-counter');
    }
};

export const initializeTasks = () => { 
    const { todoTasks } = loadTasksLocal();
    todoArray = todoTasks;
    renderTaskToDo();
    taskCounter(todoArray, 'task-counter');
};

export { todoArray };