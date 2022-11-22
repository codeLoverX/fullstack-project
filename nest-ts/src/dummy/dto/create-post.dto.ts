import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty({
    type: String
  })
  content: string;
  
  @ApiProperty({
    type: String
  })
  title: string;
}

export default CreatePostDto;