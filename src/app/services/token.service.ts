import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from '@angular/common';

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    localStorage?: Storage;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private jwtHelper: JwtHelperService
) {
        this.localStorage = this.document.defaultView?.localStorage;
    }
    getToken(): string {
        return this.localStorage?.getItem(this.TOKEN_KEY) ?? "";
    }
    setToken(token: string): void {
        this.localStorage?.setItem(this.TOKEN_KEY, token);
    }
    removeToken(): void {
        localStorage?.removeItem(this.TOKEN_KEY);
    }
    isTokenExpired(token: string) {
        debugger
        return this.jwtHelper.isTokenExpired(token);
    }
}