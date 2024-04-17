import { Module } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy_policy.service';
import { PrivacyPolicyController } from './privacy_policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivacyPolicy } from './entities/privacy_policy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrivacyPolicy]),
  ],
  controllers: [PrivacyPolicyController],
  providers: [PrivacyPolicyService],
})
export class PrivacyPolicyModule {}
