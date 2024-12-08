import "./styles.css";
import deleteIcon from "./assets/icons/delete.svg";
import moveIcon from "./assets/icons/arrow-down-circle.svg";
import profileIcon from "./assets/icons/account-circle.svg";


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

const openTaskDialogBtn = () => {
    const addTaskBtn = document.querySelector('.add-task');

    addTaskBtn.addEventListener("click", () => {
        openTaskDialog();
    })
};

const addTaskDialog = document.querySelector('.task-dialog');

const openTaskDialog = () => {
    addTaskDialog.showModal();
};

const closeTaskDialog = () => {
    addTaskDialog.close();
};

const resetTaskForm = (input, category) => {
    input.value = '';
    category.value = '';
}

const addTask = () => {
    const taskForm = document.querySelector('.task-form');

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskInputValue = taskInput.value.trim();
        const taskCategoryValue = taskCategory.value.trim();
        
        if(taskInputValue && taskCategoryValue){
            addTaskInArray(createTask(taskInputValue, taskCategoryValue));
            resetTaskForm(taskInput, taskCategory);
            closeTaskDialog();
            // saveTasksLocal(todoArray);
            renderTaskToDo();
            taskCounter(todoArray);
        };
    });
};

const cancelAddTask = () => {
    const cancelBtn = document.querySelector('.cancel-btn');

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resetTaskForm(taskInput, taskCategory);
        closeTaskDialog();
    });
};

let inProgressArray = [];
let doneArray = [];

//toDo.js
let todoArray = [];

const addTaskInArray = (task) => {
    todoArray.push(task);
    // saveTasksLocal(todoArray);
};

const renderTaskToDo = () => {
    const todoContainer = document.getElementById('todo-container');
    todoContainer.innerHTML = '';

    todoArray.forEach(({ taskId, taskName, taskCategory }) => {
        todoContainer.innerHTML += `
        <div class="task-card" data-id="${taskId}">
            <h2 class="card-name">${taskName}</h2>
            <div class="card-buttons">
                <button class="move-task-btn" data-id="${taskId}"><img src="${moveIcon}" alt="Down Arrow Icon"></button>
                <button class="delete-task-btn" data-id="${taskId}"><img src="${deleteIcon}" alt="Delete Icon"></button>
            </div>
            <div class="card-category">${taskCategory}</div>
            <img src="${profileIcon}" class="card-profile-image"></img>
        </div>`;
    });
    taskEventListeners();
};

const taskEventListeners = () => { 
    const moveTaskBtns = document.querySelectorAll('.move-task-btn'); 
    const deleteTaskBtns = document.querySelectorAll('.delete-task-btn'); 
    const completeTaskBtns = document.querySelectorAll('.complete-task-btn'); 
    
    deleteTaskBtns.forEach(deleteTaskBtn => { 
        deleteTaskBtn.addEventListener("click", (e) => {
            const taskId = e.currentTarget.dataset.id; 
            handleDeleteTask(taskId, todoArray); 
        }); 
    }); 
}

const handleDeleteTask = (taskId, array) => {
    taskId = Number(taskId);

    const taskIndex = array.findIndex(t => t.taskId === taskId);
    if(taskIndex !== -1){
        array.splice(taskIndex, 1);
        renderTaskToDo();
        taskCounter(todoArray);
    }
};


const taskCounter = (array) => {
    const taskNumber = array.length;
    const taskDisplay = document.querySelector('.task-counter');

    taskDisplay.textContent = taskNumber;
};

const testTask = () => {
    const testTask = createTask("Test Task", "Test Category");
    addTaskInArray(testTask);
    renderTaskToDo();
    taskCounter(todoArray);
};

//Innit
openTaskDialogBtn();
cancelAddTask();
addTask();
testTask();
