import { PoolConfig } from "pg"

export const config: PoolConfig = {
    user: process.env["db_user"] ?? "postgres",
    host: process.env["db_host"] ?? "localhost",
    database: process.env["db_database"] ?? "todo",
    password: process.env["db_password"] ?? "root",
    port: +(process.env["db_port"] ?? 5432)
}
