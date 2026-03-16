import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIconModule, HeaderComponent, SidebarComponent],
  template: `
    <app-header (toggleSidebar)="drawer.toggle()"></app-header>
    
    <mat-sidenav-container class="container">
      <mat-sidenav #drawer mode="side" opened class="sidebar">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      
      <mat-sidenav-content class="content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .container {
      height: calc(100vh - 64px);
      margin-top: 64px;
    }

    .sidebar {
      width: 280px;
      border: none;
      background: var(--surface);
    }

    .content {
      background: var(--background);
      padding: 32px;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 260px;
      }
      
      .content {
        padding: 16px;
      }
    }
  `]
})
export class MainLayoutComponent {}
