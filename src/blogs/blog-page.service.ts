import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPageDto } from './dto/blog-page.dto';
import { BlogPage } from './entities/blog-page.entity';
import getImageUrl from 'src/utils/getImageUrl';

@Injectable()
export class BlogPageService {
    constructor(
        @InjectRepository(BlogPage) private readonly blogRepo: Repository<BlogPage>,
    ) { }

    async getPageData() {
        const blogPageData = await this.blogRepo.find();
        return blogPageData[0];
    }

    async setPageData(blogPageDto: BlogPageDto) {
        const existingPageData = await this.blogRepo.find()
        const bannerImage = await getImageUrl(blogPageDto.bannerImage)

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
}
