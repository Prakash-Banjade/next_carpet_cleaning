import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ServicesModule } from './services/services.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BlogsModule } from './blogs/blogs.module';
import { GalleryModule } from './gallery/gallery.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { HomePageModule } from './home-page/home-page.module';
import { MembersModule } from './members/members.module';
import { PricingsModule } from './pricings/pricings.module';
import { PrivacyPolicyModule } from './privacy_policy/privacy_policy.module';
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import cookieParser from 'cookie-parser';
import { BookingsModule } from './bookings/bookings.module';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  app.enableCors({
    origin: ['https://rebelcleaning-cms.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.use(cookieParser());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Rebel Cleaning API Docs')
    .setDescription('This is the documentation of backend apis.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      }
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [ServicesModule, BlogsModule, GalleryModule, AboutModule, ContactModule, FaqModule, HomePageModule, MembersModule, PricingsModule, AuthModule, PrivacyPolicyModule, SiteSettingsModule, SubscriberModule, TestimonialsModule, UsersModule, BookingsModule],
  });
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Next Carpet Cleaning',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  await app.listen(PORT).then(() => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
