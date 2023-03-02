import { create, db, update } from "../models/db";
export const createTodo = async ({ title, content }) => {
    const todo = create({ title, content });
    db.data?.todos.push(todo);
    await db.write();
    return todo;
};
export const findTodos = () => {
    return db.data?.todos;
};
export const findTodo = (predicate) => {
    return db.data?.todos.find(predicate);
};
export const updateTodo = async (todo, todoValue) => {
    Object.assign(todo, update({ ...todo, ...todoValue }));
    await db.write();
    return todo;
};
export const deleteTodo = async (todoToDelete) => {
    const filteredTodos = db.data?.todos.filter((todo) => todo.id !== todoToDelete.id);
    db.data.todos = filteredTodos;
    await db.write();
    return todoToDelete;
};
