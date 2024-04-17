import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>
  ) { }

  async create(createMemberDto: CreateMemberDto) {
    const image = createMemberDto.image && this.getFileName(createMemberDto.image);

    console.log(createMemberDto)

    const newMember = this.memberRepository.create({
      ...createMemberDto,
      image,
    })

    return await this.memberRepository.save(newMember);
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  async findOne(id: string) {
    const existingMember = await this.memberRepository.findOneBy({ id });
    if (!existingMember) throw new NotFoundException('Member not found');

    return existingMember;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const image = updateMemberDto.image && this.getFileName(updateMemberDto.image);

    const existingMember = await this.findOne(id);

    Object.assign(existingMember, {
      ...updateMemberDto,
      image,
    })

    return await this.memberRepository.save(existingMember);
  }

  async remove(id: string) {
    const existingMember = await this.findOne(id);
    return await this.memberRepository.softRemove(existingMember);
  }

  public getFileName(file: FileSystemStoredFile | string) {
    if (typeof file !== 'string') {
      const pathSegments = file?.path.split('\\');
      const fileName = pathSegments[pathSegments?.length - 1];
      return fileName;
    } else return file;
  }
}
