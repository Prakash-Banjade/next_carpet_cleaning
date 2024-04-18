import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MembersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto) {
    const { email, password } = signInAuthDto;
    const member = await this.memberService.findOneByEmail(email);

    if (member instanceof NotFoundException)
      throw new BadRequestException({
        message: 'Invalid email',
        field: 'email',
      });

    if (!member.isAdmin) throw new BadRequestException({
      message: 'Only admins can sign in',
      field: 'email',
    });

    const isMatch = bcrypt.compareSync(password, member.password)

    if (!isMatch)
      throw new BadRequestException({
        message: 'Invalid password',
        field: 'password',
      });

    const payload = { email: member.email, id: member.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
