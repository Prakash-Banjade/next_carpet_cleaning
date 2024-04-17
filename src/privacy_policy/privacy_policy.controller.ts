import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy_policy.service';
import { CreatePrivacyPolicyDto } from './dto/create-privacy_policy.dto';
import { Public } from 'src/decorators/setPublicRoute.decorator';

@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPrivacyPolicyDto: CreatePrivacyPolicyDto) {
    return this.privacyPolicyService.set(createPrivacyPolicyDto);
  }

  @Public()
  @Get()
  find() {
    return this.privacyPolicyService.get();
  }
}
