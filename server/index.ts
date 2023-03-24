import "reflect-metadata";

import { createExpressServer } from "routing-controllers";
import { TodoController } from "./controllers/todo";
import { port } from "./configs/server";
import morgan from "morgan";

const app = createExpressServer({
    controllers: [TodoController]
});

app.use(morgan("dev"));

app.listen(port);
