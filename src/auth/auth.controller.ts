import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Public } from '../decorators/setPublicRoute.decorator';
import { ApiBody, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK) // the default status code of POST is 201, we override it to 200
  @Post('login')
  @ApiBody({
    type: SignInAuthDto,
  })
  async signin(
    @Body() signInDto: SignInAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, id } = await this.authService.signIn(signInDto);

    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: 'ok', id });
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return;
  }

  @Public()
  @Get('verifyToken')
  @ApiExcludeEndpoint()
  async veryfyToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    if (!req.cookies.access_token)
      throw new BadRequestException('Invalid token');

    const payload = await this.jwtService.verifyAsync(
      req.cookies.access_token,
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
      },
    );

    return res.send({ status: 'ok', id: payload.id });
  }
}
