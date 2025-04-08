import { Request, Response } from "express";
import Task from "../models/Task";
import { ITask } from "../types/interface";

export const getTasks = async (req: Request, res: Response) => {
	const tasks = await Task.find();

	res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
	const newTask = await Task.create(req.body);
	res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
	res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	await Task.findByIdAndDelete(id);

	res.status(200).json({
		message: "Task deleted successfully",
	});
};
