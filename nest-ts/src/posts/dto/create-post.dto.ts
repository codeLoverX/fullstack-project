import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: String
  })
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String
  })
  title: string;
}

export default CreatePostDto;