import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { FunctionsProvider } from '../providers/functions/functions';
import { ApiProvider } from '../providers/api/api';
//declare var Sentry: any;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public functions: FunctionsProvider, public alertCtrl: AlertController,
    public api: ApiProvider) {
    platform.ready().then(() => {
      document.addEventListener('user-feedback', (event_id) => {
        let alert = this.alertCtrl.create({
          title: 'Suporte ao usuário',
          inputs:[{
            name: 'mensagem',
            placeholder: 'Enter a feedback please'
          }],
          buttons: [{
            text: 'OK',
            handler: (data) => {
              let body = {
                'comments': data.mensagem,
                'event_id': localStorage.getItem('sentry-error-ev-id'),
                'email': 'gab@email.com',
                'name': 'Gabriel Victor'
              }
              this.api.postSentryFeedback(body).subscribe(res => {
                console.log("RESPOSTA DO SENTRRY:")
                console.log(res)
              }, Error => {
                console.log("Error sentry feedback")
                console.log(Error)
              });
            }
          }]
        }); alert.present();
      });
    //entry.init({ dsn: 'https://52f83d3d624a423189109d4a867dc15b@sentry.io/1515195' });
      if (localStorage.getItem('token'))
        this.rootPage = HomePage;
      else
        this.rootPage = LoginPage;
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

