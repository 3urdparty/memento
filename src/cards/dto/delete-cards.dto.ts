import { ApiProperty } from "@nestjs/swagger";

export class DeleteCardsDto {
  @ApiProperty()
  cards: string[];
}
