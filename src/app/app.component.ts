import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { FunctionsProvider } from '../providers/functions/functions';
import { ApiProvider } from '../providers/api/api';
import * as Sentry from '@sentry/browser';
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
      document.addEventListener('user-feedback', (event_id: CustomEvent) => {
        let options = {
          lang: 'pt-br',
          title: 'Suporte ao usuário',
          subtitle: 'Nos conte o que aconteceu',
          subtitle2: '',
          labelName: 'Seu nome',
          labelEmail: 'Seu e-mail',
          labelComments: 'O que aconteceu?',
          labelClose: 'Fechar',
          labelSubmit: 'Enviar',
          errorGeneric: 'Ocorreu um erro',
          eventId: event_id.detail,
          errorFormEntry: 'Todos os campos precisam ser preenchidos',
          successMessage: 'Seu report foi enviado a equipe de suporte, favor aguardar para o problema ser solucionado.'
        };
        Sentry.showReportDialog(options);
        localStorage.removeItem('user-feedback');
      });
      /*document.addEventListener('user-feedback', (event_id) => {
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
      });*/
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

