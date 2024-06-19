import {
  IsBoolean,
  IsEnum,
  IsString,
  Validate,
  ValidateIf,
} from 'class-validator';
import { Card, ClozeSegment, MCQOption, cardTypes } from '../schemas/card.schema';

export class CreateCardDto {

  @ValidateIf((o) => !['cloze'].includes(o.type))
  @IsString()
  question: string;

  @ValidateIf((o) => !['multiple-choice', 'cloze', 'true-false'].includes(o.type))
  @IsString()
  answer: string;

  @IsEnum(cardTypes)
  type: string;

  @ValidateIf((o) => o.type === 'multiple-choice')
  options: MCQOption[];

  @ValidateIf((o) => o.type === 'multiple-choice')
  shuffle: boolean;

  @ValidateIf((o) => o.type === 'cloze')
  clozeSegments: ClozeSegment[];

}
