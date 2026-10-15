import { CreateUserDTO, UserResponse, AuthResponse } from "../types/user.types";
export declare const createUser: (userData: CreateUserDTO, res: any) => Promise<AuthResponse>;
export declare const loginUser: (email: string, password: string, res: any) => Promise<AuthResponse>;
export declare const getUserById: (userId: string) => Promise<UserResponse | null>;
//# sourceMappingURL=user.service.d.ts.map