import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { UsersModule } from '../users/users.module';
import { BlogPageService } from './blog-page.service';
import { BlogPage } from './entities/blog-page.entity';
import { BlogPageController } from './blog-page.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogPage]), UsersModule],
  controllers: [BlogsController, BlogPageController],
  providers: [BlogsService, BlogPageService],
})
export class BlogsModule {}
