import { NgModule } from '@angular/core';
// NAVIGATION
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
// CARD
import { MatCardModule } from '@angular/material/card';
// FormField
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
