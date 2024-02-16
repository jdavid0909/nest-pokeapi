import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from 'config/app.config';
import { JoiValidationSchema } from 'config/joi.validation';



@Module({
  imports: [

    //configuraciones con .env
    ConfigModule.forRoot(
      {
        load:[EnvConfiguration],
        validationSchema:JoiValidationSchema
      }
    ),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    PokemonModule,
    //conexion ala bd
    MongooseModule.forRoot(process.env.MONGODB),
    
    
    CommonModule,
    SeedModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { 

  constructor(){
    console.log(process.env);
    
  }

}
