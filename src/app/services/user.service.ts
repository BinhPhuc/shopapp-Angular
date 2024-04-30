import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { DOCUMENT } from '@angular/common';
import { UserDetailResponse } from '../responses/users/user.detail.response';
import { UpdatedUserDto } from '../dtos/user/updated.user.dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRegister = 'http://localhost:8088/api/v1/users/register';
    private apiLogin = 'http://localhost:8088/api/v1/users/login';
    private apiUserDetail = 'http://localhost:8088/api/v1/users/details';
    private apiConfig = {
        headers: this.createHeader()
    }
    private localStorage?: Storage;
    private readonly USER_KEY = 'user_details'
    constructor(
        private http: HttpClient,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.localStorage = this.document.defaultView?.localStorage;
    }

    private createHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept-Language': 'vi',
        });
    }

    register(registerDTO: RegisterDTO): Observable<any> {
        return this.http.post<any>(this.apiRegister, registerDTO, this.apiConfig);
    }


    login(loginDTO: LoginDTO): Observable<any> {
        return this.http.post<any>(this.apiLogin, loginDTO, this.apiConfig)
    }

    getUserDetail(token: String): Observable<any> {
        return this.http.post<any>(this.apiUserDetail, null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            })
        });
    }

    setUser(userDetail: UserDetailResponse) {
        this.localStorage?.setItem(this.USER_KEY, JSON.stringify(userDetail));
    }

    getUserDetailFromLocalStorage(): UserDetailResponse | null {
        const user = this.localStorage?.getItem(this.USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    logOut() {
        this.localStorage?.removeItem(this.USER_KEY);
    }

    updateUserDetail(updatedUserDetailData: UpdatedUserDto, userId: number, token:String): Observable<any> {
        return this.http.put<any>(`${this.apiUserDetail}/`+`${userId}`, updatedUserDetailData, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            })
        })
    }}
