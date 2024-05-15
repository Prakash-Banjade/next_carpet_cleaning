import { Injectable } from '@nestjs/common';
import { CreatePrivacyPolicyDto } from './dto/create-privacy_policy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivacyPolicy } from './entities/privacy_policy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrivacyPolicyService {

  constructor(
    @InjectRepository(PrivacyPolicy) private readonly privacyPolicyRepo: Repository<PrivacyPolicy>,
  ) { }

  async set(createPrivacyPolicyDto: CreatePrivacyPolicyDto) {
    const existingData = await this.privacyPolicyRepo.find();

    if (existingData.length > 0) {
      Object.assign(existingData[0], createPrivacyPolicyDto);

      return await this.privacyPolicyRepo.save(existingData[0]);
    }

    const newPrivacyPolicy = this.privacyPolicyRepo.create(createPrivacyPolicyDto);

    return await this.privacyPolicyRepo.save(newPrivacyPolicy);
  }

  async get() {
    const existingData = await this.privacyPolicyRepo.find();
    return existingData.length > 0 ? existingData[0] : {};
  }
}
