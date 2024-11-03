import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importar el AuthGuard

const routes: Routes = [
  { 
    path: '',  // Ruta raíz
    redirectTo: 'login1',  // Redirige a la página de login al cargar la app
    pathMatch: 'full'
  },
  {
    path: 'home',  // Página principal
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'login1',  // Página de login
    loadChildren: () => import('./login1/login1.module').then(m => m.Login1PageModule)
  },
  {
    path: 'recuperar-contrasena',  // Página de recuperación de contraseña
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'registrar1',  // Página de registro
    loadChildren: () => import('./registrar1/registrar1.module').then(m => m.Registrar1PageModule)
  },
  {
    path: 'rutina-ejercicios',  // Página para ver las rutinas de ejercicios
    loadChildren: () => import('./rutina-ejercicios/rutina-ejercicios.module').then(m => m.RutinaEjerciciosPageModule),
    
  },
  {
    path: 'recetas',  // Página de recetas
    loadChildren: () => import('./recetas/recetas.module').then(m => m.RecetasPageModule),
    
  },
  // CRUD de Recetas
  {
    path: 'crud-recetas',
    loadChildren: () => import('./crud-recetas/crud-recetas.module').then(m => m.CrudRecetasPageModule),
    
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}