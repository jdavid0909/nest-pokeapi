import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { paginationDto } from 'src/common/dto/pagination.dto';

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

  async findAll(queryParameter:paginationDto): Promise<Pokemon[]> {

    const { limit =10 , offset = 0 } = queryParameter;

    const pokemons = await this.pokemonModel.find()
      .limit(limit).skip(offset).sort({no:1}).select('-__v');


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

  async remove(id: number) {


    // const result = this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ __id: id })

    if (deletedCount === 0) {
      throw new BadRequestException('Pokemon el id not found')
    }

    return;
  }

  private handleExceptions(error: any) {

    if (error.code === 11000) {

      throw new BadRequestException(` Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
    }

    console.log(error);

    throw new InternalServerErrorException(`cant create pokemon -check server`)

  }
}
