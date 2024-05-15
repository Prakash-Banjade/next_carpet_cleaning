import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile } from 'nestjs-form-data';
import getImageUrl from '../utils/getImageUrl';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>
  ) { }

  async create(createMemberDto: CreateMemberDto) {
    // const image = createMemberDto.image && this.getFileName(createMemberDto.image);
    const image = getImageUrl(createMemberDto.image);

    const existingMemberWithEmail = await this.memberRepository.findOneBy({
      email: createMemberDto.email,
    })

    if (existingMemberWithEmail) throw new ConflictException('Member with this email already exists');

    const newMember = this.memberRepository.create({
      ...createMemberDto,
      image,
    })

    return await this.memberRepository.save(newMember);
  }

  async findAll() {
    return await this.memberRepository.find({
      where: {
        isAdmin: false,
      },
      select: {
        password: false,
      }
    });
  }

  async findOne(id: string) {
    const existingMember = await this.memberRepository.findOne({
      where: {
        id,
      },
      select: {
        password: false
      }
    });
    if (!existingMember) throw new NotFoundException('Member not found');

    return existingMember;
  }

  async findOneByEmail(email: string) {
    const existingUser = await this.memberRepository.findOneBy({ email })
    if (!existingUser) return new NotFoundException('User not found')
    return existingUser;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    // const image = updateMemberDto.image && this.getFileName(updateMemberDto.image);
    const image = getImageUrl(updateMemberDto.image);

    const existingMember = await this.findOne(id);

    const foundMember = await this.memberRepository.findOneBy({
      email: updateMemberDto.email,
    })

    if (foundMember && foundMember.id !== id) throw new ConflictException('Member with this email already exists');

    Object.assign(existingMember, {
      ...updateMemberDto,
      image,
    })

    return await this.memberRepository.save(existingMember);
  }

  async remove(id: string, member: { id: string }) {
    const existingMember = await this.findOne(id);

    if (existingMember.id === member.id) throw new ConflictException('You cannot remove yourself');

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
