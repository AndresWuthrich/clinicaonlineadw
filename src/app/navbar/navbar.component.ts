import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email: string = '';
  password: string = '';
  // mensaje: Mensaje = new Mensaje();
  
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  // constructor(private router: Router,
  //   public auth: AuthService,
  //   private mensajesService: MensajesService) { }

  constructor(public auth: AuthService) { }
  
  ngOnInit(): void {
  }
  
  Logout(){
    this.auth.Logout();
  }
}
