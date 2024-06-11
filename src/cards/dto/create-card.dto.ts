import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;

}
