import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    localStorage?: Storage;
    constructor(@Inject(DOCUMENT) private document: Document) {
        this.localStorage = this.document.defaultView?.localStorage;

    }
    getToken(): string {
        return this.localStorage?.getItem(this.TOKEN_KEY) ?? "nuh uh";
    }
    setToken(token: string): void {
        this.localStorage?.setItem(this.TOKEN_KEY, token);
    }
    removeToken(): void {
        localStorage?.removeItem(this.TOKEN_KEY);
    }
}