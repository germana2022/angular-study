import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { BehaviorSubject, interval } from 'rxjs';

@Component({
  selector: 'app-change-detection-demo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <div class="demo-wrapper">
      <div class="demo-grid">
        <mat-card class="demo-card default">
          <mat-card-header>
            <mat-card-title>Default Strategy</mat-card-title>
            <mat-card-subtitle>Se verifica en cada evento</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="counter-display">
              <span class="counter">{{ defaultCounter }}</span>
              <span class="label">Count</span>
            </div>
            <div class="cd-count">
              <mat-icon>speed</mat-icon>
              CD ejecutados: {{ defaultCDCount }}
            </div>
            <button mat-flat-button color="primary" (click)="incrementDefault()">
              <mat-icon>add</mat-icon>
              Incrementar
            </button>
            <button mat-stroked-button (click)="triggerEventDefault()">
              <mat-icon>touch_app</mat-icon>
              Trigger Event
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card class="demo-card onpush">
          <mat-card-header>
            <mat-card-title>OnPush Strategy</mat-card-title>
            <mat-card-subtitle>Solo cuando cambian las @Input()</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="counter-display">
              <span class="counter">{{ onpushCounter }}</span>
              <span class="label">Count</span>
            </div>
            <div class="cd-count">
              <mat-icon>speed</mat-icon>
              CD ejecutados: {{ onpushCDCount }}
            </div>
            <button mat-flat-button color="accent" (click)="incrementOnpush()">
              <mat-icon>add</mat-icon>
              Incrementar
            </button>
            <button mat-stroked-button (click)="triggerEventOnpush()">
              <mat-icon>touch_app</mat-icon>
              Trigger Event
            </button>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="info-box">
        <mat-icon>info</mat-icon>
        <p><strong>Observación:</strong> Con OnPush, los eventos externos también disparan CD porque vienen del componente mismo. Pero los cambios en datos mutables no se detectan sin marcar para check.</p>
      </div>
    </div>
  `,
  styles: [`
    .demo-wrapper {
      width: 100%;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .demo-card {
      padding: 16px;
      border-radius: 12px;
      background: var(--surface-light);
    }

    .demo-card.default {
      border: 2px solid var(--primary);
    }

    .demo-card.onpush {
      border: 2px solid var(--accent);
    }

    .counter-display {
      text-align: center;
      padding: 24px;
      background: var(--surface);
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .counter {
      display: block;
      font-size: 48px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .cd-count {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: var(--surface);
      border-radius: 8px;
      margin-bottom: 16px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 14px;
      color: var(--text-secondary);

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: var(--warning);
      }
    }

    .demo-card button {
      width: 100%;
      margin-bottom: 8px;
      border-radius: 8px;
    }

    .info-box {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background: rgba(99, 102, 241, 0.1);
      border-radius: 12px;
      margin-top: 24px;
      border: 1px solid var(--primary);

      mat-icon {
        color: var(--primary);
        flex-shrink: 0;
      }

      p {
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        color: var(--text-secondary);
      }
    }

    @media (max-width: 600px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ChangeDetectionDemoComponent {
  defaultCounter = 0;
  onpushCounter = 0;
  defaultCDCount = 0;
  onpushCDCount = 0;

  constructor(private cdr: ChangeDetectorRef) {
    interval(1000).subscribe(() => {
      this.defaultCDCount++;
      this.cdr.detectChanges();
    });
  }

  incrementDefault() {
    this.defaultCounter++;
  }

  incrementOnpush() {
    this.onpushCounter++;
    this.onpushCDCount++;
  }

  triggerEventDefault() {
    this.defaultCDCount++;
  }

  triggerEventOnpush() {
    this.onpushCDCount++;
  }
}
