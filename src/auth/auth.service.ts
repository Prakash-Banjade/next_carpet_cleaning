import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(signInAuthDto: SignInAuthDto) {
    const { email, password } = signInAuthDto
    const user = await this.userService.findOneByEmail(email)

    if (user instanceof NotFoundException) throw new BadRequestException('Invalid email')

    // const isMatch = bcrypt.compareSync(password, user.password)
    const isMatch = password === user.password;

    if (!isMatch) throw new BadRequestException('Invalid password')

    const payload = { email: user.email, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
