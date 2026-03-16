import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { TopicService } from '../../core/services/topic.service';
import { TopicCategory } from '../../core/models/topic.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatExpansionModule, MatBadgeModule],
  template: `
    <div class="sidebar-container">
      <div class="sidebar-header">
        <mat-icon class="menu-icon">view_module</mat-icon>
        <span>Tópicos</span>
      </div>
      
      <mat-accordion class="topics-accordion" multi>
        @for (category of categories; track category.name) {
          <mat-expansion-panel class="category-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon class="category-icon">{{ category.icon }}</mat-icon>
                {{ category.name }}
              </mat-panel-title>
              <mat-panel-description>
                {{ category.topics.length }} topics
              </mat-panel-description>
            </mat-expansion-panel-header>
            
            <mat-nav-list class="topic-list">
              @for (topic of category.topics; track topic.id) {
                <a mat-list-item 
                   [routerLink]="['/topic', topic.slug]"
                   routerLinkActive="active"
                   class="topic-item">
                  <mat-icon matListItemIcon class="topic-icon">{{ topic.icon }}</mat-icon>
                  <span matListItemTitle>{{ topic.title }}</span>
                  @if (topic.hasDemo) {
                    <mat-icon matListItemMeta class="demo-badge">play_circle</mat-icon>
                  }
                </a>
              }
            </mat-nav-list>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </div>
  `,
  styles: [`
    .sidebar-container {
      height: 100%;
      background: var(--surface);
      border-right: 1px solid var(--border);
      overflow-y: auto;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border);
    }

    .menu-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .topics-accordion {
      padding: 8px;
    }

    .category-panel {
      background: transparent !important;
      box-shadow: none !important;
      margin-bottom: 4px;
      
      &::before {
        display: none;
      }
    }

    ::ng-deep .mat-expansion-panel-header {
      padding: 0 16px !important;
      height: 48px !important;
      font-size: 14px;
    }

    ::ng-deep .mat-expansion-panel-body {
      padding: 0 !important;
    }

    .category-icon {
      margin-right: 12px;
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: var(--primary);
    }

    .topic-list {
      padding: 0 !important;
    }

    .topic-item {
      border-radius: 8px !important;
      margin: 2px 0 !important;
      padding: 0 16px 0 24px !important;
      height: 40px !important;
      color: var(--text-secondary) !important;
      transition: all 0.2s ease;
      
      &:hover {
        background: var(--surface-light) !important;
        color: var(--text-primary) !important;
      }
      
      &.active {
        background: rgba(99, 102, 241, 0.15) !important;
        color: var(--primary-light) !important;
        border-left: 3px solid var(--primary);
        
        .topic-icon {
          color: var(--primary);
        }
      }
    }

    .topic-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      margin-right: 12px !important;
      color: var(--text-secondary);
    }

    .demo-badge {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--accent);
    }
  `]
})
export class SidebarComponent implements OnInit {
  categories: TopicCategory[] = [];

  constructor(
    private topicService: TopicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topicService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }
}
