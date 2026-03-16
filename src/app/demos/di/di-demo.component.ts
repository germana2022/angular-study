import { Component, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';

export const API_URL = 'API_URL';
export const CONFIG_TOKEN = 'CONFIG';

@Injectable({ providedIn: 'root' })
export class DataService {
  private counter = 0;
  
  getData(): Observable<string[]> {
    this.counter++;
    return of(['Item A', 'Item B', 'Item C', `Fetch #${this.counter}`]);
  }
  
  getCounter(): number {
    return this.counter;
  }
}

@Injectable()
export class MockService {
  getData(): string[] {
    return ['Mock A', 'Mock B', 'Mock C'];
  }
}

@Component({
  selector: 'app-di-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule
  ],
  template: `
    <div class="demo-wrapper">
      <mat-tab-group>
        <mat-tab label="Basic DI">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Inyección de Servicios</mat-card-title>
                <mat-card-subtitle>Servicio singleton compartido</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="di-visual">
                  <div class="service-box">
                    <mat-icon>settings</mat-icon>
                    <span>DataService</span>
                    <span class="singleton">(Singleton)</span>
                  </div>
                  <div class="arrow">→</div>
                  <div class="component-box">
                    <mat-icon>view_component</mat-icon>
                    <span>Componente A</span>
                  </div>
                  <div class="component-box">
                    <mat-icon>view_component</mat-icon>
                    <span>Componente B</span>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="instance-counter">
                  <div class="counter-box">
                    <button mat-flat-button color="primary" (click)="fetchData()">
                      <mat-icon>refresh</mat-icon>
                      Obtener Datos
                    </button>
                    <span class="count">Llamadas: {{ callCount }}</span>
                  </div>
                </div>

                <div class="output-box">
                  <strong>Datos:</strong>
                  @for (item of dataItems; track item) {
                    <span class="item">{{ item }}</span>
                  }
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Token Injection">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Inyección por Token</mat-card-title>
                <mat-card-subtitle>UseValue, UseClass, UseFactory</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="token-examples">
                  <div class="token-item">
                    <h4>useValue</h4>
                    <code>provide(API_URL, useValue: 'https://api.com')</code>
                    <p>Inyecta un valor directo</p>
                    <div class="result">Inyectado: {{ apiUrl }}</div>
                  </div>

                  <div class="token-item">
                    <h4>useClass</h4>
                    <code>provide(HttpClient, useClass: CustomHttp)</code>
                    <p>Usa una clase diferente</p>
                  </div>

                  <div class="token-item">
                    <h4>useFactory</h4>
                    <code>provide(Config, useFactory: () => new Config())</code>
                    <p>Factory function</p>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
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

    .demo-card {
      border-radius: 12px;
    }

    .di-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 24px;
      background: var(--background);
      border-radius: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .service-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      background: var(--primary);
      color: white;
      border-radius: 12px;

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
      }

      .singleton {
        font-size: 11px;
        opacity: 0.8;
      }
    }

    .component-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px 24px;
      background: var(--surface);
      border-radius: 12px;
      border: 2px solid var(--border);

      mat-icon {
        color: var(--accent);
      }
    }

    .arrow {
      font-size: 24px;
      color: var(--text-secondary);
    }

    .instance-counter {
      padding: 16px 0;
    }

    .counter-box {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .count {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .output-box {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      padding: 16px;
      background: var(--background);
      border-radius: 8px;

      strong {
        width: 100%;
        margin-bottom: 8px;
        color: var(--text-secondary);
      }

      .item {
        padding: 6px 12px;
        background: var(--surface);
        border-radius: 6px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 13px;
        color: var(--accent);
      }
    }

    .token-examples {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .token-item {
      padding: 20px;
      background: var(--background);
      border-radius: 12px;

      h4 {
        margin: 0 0 12px;
        font-size: 16px;
        color: var(--primary);
      }

      code {
        display: block;
        margin-bottom: 8px;
        padding: 8px 12px;
        background: var(--surface);
        border-radius: 6px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: var(--text-primary);
      }

      p {
        margin: 0 0 12px;
        font-size: 13px;
        color: var(--text-secondary);
      }

      .result {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 14px;
        color: var(--accent);
      }
    }
  `]
})
export class DiDemoComponent {
  callCount = 0;
  dataItems: string[] = [];
  apiUrl = 'https://api.example.com';

  constructor(private dataService: DataService) {}

  fetchData() {
    this.dataService.getData().subscribe(data => {
      this.dataItems = data;
      this.callCount = this.dataService.getCounter();
    });
  }
}
