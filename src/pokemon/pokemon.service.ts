import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) {

  }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {


      const pokemon = await new this.pokemonModel(createPokemonDto);


      await pokemon.save()


      return createPokemonDto;

    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(` Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
      }

      console.log(error);

      throw new InternalServerErrorException(`cant create pokemon -check server`)


    }



  }

  async findAll(): Promise<Pokemon[]> {

    const pokemons = await this.pokemonModel.find();


    return pokemons;
  }

  async findOne(termino: string) {

    const pokemon = await this.pokemonModel.findOne({ no: termino });



    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {

      const pokemon = await this.findOne(term);

      const pokemonUpdate = await pokemon.updateOne(updatePokemonDto, { new: true })

      return pokemonUpdate;

    } catch (error) {

      this.handleExceptions(error);


    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

  private handleExceptions (error:any){

    if (error.code === 11000) {

      throw new BadRequestException(` Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
    }

    console.log(error);

    throw new InternalServerErrorException(`cant create pokemon -check server`)

  }
}
