import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
  template: `
    <mat-toolbar class="header">
      <button mat-icon-button (click)="toggleSidebar.emit()" class="menu-btn">
        <mat-icon>menu</mat-icon>
      </button>
      
      <a routerLink="/" class="logo">
        <mat-icon class="logo-icon">school</mat-icon>
        <span class="logo-text">Angular Study</span>
      </a>
      
      <span class="spacer"></span>
      
      <div class="header-actions">
        <a href="https://angular.io" target="_blank" mat-button>
          <mat-icon>open_in_new</mat-icon>
          Angular Docs
        </a>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 64px;
    }

    .menu-btn {
      margin-right: 16px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-primary);
    }

    .logo-icon {
      color: var(--primary);
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .logo-text {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .spacer {
      flex: 1;
    }

    .header-actions a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      text-decoration: none;
      
      &:hover {
        color: var(--primary);
      }
    }
  `]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
}
