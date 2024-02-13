import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  async findAll(@Res() res) {

    
    const pokemons:Pokemon[] = await this.pokemonService.findAll();

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
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
