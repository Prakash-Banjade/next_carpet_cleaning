import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
require('dotenv').config();

const configService: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL!,

  entities: [join(__dirname, '**', '*.entity.{ts,js}')],

  migrationsTableName: 'migration',

  migrations: ['src/migration/*.ts'],

  // cli: {
  //     migrationsDir: 'src/migration',
  // },

  autoLoadEntities: true,
  synchronize: false,
};

export { configService };
