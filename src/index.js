import "./styles.css";

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
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = '';

    todoArray.forEach(({ taskId, taskName, taskCategory }) => {
        taskContainer.innerHTML += `
        <div class="task-card" data-id="${taskId}">
            <h2 class="card-name">${taskName}</h2>
            <div class="card-buttons">
                <button class="move-task-btn" data-id="${taskId}"><img src="assets/icons/arrow-down-circle.svg" alt="Down Arrow Icon"></button>
                <button class="delete-task-btn" data-id="${taskId}"><img src="assets/icons/delete.svg" alt="Delete Icon"></button>
            </div>
            <div class="card-category">${taskCategory}</div>
            <img src="assets/icons/account-circle.svg" class="card-profile-image"></img>
        </div>`;
    });
};

//Innit
openTaskDialogBtn();
cancelAddTask();
addTask();
