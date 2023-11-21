import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwthelper: JwtHelperService) { }

  idendtityCheck()
  {
    const token :String = localStorage.getItem("accessToken");

  //const decodeToken =jwthelper.decodeToken(token.toString());
  //const expireDate: Date = jwthelper.getTokenExpirationDate(token.toString());
  let expiredToken: boolean ;
  try {
    expiredToken = this.jwthelper.isTokenExpired(token.toString());
  } catch {
    expiredToken = true;
  }
 if(token !=null && expiredToken){
  _isAuthenticated=true;
 }
  _isAuthenticated = false;

  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;