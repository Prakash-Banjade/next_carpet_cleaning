import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class BlogsService {

  constructor(@InjectRepository(Blog) private readonly blogRepo: Repository<Blog>) { }

  async create(createBlogDto: CreateBlogDto) {
    const { content, title, coverImage } = createBlogDto;
    // console.log(coverImage);
    console.log(createBlogDto);
    if (coverImage instanceof FileSystemStoredFile) {
      const pathSegments = coverImage?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      createBlogDto.coverImage = fileName;
    }
    return await this.blogRepo.save({
      content,
      title,
      coverImage: createBlogDto.coverImage as string || null,
    });
  }

  async findAll() {
    return await this.blogRepo.find({
      order: {
        createdAt: 'ASC'
      }
    });
  }

  async findOne(id: string) {
    const existingBlog = await this.blogRepo.findOneBy({ id });
    if (!existingBlog) throw new BadRequestException('Blog not found')
    return existingBlog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const existingBlog = await this.findOne(id);

    if (updateBlogDto?.coverImage instanceof FileSystemStoredFile) {
      const pathSegments = updateBlogDto?.coverImage?.path.split('\\');
      const fileName = pathSegments[pathSegments.length - 1];
      updateBlogDto.coverImage = fileName;
    }

    Object.assign(existingBlog, updateBlogDto);
    return await this.blogRepo.save(existingBlog);
  }

  async remove(id: string) {
    const existingBlog = await this.findOne(id);
    const deleted = await this.blogRepo.softRemove(existingBlog);
    if (!deleted) throw new BadRequestException('Failed to remove blog')
    return deleted;
  }

  async restore(id: string) {
    const blog = await this.blogRepo.restore({ id });

    if (!blog) throw new BadRequestException('Failed to restore blog')
    return blog
  }
}
