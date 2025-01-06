import { Injectable } from "@angular/core";
import { Selector, State, StateContext, Action } from "@ngxs/store";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";

export interface AuthStateModel {
    isAuthenticated: boolean;
    token: string | null;
}

export class Login {
    static readonly type = '[Auth] Login'
    constructor(public payload: { username: string; password: string }) { }
}
export class Logout { }


@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isAuthenticated: false,
        token: null
    }
})

@Injectable()
export class AuthState {

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        console.log("I'm getting called: ", state.isAuthenticated)
        return state.isAuthenticated;
    }

    @Selector()
    static getToken(state: AuthStateModel): string | null {
        return state.token
    }

    constructor(private authService: AuthService) { }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.login(action.payload).pipe(
            tap((response: { token: string }) => {
                ctx.patchState({
                    token: response.token,
                    isAuthenticated: true
                })
            })
        )
    }
}
