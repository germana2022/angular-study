import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Subject, Observable, BehaviorSubject, ReplaySubject, from, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

@Component({
  selector: 'app-observables-demo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule],
  template: `
    <div class="demo-wrapper">
      <mat-tab-group>
        <mat-tab label="Observable vs Promise">
          <div class="tab-content">
            <div class="demo-grid">
              <mat-card class="demo-card">
                <mat-card-header>
                  <mat-card-title>Observable</mat-card-title>
                  <mat-card-subtitle>Múltiples valores over time</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="output-box">
                    @for (v of observableValues; track v) {
                      <span class="value">{{ v }}</span>
                    }
                  </div>
                  <button mat-flat-button color="primary" (click)="runObservable()">
                    <mat-icon>play_arrow</mat-icon>
                    Ejecutar Observable
                  </button>
                </mat-card-content>
              </mat-card>

              <mat-card class="demo-card">
                <mat-card-header>
                  <mat-card-title>Promise</mat-card-title>
                  <mat-card-subtitle>Un solo valor</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="output-box">
                    <span class="value">{{ promiseValue || '---' }}</span>
                  </div>
                  <button mat-flat-button color="accent" (click)="runPromise()">
                    <mat-icon>play_arrow</mat-icon>
                    Ejecutar Promise
                  </button>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Subject vs BehaviorSubject">
          <div class="tab-content">
            <div class="demo-grid">
              <mat-card class="demo-card">
                <mat-card-header>
                  <mat-card-title>Subject</mat-card-title>
                  <mat-card-subtitle>Sin valor inicial</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="output-box">
                    <div class="sub-output">
                      <span class="label">Suscriptor A:</span>
                      <span class="value">{{ subjectA }}</span>
                    </div>
                    <div class="sub-output">
                      <span class="label">Suscriptor B:</span>
                      <span class="value">{{ subjectB }}</span>
                    </div>
                  </div>
                  <button mat-flat-button color="primary" (click)="emitSubject()">
                    <mat-icon>send</mat-icon>
                    Emitir Valor
                  </button>
                </mat-card-content>
              </mat-card>

              <mat-card class="demo-card">
                <mat-card-header>
                  <mat-card-title>BehaviorSubject</mat-card-title>
                  <mat-card-subtitle>Con valor inicial</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="output-box">
                    <div class="sub-output">
                      <span class="label">Suscriptor A:</span>
                      <span class="value">{{ behaviorA }}</span>
                    </div>
                    <div class="sub-output">
                      <span class="label">Suscriptor B:</span>
                      <span class="value">{{ behaviorB }}</span>
                    </div>
                  </div>
                  <button mat-flat-button color="accent" (click)="emitBehavior()">
                    <mat-icon>send</mat-icon>
                    Emitir Valor
                  </button>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .demo-wrapper {
      width: 100%;
    }

    .tab-content {
      padding: 24px 0;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .demo-card {
      border-radius: 12px;
    }

    .output-box {
      background: var(--background);
      border-radius: 8px;
      padding: 16px;
      min-height: 80px;
      margin-bottom: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .sub-output {
      display: flex;
      gap: 12px;
      width: 100%;
      padding: 8px;
      background: var(--surface);
      border-radius: 6px;
    }

    .value {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 18px;
      font-weight: 600;
      color: var(--primary);
    }

    .label {
      color: var(--text-secondary);
      font-size: 14px;
    }

    .demo-card button {
      width: 100%;
      border-radius: 8px;
    }

    @media (max-width: 600px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ObservablesDemoComponent implements OnInit, OnDestroy {
  observableValues: number[] = [];
  promiseValue: number | null = null;
  
  subjectA = '---';
  subjectB = '---';
  behaviorA = '---';
  behaviorB = '---';

  private subject = new Subject<number>();
  private behaviorSubject = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.subject.subscribe(v => {
      this.subjectA = v.toString();
      this.subjectB = v.toString();
    });

    this.behaviorSubject.subscribe(v => {
      this.behaviorA = v.toString();
    });

    setTimeout(() => {
      this.behaviorSubject.subscribe(v => {
        this.behaviorB = v.toString();
      });
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  runObservable() {
    this.observableValues = [];
    const obs$ = new Observable<number>(subscriber => {
      subscriber.next(1);
      setTimeout(() => subscriber.next(2), 500);
      setTimeout(() => subscriber.next(3), 1000);
      setTimeout(() => subscriber.complete(), 1500);
    });

    obs$.subscribe(v => {
      this.observableValues = [...this.observableValues, v];
    });
  }

  runPromise() {
    this.promiseValue = null;
    const promise = new Promise<number>(resolve => {
      setTimeout(() => resolve(42), 1000);
    });

    promise.then(v => this.promiseValue = v);
  }

  emitSubject() {
    this.subject.next(Math.floor(Math.random() * 100));
  }

  emitBehavior() {
    this.behaviorSubject.next(Math.floor(Math.random() * 100));
  }
}
