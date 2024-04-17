import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { UserService } from '../users/users.service';
import { BlogPageDto } from './dto/blog-page.dto';
import { BlogPage } from './entities/blog-page.entity';

@Injectable()
export class BlogPageService {
    constructor(
        @InjectRepository(BlogPage) private readonly blogRepo: Repository<BlogPage>,
    ) { }

    async getPageData() {
        const blogPageData = await this.blogRepo.find();
        console.log(blogPageData)
        return blogPageData[0];
    }


    async setPageData(blogPageDto: BlogPageDto) {
        const existingPageData = await this.blogRepo.find()
        const bannerImage = blogPageDto.bannerImage ? this.getFileName(blogPageDto.bannerImage) : null;

        if (!existingPageData?.length) {
            const newBlogPageData = await this.blogRepo.save({
                ...blogPageDto,
                bannerImage,
            })

            return newBlogPageData;
        }

        Object.assign(existingPageData[0], {
            bannerImage,
        })

        return await this.blogRepo.save(existingPageData[0]);
    }

    public getFileName(file: FileSystemStoredFile | string) {
        if (typeof file !== 'string') {
            const pathSegments = file?.path.split('\\');
            const fileName = pathSegments[pathSegments.length - 1];
            return fileName;
        } else return file;
    }
}
