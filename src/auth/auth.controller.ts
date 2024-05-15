import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  BadRequestException,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Public } from '../decorators/setPublicRoute.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from '../members/members.service';
require('dotenv').config();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MembersService,
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
        secure: process.env.MODE! === 'prod' ? true : false,
        sameSite: 'none',
        domain: "hubit.com.np",
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // Hour Minute Second Millisecond
      })
      .send({ status: 'ok', id });
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return;
  }

  @Get('verifyToken')
  // @ApiExcludeEndpoint()
  async verifyToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    try {
      if (!req.cookies.access_token) {
        throw new BadRequestException('Invalid token');
      } else {
        const payload = await this.jwtService.verifyAsync(
          req.cookies.access_token,
          {
            secret: process.env.ACCESS_TOKEN_SECRET,
          },
        );

        if (payload) {
          const user = await this.memberService.findOne(payload.id);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            post: user.post,
          };
        }
      }
    } catch (error) {
      // Handle the error properly
      throw new UnauthorizedException();
    }
  }
}
