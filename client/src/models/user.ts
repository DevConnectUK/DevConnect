export type User = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

export type RegisterUserInput = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export type LoginUserInput = {
    username: string;
    password: string;
};
