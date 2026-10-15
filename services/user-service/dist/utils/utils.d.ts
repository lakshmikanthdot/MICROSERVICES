export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const generateToken: (userId: string, name: string, email: string) => string;
export declare const verifyToken: (token: string) => {
    userId: string;
};
//# sourceMappingURL=utils.d.ts.map