import { IsNumber, IsPositive, IsString, Min, MinLength, Validate } from "class-validator";

export class CreatePokemonDto {


    //isInt, is Positivem min1
    @IsNumber()
    @IsPositive()
    @Min(1)
    no:number;

    //IsString, minLength 3
    @IsString()
    @MinLength(3)
    name:string;
}
