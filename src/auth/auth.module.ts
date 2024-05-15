import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MembersModule } from '../members/members.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/entities/member.entity';

@Module({
  imports: [
    MembersModule,
    TypeOrmModule.forFeature([Member])
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
