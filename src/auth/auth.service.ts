import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto) {
    const { email, password } = signInAuthDto;
    const member = await this.memberRepository.findOneBy({ email });

    if (!member) throw new BadRequestException({ message: 'Invalid email' });

    if (!member.isAdmin)
      throw new BadRequestException({
        message: 'Only admins can sign in',
        field: 'email',
      });

    const isMatch = bcrypt.compareSync(password, member.password);

    if (!isMatch)
      throw new BadRequestException({
        message: 'Invalid password',
        field: 'password',
      });

    const payload = { email: member.email, id: member.id };
    const jwtToken = await this.jwtService.signAsync(payload);

    return {
      access_token: jwtToken,
      id: member.id,
    };
  }
}
