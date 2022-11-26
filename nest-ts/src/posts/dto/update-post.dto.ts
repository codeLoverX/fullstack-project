import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    type: Number,
    description: 'Must be number',
  })
  id: number;
  
  @ApiProperty({
    type: String
  })
  content: string;
  
  @ApiProperty({
    type: String
  })
  title: string;
}

export default UpdatePostDto;