import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  { 
    path: '',  
    component: SplashScreenComponent,  
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then(m => m.Login1PageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'registrar1',
    loadChildren: () => import('./registrar1/registrar1.module').then(m => m.Registrar1PageModule)
  },
  {
    path: 'rutina-ejercicios',
    loadChildren: () => import('./rutina-ejercicios/rutina-ejercicios.module').then(m => m.RutinaEjerciciosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then(m => m.RecetasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crud-recetas',
    loadChildren: () => import('./crud-recetas/crud-recetas.module').then(m => m.CrudRecetasPageModule),
    canActivate: [AuthGuard]  
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
