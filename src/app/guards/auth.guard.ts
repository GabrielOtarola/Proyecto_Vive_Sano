import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.storage.get('session_user');
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login1']);
      return false;
    }
  }
}