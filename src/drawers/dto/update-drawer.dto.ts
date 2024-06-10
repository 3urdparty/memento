import { PartialType } from '@nestjs/mapped-types';
import { CreateDrawerDto } from './create-drawer.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDrawerDto extends PartialType(CreateDrawerDto) {

}
