import { Injectable } from '@nestjs/common';

@Injectable()
export class HomePageService {
  create() {
    return 'This action adds a new homePage';
  }

  findAll() {
    return `This action returns all homePage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homePage`;
  }

  update(id: number) {
    return `This action updates a #${id} homePage`;
  }

  remove(id: number) {
    return `This action removes a #${id} homePage`;
  }
}
