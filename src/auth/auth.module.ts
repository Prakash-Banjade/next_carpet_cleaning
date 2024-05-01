import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MembersModule } from '../members/members.module';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/entities/member.entity';
=======
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
>>>>>>> f42516ab59a2c59abb7c6bb1cb1554c6104d8ab3

@Module({
  imports: [
    MembersModule,
<<<<<<< HEAD
    TypeOrmModule.forFeature([Member])
=======
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '9h' },
      }),
      inject: [ConfigService],
    }),
>>>>>>> f42516ab59a2c59abb7c6bb1cb1554c6104d8ab3
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // enable auth globally
    },
  ],
  // exports: [AuthService]
})
export class AuthModule {}
