import "reflect-metadata";

import { useExpressServer } from "routing-controllers";
import { TodoController } from "./controllers/todo";
import { port } from "./configs/server";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useExpressServer(app, {
    cors: true,
    controllers: [TodoController]
});

app.listen(port);
