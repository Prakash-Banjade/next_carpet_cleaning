import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Public } from 'src/decorators/setPublicRoute.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK) // the default status code of POST is 201, we override it to 200
  @Post('login')
  signin(@Body() signInDto: SignInAuthDto) {
    return this.authService.signIn(signInDto)
  }
}
