import { IsNumberString } from 'class-validator';

class FindOneByIdParams {
  @IsNumberString()
  id: string;
}

export default FindOneByIdParams