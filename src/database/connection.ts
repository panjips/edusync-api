import pgPromise from "pg-promise";
import { IDatabase, IMain } from "pg-promise";
import dotenv from "dotenv";

dotenv.config();
const cn = process.env.DATABASE_URL || "";
const pgp: IMain = pgPromise({});
const db: IDatabase<any> = pgp(cn);

export default db;
