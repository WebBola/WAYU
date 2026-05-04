import 'dotenv/config';
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  entities: [process.env.NODE_ENV === 'production' ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [process.env.NODE_ENV === 'production' ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
});

export default AppDataSource;