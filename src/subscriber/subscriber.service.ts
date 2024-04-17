import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber) private readonly subscriberRepo: Repository<Subscriber>,
  ) { }

  async create(createSubscriberDto: CreateSubscriberDto) {
    const existingSubscriber = await this.subscriberRepo.findOne({ where: { email: createSubscriberDto.email } });

    if (existingSubscriber) throw new ConflictException('Subscriber already exists with this email');

    const newSubscriber = this.subscriberRepo.create(createSubscriberDto);
    return await this.subscriberRepo.save(newSubscriber);
  }

  async findAll() {
    return await this.subscriberRepo.find();
  }

  async findOne(id: string) {
    return await this.subscriberRepo.findOne({ where: { id } });
  }

  async update(id: string, updateSubscriberDto: UpdateSubscriberDto) {
    const existingSubscriber = await this.findOne(id);

    const foundSubscriber = await this.subscriberRepo.findOne({ where: { email: updateSubscriberDto.email } });

    if (foundSubscriber && foundSubscriber.id !== id) throw new ConflictException('Subscriber already exists with this email');

    Object.assign(existingSubscriber, updateSubscriberDto);

    return await this.subscriberRepo.save(existingSubscriber);
  }

  async remove(id: string) {
    const existingSubscriber = await this.findOne(id);
    return await this.subscriberRepo.softRemove(existingSubscriber);
  }
}
