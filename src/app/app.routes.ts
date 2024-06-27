import { Routes } from '@angular/router';
import { HomeComponent } from './contexts/demo/home/home.component';
import { HomeComponent as HomeGeral } from './contexts/main-app/home/home.component';
import { LoginComponent } from './contexts/demo/login/login.component';
import { DashboardComponent } from './contexts/demo/dashboard/dashboard.component';
import { authGuard } from './contexts/demo/auth.guard';
import { CadastroComponent } from './contexts/demo/cadastro/cadastro.component';
import { MainComponent } from './contexts/demo/main/main.component';
import { CreateJobComponent } from './contexts/demo/create-job/create-job.component';
import { MenuComponent } from './contexts/main-app/menu/menu.component';
import { CardVagaComponent } from './contexts/demo/card-vaga/card-vaga.component';
import { SwaggerComponent } from './contexts/main-app/swagger/swagger.component';
import { TutoriaisComponent } from './contexts/main-app/tutoriais/tutoriais.component';
import { SobreComponent } from './contexts/main-app/sobre/sobre.component';
import { MarkdownTutComponent } from './contexts/main-app/markdown-tut/markdown-tut.component';

export const routes: Routes = [
    { path : '', component: MenuComponent, children: [
        { path: '', component: HomeGeral },
        { path: 'api', component: SwaggerComponent },
        { path: 'tutoriais', component: TutoriaisComponent, children: [
            { path: ':tut', component: MarkdownTutComponent }
        ] },
        { path: 'sobre', component: SobreComponent },
    ] },
    { path: 'demo', component: MainComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'cadastro', component: CadastroComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'anuncio', component: CreateJobComponent },
        { path: 'detalhes', component: CardVagaComponent }
    ]},
//    { path: 'dashboard', component: DashboardComponent, canActivate: [ authGuard ] }
];
