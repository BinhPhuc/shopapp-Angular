import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';

import { authGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';
import { OrderAdminComponent } from './components/admin/orders/order.admin.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'order', component: OrderComponent, canActivate: [authGuard]},
    { path: 'order-confirm/:orderId', component: OrderConfirmComponent },
    { path: 'product/:categoryName/:id/:productName', component: DetailProductComponent },
    { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
    {path: 'admin', component: AdminComponent, canActivate: [adminGuard]},
    {path: 'admin/orders', component: OrderAdminComponent, canActivate: [adminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
