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

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}