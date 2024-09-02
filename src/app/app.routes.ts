import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { iesGuard } from './ies.guard';


export const routes: Routes = [
    { path : '', loadComponent: () => import('./contexts/main-app/menu/menu.component').then(m => m.MenuComponent), children: [
        { path: '', loadComponent: () => import('./contexts/main-app/home/home.component').then(m => m.HomeComponent) },
        { path: 'api', loadComponent: () => import('./contexts/main-app/swagger/swagger.component').then(m => m.SwaggerComponent) },
        { path: 'tutoriais', loadComponent: () => import('./contexts/main-app/tutoriais/tutoriais.component').then(m => m.TutoriaisComponent), children: [
            { path: '', loadComponent: () => import('./contexts/main-app/tutoriais/entrada/entrada.component').then(m => m.EntradaComponent) },
            { path: ':tut', loadComponent: () => import('./contexts/main-app/markdown-tut/markdown-tut.component').then(m => m.MarkdownTutComponent) },
        ] },
        { path: 'sobre', loadComponent: () => import('./contexts/main-app/sobre/sobre.component').then(m => m.SobreComponent) },
        { path: 'recursos', loadComponent: () => import('./contexts/main-app/features/features.component').then(m => m.FeaturesComponent) },
        { path: 'comece-aqui', loadComponent: () => import('./contexts/main-app/comece-aqui/comece-aqui.component').then(m => m.ComeceAquiComponent) },
        { path: 'politica', loadComponent: () => import('./contexts/main-app/politica/politica.component').then(m => m.PoliticaComponent) },
    ] },
    { path: 'demo/login', loadComponent: () => import('./contexts/demo/login/login.component').then(m => m.LoginComponent) },
    { path: 'demo/cadastro', loadComponent: () => import('./contexts/demo/cadastro/cadastro.component').then(m => m.CadastroComponent) },
    { path: 'demo', loadComponent: () => import('./contexts/demo/main/main.component').then(m => m.MainComponent), children: [
        { path: '', loadComponent: () => import('./contexts/demo/home/home.component').then(m => m.HomeComponent) },
        { path: 'vagas/criadas', loadComponent: () => import('./contexts/demo/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [ authGuard ] },
        { path: 'vagas/new', loadComponent: () => import('./contexts/demo/create-job/create-job.component').then(m => m.CreateJobComponent), canActivate: [ authGuard ] },
        { path: 'vagas/recebidas', loadComponent: () => import('./contexts/demo/moderation/moderation.component').then(m => m.ModerationComponent), canActivate: [ authGuard, iesGuard ] },
        { path: 'vagas/aprovadas', loadComponent: () => import('./contexts/demo/disponiveis/disponiveis.component').then(m => m.DisponiveisComponent),canActivate: [authGuard, iesGuard ] },
        { path: 'vagas/:id/edit', loadComponent: () => import('./contexts/demo/create-job/create-job.component').then(m => m.CreateJobComponent), canActivate: [ authGuard ] },
        { path: 'vagas/:id', loadComponent: () => import('./contexts/demo/card-vaga/card-vaga.component').then(m => m.CardVagaComponent), canActivate: [ authGuard ] },
        {path: 'teste', loadComponent: () => import('./contexts/demo/teste/teste.component').then(m => m.TesteComponent), canActivate: [authGuard]},
        { path: '**', loadComponent: () => import('./contexts/not-found/not-found.component').then(m => m.NotFoundComponent) },
    ]},
    { path : '', loadComponent: () => import('./contexts/main-app/menu/menu.component').then(m => m.MenuComponent), children: [
        // { path: '', loadComponent: () => import('./contexts/main-app/home/home.component').then(m => m.HomeComponent) },
        { path: '**', loadComponent: () => import('./contexts/not-found/not-found.component').then(m => m.NotFoundComponent) },
    ]},
];
