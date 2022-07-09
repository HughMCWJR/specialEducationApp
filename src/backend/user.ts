export class User {

    public name: string;

    constructor(name: string) {
        this.name = name;
    }

}

export const TestUser = new User("TEST");