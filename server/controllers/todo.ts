import { Controller, Param, Delete, Body, Get, Post, UseBefore } from "routing-controllers";
import { config } from "../configs/postgresql";
import { Pool } from "pg";
import cors from "cors";

@Controller()
export class TodoController {
    @Get("/")
    @UseBefore(cors())
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
    @UseBefore(cors())
    async post(@Body() task: any) {
        const pool = new Pool(config);
        try {
            const result = await pool.query("insert into task (description) values ($1) returning *", [task.description]);
            return result.rows[0];
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
