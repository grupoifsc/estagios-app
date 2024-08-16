import { Routes } from '@angular/router';
import { HomeComponent as HomeGeral } from './contexts/main-app/home/home.component';
import { LoginComponent } from './contexts/demo/login/login.component';
import { DashboardComponent } from './contexts/demo/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { CadastroComponent } from './contexts/demo/cadastro/cadastro.component';
import { MainComponent } from './contexts/demo/main/main.component';
import { CreateJobComponent } from './contexts/demo/create-job/create-job.component';
import { MenuComponent } from './contexts/main-app/menu/menu.component';
import { CardVagaComponent } from './contexts/demo/card-vaga/card-vaga.component';
import { SwaggerComponent } from './contexts/main-app/swagger/swagger.component';
import { TutoriaisComponent } from './contexts/main-app/tutoriais/tutoriais.component';
import { SobreComponent } from './contexts/main-app/sobre/sobre.component';
import { MarkdownTutComponent } from './contexts/main-app/markdown-tut/markdown-tut.component';
import { iesGuard } from './ies.guard';
import { ModerationComponent } from './contexts/demo/moderation/moderation.component';
import { NotFoundComponent } from './contexts/not-found/not-found.component';

export const routes: Routes = [
    { path : '', component: MenuComponent, children: [
        { path: '', component: HomeGeral },
        { path: 'api', component: SwaggerComponent },
        { path: 'tutoriais', component: TutoriaisComponent, children: [
            { path: ':tut', component: MarkdownTutComponent }
        ] },
        { path: 'sobre', component: SobreComponent },
    ] },
    { path: 'demo/login', component: LoginComponent },
    { path: 'demo/cadastro', component: CadastroComponent },
    { path: 'demo', component: MainComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent, canActivate: [ authGuard ] },
        { path: 'anuncio', component: CreateJobComponent, canActivate: [ authGuard ] },
        { path: 'vagas/:id/edit', component: CreateJobComponent, canActivate: [ authGuard ] },
        { path: 'vagas/:id', component: CardVagaComponent, canActivate: [ authGuard ] },
        { path: 'moderacao/rejeitadas', component: ModerationComponent, canActivate: [ authGuard, iesGuard ], data: {view: 'rejected'} },
        { path: 'moderacao/aprovadas', component: ModerationComponent, canActivate: [ authGuard, iesGuard ], data: {view: 'accepted'} },
        { path: 'moderacao/pendentes', component: ModerationComponent, canActivate: [ authGuard, iesGuard ], data: {view: 'pending'} },
        { path: '**', component: NotFoundComponent },
    ]},
    { path : '', component: MenuComponent, children: [
        { path: '', component: HomeGeral },
        { path: '**', component: NotFoundComponent },
    ]},
];
