import { ApiProperty } from '@nestjs/swagger';
// WHAT IS VALIDATED?
// API INPUT (OR FORM INPUT): BASICALLY DTO AND PARAMS
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    type: Number,
    description: 'Must be number',
  })
  @IsNumber()
  // handling patch
  @IsOptional()
  id: number;
  
  @ApiProperty({
    type: String
  })
  @IsString()
  @IsNotEmpty()
  // handling patch
  @IsOptional()
  content: string;
  
  @ApiProperty({
    type: String
  })
  @IsString()
  @IsNotEmpty()
  // handling patch
  @IsOptional()
  title: string;
}

export default UpdatePostDto;

