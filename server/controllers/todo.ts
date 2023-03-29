import { Controller, Param, Delete, Body, Get, Post } from "routing-controllers";
import { config } from "../configs/postgresql";
import { Task } from "../models/task";
import { Pool } from "pg";

@Controller()
export class TodoController {
    @Get("/")
    async getAll() {
        const pool = new Pool(config);
        try {
            const result = await pool.query("select * from task");
            return result.rows;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Post("/")
    async post(@Body() task: Task) {
        const pool = new Pool(config);
        try {
            const result = await pool.query("insert into task (description) values ($1) returning *", [task.description]);
            return { id: result.rows[0].id };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Delete("/:id")
    async remove(@Param("id") id: number) {
        const pool = new Pool(config);
        try {
            await pool.query("delete from task where id = $1", [id]);
            return { id };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
