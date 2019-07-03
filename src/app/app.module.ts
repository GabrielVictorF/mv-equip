import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
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

import { ApiProvider } from '../providers/api/api';
import { FunctionsProvider } from '../providers/functions/functions';

import { MenuComponent } from '../components/menu/menu';

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
    MenuComponent
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
    CadastroUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FunctionsProvider
  ]
})
export class AppModule {}
