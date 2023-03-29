import {PoolConfig} from "pg"

const {
    db_user,
    db_database,
    db_password,
    db_port,
    db_host,
    db_connectionString,
    db_ssl
} = process.env;

export const config: PoolConfig = db_connectionString ? {
    connectionString: db_connectionString
} : {
    user: db_user ?? "postgres",
    database: db_database ?? "todo",
    password: db_password ?? "root",
    port: +(db_port ?? 5432),
    host: db_host ?? "localhost",
    ssl: Boolean(db_ssl)
}
