import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { RegisterDto } from '../application/dto/register.dto';
import { LoginDto } from '../application/dto/login.dto';
import { Role } from '../application/enums/rol.enum';
import { Auth } from '../application/decorators/auth.decorator';
import { ActiveUser } from '../application/decorators/active-user.decorator';
import { UserActiveInterface } from '../application/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: RequestWithUser) {
  //   return req.user;
  // }

  @Auth(Role.USER)
  @ApiBearerAuth()
  @Get('profile')
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
