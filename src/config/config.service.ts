import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path'

// const configService: TypeOrmModuleOptions = {
//     type: 'mysql',

//     host: 'yh3.domaininnepal.com',
//     port: 3306,
//     username: 'hubitcom_prakash122',
//     password: 'prakash@122',
//     database: 'hubitcom_rebelcleaning',

//     entities: [join(__dirname, '**', '*.entity.{ts,js}')],

//     migrationsTableName: 'migration',

//     migrations: ['src/migration/*.ts'],

//     // cli: {
//     //     migrationsDir: 'src/migration',
//     // },

//     autoLoadEntities: true,
//     synchronize: true
// };

const configService: TypeOrmModuleOptions = {
    // type: 'mysql',

    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'mySQL',
    // database: 'rebel_cleaning',

    type: 'mysql',
    host: 'yh3.domaininnepal.com',
    port: 3306,
    username: 'hubitcom_prakash122',
    password: 'prakash@122',
    database: 'hubitcom_rebelcleaning',

    entities: [join(__dirname, '**', '*.entity.{ts,js}')],

    migrationsTableName: 'migration',

    migrations: ['src/migration/*.ts'],

    // cli: {
    //     migrationsDir: 'src/migration',
    // },

    autoLoadEntities: true,
    synchronize: false
};

export { configService };
