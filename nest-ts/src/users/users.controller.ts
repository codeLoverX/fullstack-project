import { ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
// no controller route regarding authentication will be written  here
// @SerializeOptions({
//     strategy: 'excludeAll'
// })
export class UsersController {
    // @Post('address')
    // addAddress(){

    // }


    // getAllAddressesWithUsers() {
    //     return this.addressRepository.find({ relations: ['user'] });
    // }
}
