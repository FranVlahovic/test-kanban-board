const Storage = () => {
    const saveTasksLocal = (todoArray, inProgressArray) => {
        localStorage.setItem('todoTasks', JSON.stringify(todoArray));
        localStorage.setItem('inProgressTasks', JSON.stringify(inProgressArray));
    };

    const loadTasksLocal = () => {
        const savedTodoTasks = localStorage.getItem('todoTasks');
        const savedInProgressTasks = localStorage.getItem('inProgressTasks');
        
        return {
            todoTasks: savedTodoTasks ? JSON.parse(savedTodoTasks) : [],
            inProgressTasks: savedInProgressTasks ? JSON.parse(savedInProgressTasks) : []
        };
    };

    return {
        saveTasksLocal,
        loadTasksLocal
    };
};

export default Storage;
