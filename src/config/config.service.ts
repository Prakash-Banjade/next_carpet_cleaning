import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
require('dotenv').config();

const configService: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL!,

  entities: [join(__dirname, '**', '*.entity.{ts,js}')],

  migrationsTableName: 'migration',

  migrations: ['src/migration/*.ts'],

  // cli: {
  //     migrationsDir: 'src/migration',
  // },

  autoLoadEntities: false,
  synchronize: true,
};

export { configService };
