import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    debugger
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const token = tokenService.getToken();
    if(!tokenService.isTokenExpired(token)) {
        return true;
    } else {
        alert('You are not authorized to view this page')
        router.navigate(['/login']);
        return false;
    }
};
