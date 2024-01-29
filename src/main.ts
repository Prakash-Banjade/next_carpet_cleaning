import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ServicesModule } from './services/services.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BlogsModule } from './blogs/blogs.module';
import { GalleryModule } from './gallery/gallery.module';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log']
  });

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));


  // swagger
  const config = new DocumentBuilder()
    .setTitle('Rebel Cleaning API Docs')
    .setDescription('This is the documentation of backend apis.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [ServicesModule, BlogsModule, GalleryModule]
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT).then(() => {
    console.log(`Server running on port ${PORT}`);
  })
}
bootstrap();
