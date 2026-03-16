import { Component, OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-child-counter',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="child-display">
      <div class="counter-display">
        <span class="counter">{{ value }}</span>
        <span class="label">Child (Input)</span>
      </div>
    </div>
  `,
  styles: [`
    .child-display {
      padding: 16px;
      background: var(--surface);
      border-radius: 12px;
      border: 2px solid var(--accent);
    }
    .counter-display {
      text-align: center;
    }
    .counter {
      display: block;
      font-size: 36px;
      font-weight: 700;
      color: var(--accent);
    }
    .label {
      font-size: 12px;
      color: var(--text-secondary);
    }
  `]
})
export class ChildCounterComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() value = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterViewInit() {}

  ngAfterViewChecked() {}

  ngOnDestroy() {}
}

@Component({
  selector: 'app-lifecycle-hooks-demo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, ChildCounterComponent],
  template: `
    <div class="demo-wrapper">
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>Lifecycle Hooks Demo</mat-card-title>
          <mat-card-subtitle>Observa el orden de ejecución</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="controls">
            <button mat-flat-button color="primary" (click)="increment()">
              <mat-icon>add</mat-icon>
              Incrementar
            </button>
            <button mat-stroked-button (click)="toggleChild()">
              {{ showChild ? 'Ocultar' : 'Mostrar' }} Child
            </button>
            <button mat-stroked-button color="warn" (click)="clearLog()">
              <mat-icon>delete</mat-icon>
              Limpiar
            </button>
          </div>

          <div class="content-area">
            <div class="parent">
              <div class="counter-display">
                <span class="counter">{{ counter }}</span>
                <span class="label">Parent Counter</span>
              </div>

              @if (showChild) {
                <app-child-counter [value]="counter"></app-child-counter>
              }
            </div>
          </div>

          <div class="log-container">
            <h4>Hook Execution Log:</h4>
            <div class="log-entries">
              @for (entry of logEntries; track entry.id) {
                <div class="log-entry" [class]="entry.type">
                  <span class="time">{{ entry.time }}</span>
                  <span class="hook">{{ entry.hook }}</span>
                </div>
              }
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .demo-wrapper {
      width: 100%;
    }

    .demo-card {
      border-radius: 12px;
    }

    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .controls button {
      border-radius: 8px;
    }

    .content-area {
      background: var(--background);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .parent {
      display: flex;
      gap: 24px;
      align-items: center;
      flex-wrap: wrap;
    }

    .counter-display {
      text-align: center;
      padding: 20px 32px;
      background: var(--surface);
      border-radius: 12px;
      border: 2px solid var(--primary);
    }

    .counter {
      display: block;
      font-size: 36px;
      font-weight: 700;
      color: var(--primary);
    }

    .label {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .log-container {
      background: var(--surface);
      border-radius: 12px;
      padding: 16px;
    }

    .log-container h4 {
      margin: 0 0 12px;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .log-entries {
      max-height: 200px;
      overflow-y: auto;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12px;
    }

    .log-entry {
      display: flex;
      gap: 12px;
      padding: 6px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
    }

    .time {
      color: var(--text-secondary);
    }

    .hook {
      color: var(--text-primary);
      font-weight: 500;
    }
  `]
})
export class LifecycleHooksDemoComponent implements OnInit, OnDestroy {
  counter = 0;
  showChild = true;
  logEntries: { id: number; hook: string; time: string; type: string }[] = [];
  private idCounter = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.log('ngOnInit', 'ngOnInit');
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.log('ngOnDestroy', 'ngOnDestroy');
  }

  increment() {
    this.counter++;
    this.log('ngDoCheck (click)', 'ngDoCheck');
    this.cdr.detectChanges();
  }

  toggleChild() {
    this.showChild = !this.showChild;
    this.log('ngDoCheck (toggle)', 'ngDoCheck');
    this.cdr.detectChanges();
  }

  clearLog() {
    this.logEntries = [];
  }

  private log(hook: string, type: string) {
    const now = new Date();
    this.logEntries.push({
      id: this.idCounter++,
      hook,
      time: now.toLocaleTimeString(),
      type
    });
    if (this.logEntries.length > 20) {
      this.logEntries = this.logEntries.slice(-20);
    }
  }
}
