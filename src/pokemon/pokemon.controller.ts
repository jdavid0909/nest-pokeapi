import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { paginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  async findAll(@Res() res, @Query() queryParameter:paginationDto) {

    
    const pokemons:Pokemon[] = await this.pokemonService.findAll(queryParameter);

    return res.status(HttpStatus.OK).json({
      message: 'pokemones',
      product: pokemons
  })
  }

  @Get(':term')
  async findOne(@Param('term') term: string) {
    const pokemon = await  this.pokemonService.findOne(term);


  return pokemon

  }

  @Patch(':term')
  async update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {


    updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    return await this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(+id);
  }
}
