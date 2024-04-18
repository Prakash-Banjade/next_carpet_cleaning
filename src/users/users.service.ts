import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RequestUser } from 'types';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) public readonly userRepo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const existingUser = await this.findOneByEmail(createUserDto.email)
    if (existingUser instanceof User) throw new ConflictException('User already exists with this email')
    const newUser = this.userRepo.create(createUserDto)
    return await this.userRepo.save(newUser);
  }

  async findAll() {
    return await this.userRepo.find({
      order: {
        createdAt: 'ASC'
      },
      select: {
        password: false,
      }
    });
  }

  async findOneById(id: string) {
    const existingUser = await this.userRepo.findOne({
      where: { id },
      select: { password: false }
    })
    if (!existingUser) throw new NotFoundException('User not found')
    return existingUser;
  }

  async findOneByEmail(email: string) {
    const existingUser = await this.userRepo.findOneBy({ email })
    if (!existingUser) return new NotFoundException('User not found')
    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOneById(id)
    // TODO: user might change email and set it to the already existed one, resolve it
    Object.assign(existingUser, updateUserDto);
    return await this.userRepo.save(existingUser);
  }

  async remove(id: string, currentUser: RequestUser) {
    const existingUser = await this.findOneById(id)

    if (existingUser.id === currentUser.id) {
      throw new ConflictException('You cannot delete yourself')
    }

    return await this.userRepo.softRemove(existingUser);
  }

  async restore(id: string) {
    const user = await this.userRepo.restore(id);
    if (!user) throw new NotFoundException('User not found')
    return user;
  }
}
