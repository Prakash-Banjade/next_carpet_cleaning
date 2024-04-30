import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async fetch() {
    return await this.contactRepo.find();
  }

  async create(createContactDto: CreateContactDto) {
    const existingContact = await this.contactRepo.find();
    if (existingContact?.length)
      throw new ConflictException('Contact already exists');
    return await this.contactRepo.save(createContactDto);
  }

  async update(updateContactDto: UpdateContactDto) {
    const existingContact = await this.contactRepo.find();

    if (!existingContact?.length) {
      const result = await this.contactRepo.save(updateContactDto);
      return result;
    } else {
      Object.assign(existingContact[0], updateContactDto);
      return await this.contactRepo.save(existingContact);
    }
  }
}
