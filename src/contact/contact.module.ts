import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactPageController } from './contact-page.controller';
import { ContactPageService } from './contact-page.service';
import { ContactPage } from './entities/contact-page.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, ContactPage])
  ],
  controllers: [ContactController, ContactPageController],
  providers: [ContactService, ContactPageService],
})
export class ContactModule {}
