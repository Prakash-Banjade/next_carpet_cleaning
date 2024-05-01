import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserAuthDto } from './dto/user-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
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

  async remove(id: string) {
    const existingUser = await this.findOneById(id)
    return await this.userRepo.softRemove(existingUser);
  }

  async restore(id: string) {
    const user = await this.userRepo.restore(id);
    if (!user) throw new NotFoundException('User not found')
    return user;
  }

  // *** Authentication ***
  async signIn(userAuthDto: UserAuthDto) {
    const { email, password } = userAuthDto;
    const user = await this.userRepo.findOneBy({ email });

    if (user instanceof NotFoundException)
      throw new BadRequestException({
        message: 'Invalid email',
        field: 'email',
      });

    const isMatch = bcrypt.compareSync(password, user.password)

    if (!isMatch)
      throw new BadRequestException({
        message: 'Invalid password',
        field: 'password',
      });

    const payload = { email: user.email, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
