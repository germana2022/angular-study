import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="hero-content">
          <h1>Domina <span class="highlight">Angular</span></h1>
          <p>Aprende Angular con ejemplos prácticos y demos interactivos.</p>
          <a mat-flat-button color="primary" routerLink="/topic/angular-ivy">
            Comenzar
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container { max-width: 1200px; margin: 0 auto; padding: 48px 0; }
    .hero { text-align: center; min-height: 60vh; display: flex; align-items: center; justify-content: center; }
    h1 { font-size: 56px; margin-bottom: 16px; }
    .highlight { color: #6366f1; }
    p { font-size: 18px; color: #94a3b8; margin-bottom: 32px; }
  `]
})
export class HomeComponent {}
