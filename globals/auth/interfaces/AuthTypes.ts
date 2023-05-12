import {DynamicObject} from "../../../constants/DynamicObject";

export interface AuthMap {
    currentSection: "register" | "login"
    statusMessage: string
    isLoggingIn: boolean,
    isLoggedIn: boolean,
    modalShow: boolean,
    userData: DynamicObject,
}

export interface AuthBody {
    email: string
    password: string
    keepMeSignedIn: boolean
}

export interface RegisterBody {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    confirmPassword: string,
    promoCode?: string
}