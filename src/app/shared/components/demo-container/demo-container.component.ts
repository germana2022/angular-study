import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-demo-container',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <mat-icon class="demo-icon">play_circle</mat-icon>
        <h3>Demo Interactivo</h3>
      </div>
      
      <mat-tab-group class="demo-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>code</mat-icon>
            Código
          </ng-template>
          <div class="tab-content">
            <ng-content select="[demo-code]"></ng-content>
          </div>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>visibility</mat-icon>
            Vista Previa
          </ng-template>
          <div class="tab-content preview">
            <ng-content select="[demo-preview]"></ng-content>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .demo-container {
      background: var(--surface);
      border-radius: 16px;
      overflow: hidden;
      margin: 32px 0;
      border: 1px solid var(--border);
    }

    .demo-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1));
      border-bottom: 1px solid var(--border);
    }

    .demo-icon {
      color: var(--accent);
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .demo-tabs {
      ::ng-deep .mat-mdc-tab-header {
        background: var(--surface-light);
      }

      ::ng-deep .mat-mdc-tab-labels {
        justify-content: center;
      }
    }

    .tab-content {
      padding: 24px;
      min-height: 200px;
    }

    .tab-content.preview {
      background: var(--background);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class DemoContainerComponent {
  @Input() title = 'Demo';
}
