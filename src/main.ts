import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ServicesModule } from './services/services.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BlogsModule } from './blogs/blogs.module';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log']
  });

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));


  // swagger
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('services', 'blogs')
  .build();
const document = SwaggerModule.createDocument(app, config,{
  include:[ServicesModule,BlogsModule]
});
SwaggerModule.setup('api', app, document);

  await app.listen(PORT).then(() => {
    console.log(`Server running on port ${PORT}`);
  })
}
bootstrap();
