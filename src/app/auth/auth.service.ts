import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from './model/auth-response.model';
import { Topic } from './model/topic.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public hasToken = false;

    public authToken = '';

    private baseUrl = 'https://kong.tls.ai/bt/api/login';

    constructor(private readonly http: HttpClient) {}

    public login(): void {
        const  username = 'AnyVisionAdmin';
        const  password = 'AVpa$$word!';
        this.http
            .post<AuthResponse>(`${this.baseUrl}`, { username , password})
            .subscribe((authResponse: AuthResponse) => {
                this.hasToken = true;
                this.authToken = authResponse.token;
            });
    }
}
