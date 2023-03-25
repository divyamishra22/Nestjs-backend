import { Body, Controller, Post } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";

class LoginRequestBody {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
  }
  
  class LoginResponseBody {
    @ApiProperty() token: string;
    constructor(token: string) {
      this.token = token;
    }
  }


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

}
