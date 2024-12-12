const Storage = () => {
    const saveTasksLocal = (todoArray, inProgressArray, doneArray) => {
        localStorage.setItem('todoTasks', JSON.stringify(todoArray));
        localStorage.setItem('inProgressTasks', JSON.stringify(inProgressArray));
        localStorage.setItem('doneT', JSON.stringify(doneArray));
    };

    const loadTasksLocal = () => {
        const savedTodoTasks = localStorage.getItem('todoTasks');
        const savedInProgressTasks = localStorage.getItem('inProgressTasks');
        const savedDoneTasks = localStorage.getItem('doneT');
        
        return {
            todoTasks: savedTodoTasks ? JSON.parse(savedTodoTasks) : [],
            inProgressTasks: savedInProgressTasks ? JSON.parse(savedInProgressTasks) : [],
            doneT: savedDoneTasks ? JSON.parse(savedDoneTasks) : []
        };
    };

    return {
        saveTasksLocal,
        loadTasksLocal
    };
};

export default Storage;
