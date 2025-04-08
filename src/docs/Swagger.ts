import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Task Manager API",
			version: "1.0.0",
			description: "API para gestão de tarefas",
		},
		components: {
			schemas: {
				Task: {
					type: "object",
					required: ["title"],
					properties: {
						_id: {
							type: "string",
							description: "ID da tarefa",
						},
						title: {
							type: "string",
							description: "Título da tarefa",
						},
						completed: {
							type: "boolean",
							description: "Estado da tarefa",
						},
					},
					example: {
						_id: "643d66f5a4d2d0e9a1f6f870",
						title: "Estudar Swagger",
						completed: false,
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const SetupSwagger = (app: Express) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
