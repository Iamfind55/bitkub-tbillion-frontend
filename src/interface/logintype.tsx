export interface ILogins {
    email: string,
    password: string
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
}
export interface ITokens {
    status: number,
    message: string,
    error: string,
    token: {
        accessToken: string,
        refreshToken: string
    }
}

export interface IDecodeToken {
    userId: string;
    accountId: string;
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}
