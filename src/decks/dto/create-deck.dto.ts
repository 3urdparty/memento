import mongoose from "mongoose";
import { Deck } from "../schemas/deck.schema";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmpty, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["easy", "medium", "hard", "very hard", "expert"])
  difficulty: "easy" | "medium" | "hard" | "very hard" | "expert";



  @IsNumber()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  rating: number;

  coverUrl: string;

  properties: mongoose.Schema.Types.ObjectId[];


  @IsMongoId({ each: true, })
  @IsOptional()
  contributors: mongoose.Types.ObjectId[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  // tags: Tag[];

  cards: mongoose.Schema.Types.ObjectId[];
}
