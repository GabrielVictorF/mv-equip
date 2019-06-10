
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//import { CadastrarPage } from '../cadastrar/cadastrar';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  private user = {
    email: '',
    password: ''
  }
  private image;
  private formValida: FormGroup;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public functions: FunctionsProvider,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder) {
    this.formValida = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });
    this.image =  'https://3.bp.blogspot.com/-L5HsuL73E8M/Wse64xnft8I/AAAAAAAALdE/sEFacd6oj4E6QXUL78HIj9f1pz78N5GxQCLcBGAs/s320/001.JPG'
  }

  //cadastrar() {
  //  this.navCtrl.push(CadastrarPage);
  //}
  logar() {}
  cadastrar(){}

  /*logar() {
    if (this.user.email == '' || this.user.password == '') {
      this.functions.showToast('Email / senha não podem estar vazios!');
    } else {
      let load = this.loadingCtrl.create({
        content: "Logando, por favor aguarde..."
      });
      load.present();
      if (this.user.email.indexOf('@') == -1) { //Caso seja nome de usuário
        this.api.infoUserWhere(this.user.email).subscribe(res => {
          console.log(res);
          if (res.length == 0)
            this.functions.mostraAlert('Erro', 'Email / senha inválidos');
          else {
            this.api.login(res[0].email, this.user.password).subscribe(res => {
              load.dismiss();
             localStorage.setItem("userToken", res["user-token"]); //Token para reqs posteriores
              this.navCtrl.setRoot(TabsPage);
        },
        Error => { //Login
          console.log(Error);
          load.dismiss();
          const message: string = this.functions.filtraErro(Error.error.code);
          this.functions.mostraAlert('Erro', message);
          });
          }
        },
        Error => { //InfoUser
          console.log(Error);
          load.dismiss();
          this.functions.mostraAlert('Erro', 'Usuário incorreto');
        });
      } else {
        this.api.login(this.user.email, this.user.password).subscribe(res => {
          load.dismiss();
         localStorage.setItem("userToken", res["user-token"]); //Token para reqs posteriores
          this.navCtrl.setRoot(TabsPage);
        },
        Error => { // Login
          console.log(Error);
          load.dismiss();
          const message: string = this.functions.filtraErro(Error.error.code);
          this.functions.mostraAlert('Erro', message);
        });
      }
    }
  } */
}
