import { AuthService } from "./auth.services";
declare class LoginRequestBody {
    username: string;
    password: string;
}
declare class LoginResponseBody {
    token: string;
    constructor(token: any);
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginRequestBody): Promise<LoginResponseBody>;
}
export {};
