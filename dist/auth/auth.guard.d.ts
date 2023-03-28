import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.services";
declare class TokenAuthorizer {
    private readonly authService;
    constructor(authService: AuthService);
    protected authorizeToken(context: ExecutionContext): Promise<boolean>;
}
export declare class RequiredAuthGuard extends TokenAuthorizer implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
