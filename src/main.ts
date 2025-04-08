import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import homeRoutes from "./routes/homeRoutes";
import taskRoutes from "./routes/taskRoutes";
import mongoose from "mongoose";
import { SetupSwagger } from "./docs/Swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());
app.use("/", homeRoutes);
app.use("/api/tasks", taskRoutes);

const startApp = async () => {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(String(MONGO_URI));
		console.log("Successfully connected to database");

		// Setup Swagger docs
		SetupSwagger(app);

		// Inicia o servidor
		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
			console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Startup error:", error.message);
		}
	}
};

startApp();
