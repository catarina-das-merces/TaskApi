import Task from "../models/Task";
import mongoose from "mongoose";
import { ITask } from "../types/interface";

/**
 * Get all tasks
 */
export const getTasksService = async (): Promise<ITask[]> => {
	try {
		return await Task.find();
	} catch (error) {
		throw new Error("Erro ao buscar tarefas");
	}
};

/**
 * Create a new task
 */
export const createTaskService = async (taskData: ITask): Promise<ITask> => {
	try {
		const newTask = new Task(taskData);
		return await newTask.save();
	} catch (error) {
		throw new Error("Erro ao criar a tarefa");
	}
};

/**
 * Update a task by id
 */
export const updateTaskService = async (
	id: string,
	taskData: ITask
): Promise<ITask | null> => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error("ID inválido");
	}

	try {
		const updatedTask = await Task.findByIdAndUpdate(id, taskData, {
			new: true,
			runValidators: true,
		});
		return updatedTask;
	} catch (error) {
		throw new Error("Erro ao atualizar a tarefa");
	}
};

/**
 * Delete a task by id
 */
export const deleteTaskService = async (id: string): Promise<boolean> => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error("ID inválido");
	}

	try {
		const deleted = await Task.findByIdAndDelete(id);
		return deleted !== null;
	} catch (error) {
		throw new Error("Erro ao deletar a tarefa");
	}
};
