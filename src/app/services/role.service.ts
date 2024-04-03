import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Role } from "../models/role";

@Injectable({
    providedIn: 'root'
})

export class RoleService {
    private apiRoles = 'http://localhost:8088/api/v1/roles';
    constructor(private http: HttpClient){}
    getRoles(): Observable<any[]> {
        return this.http.get<any[]>(this.apiRoles)
    }
}