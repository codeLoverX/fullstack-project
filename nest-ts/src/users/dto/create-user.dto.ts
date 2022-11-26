import { ApiProperty } from "@nestjs/swagger";
import Address from "../entity/address.entity";

export class CreateUserDto {
    @ApiProperty({
        type: String
    })
    email: string;

    @ApiProperty({
        type: String
    })
    name: string;

    @ApiProperty({
        type: String
    })
    password: string;

}

export default CreateUserDto;