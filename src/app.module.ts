import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { BaseEntity } from 'typeorm';
import { ServicesModule } from './services/services.module';
import { BlogsModule } from './blogs/blogs.module';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GalleryModule } from './gallery/gallery.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import envConfig from './config/env.config';
import { JwtModule } from '@nestjs/jwt';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { AboutModule } from './about/about.module';
import { PrivacyPolicyModule } from './privacy_policy/privacy_policy.module';
import { HomePageModule } from './home-page/home-page.module';
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { MembersModule } from './members/members.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { PricingsModule } from './pricings/pricings.module';
import { BookingsModule } from './bookings/bookings.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { EnquiryModule } from './enquiry/enquiry.module';
import { LocationModule } from './location/location.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      // nest env config
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRoot(configService),
    TypeOrmModule.forFeature([BaseEntity]),
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      isGlobal: true,
      fileSystemStoragePath: 'public',
      autoDeleteFile: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'), // added ../ to get one folder back
      serveRoot: '/public/' //last slash was important
    }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '2h',
      },
    }),
    ThrottlerModule.forRoot([
      {
        // rate limiting, only 3 requests per second
        ttl: 1000, // mili second
        limit: 3,
      },
    ]),
    ServicesModule,
    BlogsModule,
    GalleryModule,
    AuthModule,
    UsersModule,
    ContactModule,
    FaqModule,
    AboutModule,
    PrivacyPolicyModule,
    HomePageModule,
    SiteSettingsModule,
    MembersModule,
    SubscriberModule,
    TestimonialsModule,
    PricingsModule,
    BookingsModule,
    EnquiryModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // global throttler guard (rate limiting for all routes)
    },
  ],
})
export class AppModule {}
