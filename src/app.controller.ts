import { Bind, Controller, Get, Post, UseGuards, Request, Dependencies, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';

@Dependencies(AuthService)
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() loginDetails: LoginDto
  ) {
    console.log(loginDetails)
    return this.authService.authenticate(loginDetails.email, loginDetails.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @Bind(Request())
  getProfile(@Request() req) {
    return req.user;
  }

}
