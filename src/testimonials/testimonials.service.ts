import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import getImageUrl from '../utils/getImageUrl';

@Injectable()
export class TestimonialsService {

  constructor(
    @InjectRepository(Testimonial) private readonly testimonialRepo: Repository<Testimonial>
  ) { }

  async create(createTestimonialDto: CreateTestimonialDto) {

    // const image = createTestimonialDto.image && this.getFileName(createTestimonialDto.image);
    const image = await getImageUrl(createTestimonialDto.image);

    if (createTestimonialDto.email) {
      const existingReviewer = await this.testimonialRepo.findOne({ where: { email: createTestimonialDto.email } });
      if (existingReviewer) throw new Error('Reviewer already exists');
    }

    const newTestimonial = this.testimonialRepo.create({
      ...createTestimonialDto,
      image
    });

    return await this.testimonialRepo.save(newTestimonial);
  }

  async findAll() {
    return await this.testimonialRepo.find({});
  }

  async findOne(id: string) {
    const existingReview = await this.testimonialRepo.findOneBy({ id });
    if (!existingReview) throw new NotFoundException('Testimonial not found');

    return existingReview;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
    const existingReview = await this.findOne(id);

    // const image = updateTestimonialDto.image && this.getFileName(updateTestimonialDto.image);
    const image = await getImageUrl(updateTestimonialDto.image);

    if (updateTestimonialDto.email) {
      const existingReviewer = await this.testimonialRepo.findOne({ where: { email: updateTestimonialDto.email } });
      if (existingReviewer) throw new Error('Reviewer already exists');
    }

    Object.assign(existingReview, {
      ...updateTestimonialDto, 
      image,
    });

    return await this.testimonialRepo.save(existingReview);
  }

  async remove(id: string) {
    const existingReview = await this.findOne(id);
    return await this.testimonialRepo.softRemove(existingReview);
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments?.length - 1];
      return fileName;
    } else return file;
  }
}
