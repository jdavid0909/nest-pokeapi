import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {


  //lo cambiamos por que ahora usaremos el axios en una clase diferente
  // private readonly axios: AxiosInstance = axios;


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    //patron adaptador
    private readonly http: AxiosAdapter) {

  }




  async executeSeed() {

    await this.pokemonModel.deleteMany({});


    const pokemonToInsert: { name: string, no: number }[] = []


    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');


    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/')

      const no: number = +segments[segments.length - 2]
      // const pokemon = await this.pokemonModel.create({ name, no })
      // await pokemon.save()

      pokemonToInsert.push({ name, no })


    })

    await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed Execute';
  }
}
