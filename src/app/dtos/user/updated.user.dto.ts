export class UpdatedUserDto {
    fullname: string;
    password: string;
    retypePassword: string;
    constructor(data: any) {
        this.fullname = data.fullname;
        this.password = data.password;
        this.retypePassword = data.retypePassword;
    }
}