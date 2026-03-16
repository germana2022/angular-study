import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../../core/models/topic.model';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="topic-card" [routerLink]="['/topic', topic.slug]">
      <div class="card-icon">
        <mat-icon>{{ topic.icon }}</mat-icon>
      </div>
      <mat-card-content>
        <h3>{{ topic.title }}</h3>
        <p>{{ topic.summary }}</p>
      </mat-card-content>
      <div class="card-footer">
        @if (topic.hasDemo) {
          <span class="demo-badge">
            <mat-icon>play_circle</mat-icon>
            Demo
          </span>
        }
      </div>
    </mat-card>
  `,
  styles: [`
    .topic-card {
      cursor: pointer;
      transition: all 0.3s ease;
      background: var(--surface);
      border: 1px solid var(--border);
      height: 100%;
      
      &:hover {
        transform: translateY(-4px);
        border-color: var(--primary);
        box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
        
        .card-icon {
          background: var(--primary);
          color: white;
        }
      }
    }

    .card-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      background: var(--surface-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      transition: all 0.3s ease;
      
      mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
        color: var(--primary);
      }
    }

    h3 {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    p {
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .card-footer {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    .demo-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--accent);
      font-weight: 500;
      
      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }
  `]
})
export class TopicCardComponent {
  @Input() topic!: Topic;
}
