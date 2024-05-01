import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const tokenService = inject(TokenService);
    const userService = inject(UserService);
    const token = tokenService.getToken();
    if(tokenService.isTokenExpired(token)) {
        alert('You are not admin');
        router.navigate(['/login']);
        return false;
    } else {
        return userService.isAdmin(token);
    }
};
