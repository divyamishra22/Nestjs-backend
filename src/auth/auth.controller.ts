import { Body, Controller, Post } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";

class LoginRequestBody {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
  }
  
  class LoginResponseBody {
    @ApiProperty() token: Promise<any>;
    constructor(token: any) {
      this.token = token;
    }
  }


@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}
@ApiResponse({ type: LoginResponseBody })
@Post('/login')
async login(@Body() body: LoginRequestBody) {
  const newsession = await this.authService.createNewSession( body.username,
  body.password,)
  return new  LoginResponseBody(newsession);
}
 
}
