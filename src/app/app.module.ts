import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Profile } from '../pages/home/home';
import { SolicitanteResponsavel } from '../pages/nova-movimentacao/nova-movimentacao';
import { NovaMovimentacaoPage } from '../pages/nova-movimentacao/nova-movimentacao';
import { MovimentacoesPage } from '../pages/movimentacoes/movimentacoes';
import { EquipamentosPage } from '../pages/equipamentos/equipamentos';
import { NovoEquipamentoPage } from '../pages/novo-equipamento/novo-equipamento';
import { DetalhePage } from '../pages/detalhe/detalhe';
import { LoginPage } from '../pages/login/login';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';
import { EditarPage } from '../pages/editar/editar';
import { RelatoriosPage } from '../pages/relatorios/relatorios';
import { CadastroEquipamentoPage } from '../pages/cadastro-equipamento/cadastro-equipamento';

import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';

import { File } from '@ionic-native/file';  

import { MenuComponent } from '../components/menu/menu';
//import * as Sentry from 'sentry-cordova';
import * as Sentry from '@sentry/browser';
import { ExpressProvider } from '../providers/express/express';

Sentry.init({ 
  dsn: 'https://52f83d3d624a423189109d4a867dc15b@sentry.io/1515195' ,
  beforeSend(event, hint) {
    console.log(event)
    console.log(hint)
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        localStorage.setItem('sentry-error-ev-id', event.event_id);
        //var evento = new CustomEvent('sentry-report', {'detail': event.event_id});
        //document.dispatchEvent(evento);  
        //console.log("Erro enviado ao Sentry");
      }
      return event;
    }
  })

//Sentry.captureException(new Error('Testando'));

export class SentryIonicErrorHandler extends IonicErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      //const eventId = Sentry.captureException(error.originalError || error);
      //let sentry = Sentry.showReportDialog({ eventId });
    } catch (e) {
      console.error(e);
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Profile, //MODAL
    SolicitanteResponsavel, //MODAL
    NovaMovimentacaoPage,
    MovimentacoesPage,
    EquipamentosPage,
    NovoEquipamentoPage,
    DetalhePage,
    LoginPage,
    UsuariosPage,
    CadastroUsuarioPage,
    MenuComponent,
    EditarPage,
    RelatoriosPage,
    CadastroEquipamentoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Profile, //MODAL
    SolicitanteResponsavel, //MODAL
    NovaMovimentacaoPage,
    MovimentacoesPage,
    EquipamentosPage,
    NovoEquipamentoPage,
    DetalhePage,
    LoginPage,
    UsuariosPage,
    CadastroUsuarioPage,
    EditarPage,
    RelatoriosPage,
    CadastroEquipamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    //{provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ErrorHandler, useClass: SentryIonicErrorHandler},
    ApiProvider,
    FunctionsProvider,
    ExpressProvider
  ]
})
export class AppModule{}

