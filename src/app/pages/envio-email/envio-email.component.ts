import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-envio-email',
  templateUrl: './envio-email.component.html',
  styleUrls: ['./envio-email.component.css'],
  providers: [AuthService]
})
export class EnvioEmailComponent implements OnInit {

  public user: Observable<any> = this.auth.fireStoreAuth.user;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  enviarEmail(): void {
    this.auth.sendVerificationEmail();
    console.log('enviar');
  }
}
