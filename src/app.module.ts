import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { BaseEntity } from 'typeorm';
import { ServicesModule } from './services/services.module';
import { BlogsModule } from './blogs/blogs.module';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GalleryModule } from './gallery/gallery.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import envConfig from './config/env.config';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config()


@Module({
  imports: [
    ConfigModule.forRoot({ // nest env config 
      isGlobal: true,
      load: [envConfig]
    }),
    TypeOrmModule.forRoot(configService),
    TypeOrmModule.forFeature([BaseEntity]),
    NestjsFormDataModule.config({ storage: FileSystemStoredFile, isGlobal: true, fileSystemStoragePath: 'public', autoDeleteFile: false }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // serve static files eg: localhost:3000/filename.png
    }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1200s'
      }
    }),
    ServicesModule,
    BlogsModule,
    GalleryModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
