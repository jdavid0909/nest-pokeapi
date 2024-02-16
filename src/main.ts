import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configura global el enpoint de inicio
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(new ValidationPipe({
    //with list solo deja la data que espero aunque enviemos otra data
    whitelist:true,
    //No deja pasar data no delclarada en la clase
    forbidNonWhitelisted:true,
    //convierte en string lo que venga por query param etc
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  await app.listen(process.env.PORT);
}
bootstrap();
