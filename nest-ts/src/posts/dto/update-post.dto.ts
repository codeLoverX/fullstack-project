// WHAT IS VALIDATED?
// API INPUT (OR FORM INPUT): BASICALLY DTO AND PARAMS
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  // handling patch
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  // handling patch
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  // handling patch
  @IsOptional()
  title: string;
}

export default UpdatePostDto;
