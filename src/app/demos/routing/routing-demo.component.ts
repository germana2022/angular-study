import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-routing-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatTabsModule
  ],
  template: `
    <div class="demo-wrapper">
      <mat-tab-group>
        <mat-tab label="Route Configuration">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Configuración de Rutas</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="routes-visual">
                  <div class="route-item">
                    <span class="path">/home</span>
                    <span class="component">HomeComponent</span>
                    <span class="tag">default</span>
                  </div>
                  <div class="route-item">
                    <span class="path">/about</span>
                    <span class="component">AboutComponent</span>
                  </div>
                  <div class="route-item">
                    <span class="path">/users/:id</span>
                    <span class="component">UserDetailComponent</span>
                    <span class="tag">params</span>
                  </div>
                  <div class="route-item">
                    <span class="path">/admin</span>
                    <span class="component">AdminModule</span>
                    <span class="tag guard">canActivate</span>
                  </div>
                  <div class="route-item">
                    <span class="path">/profile</span>
                    <span class="component">ProfileComponent</span>
                    <span class="tag resolver">resolve</span>
                  </div>
                  <div class="route-item">
                    <span class="path">**</span>
                    <span class="component">NotFoundComponent</span>
                    <span class="tag error">wildcard</span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Route Guards">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Tipos de Guards</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="guards-grid">
                  <div class="guard-type">
                    <mat-icon>play_arrow</mat-icon>
                    <h4>CanActivate</h4>
                    <p>¿Puede acceder a la ruta?</p>
                    <code>canActivate(): boolean</code>
                  </div>
                  <div class="guard-type">
                    <mat-icon>child_care</mat-icon>
                    <h4>CanActivateChild</h4>
                    <p>¿Puede acceder a rutas hijo?</p>
                    <code>canActivateChild(): boolean</code>
                  </div>
                  <div class="guard-type">
                    <mat-icon>exit_to_app</mat-icon>
                    <h4>CanDeactivate</h4>
                    <p>¿Puede salir de la ruta?</p>
                    <code>canDeactivate(): boolean</code>
                  </div>
                  <div class="guard-type">
                    <mat-icon>download</mat-icon>
                    <h4>CanLoad</h4>
                    <p>¿Puede cargar el módulo?</p>
                    <code>canLoad(): boolean</code>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Resolver">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Resolver - Precarga de Datos</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="resolver-flow">
                  <div class="flow-step">
                    <mat-icon>touch_app</mat-icon>
                    <span>Usuario navega a /user/1</span>
                  </div>
                  <div class="arrow">→</div>
                  <div class="flow-step">
                    <mat-icon>hourglass_empty</mat-icon>
                    <span>Resolver ejecuta</span>
                  </div>
                  <div class="arrow">→</div>
                  <div class="flow-step">
                    <mat-icon>check_circle</mat-icon>
                    <span>Datos disponibles</span>
                  </div>
                  <div class="arrow">→</div>
                  <div class="flow-step">
                    <mat-icon>visibility</mat-icon>
                    <span>Componente renderiza</span>
                  </div>
                </div>

                <div class="code-example">
                  <h4>Código:</h4>
                  <pre>
&#64;Injectable({{ '{' }} providedIn: 'root' {{ '}' }})
export class UserResolver implements Resolve&lt;User&gt; {{ '{' }}
  resolve(route: ActivatedRouteSnapshot): Observable&lt;User&gt; {{ '{' }}
    const id = route.paramMap.get('id');
    return this.userService.getUser(id);
  {{ '}' }}
{{ '}' }}

&#123; path: 'user/:id', component: UserComponent, resolve: &#123; user: UserResolver &#125; &#125;
                  </pre>
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

    .routes-visual {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .route-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      background: var(--background);
      border-radius: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 14px;

      .path {
        color: var(--accent);
        font-weight: 600;
        min-width: 150px;
      }

      .component {
        color: var(--text-primary);
        flex: 1;
      }

      .tag {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 4px;
        background: var(--surface-light);
        color: var(--text-secondary);

        &.guard {
          background: rgba(245, 158, 11, 0.2);
          color: var(--warning);
        }

        &.resolver {
          background: rgba(16, 185, 129, 0.2);
          color: var(--accent);
        }

        &.error {
          background: rgba(239, 68, 68, 0.2);
          color: var(--error);
        }
      }
    }

    .guards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .guard-type {
      padding: 20px;
      background: var(--background);
      border-radius: 12px;
      text-align: center;

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: var(--primary);
        margin-bottom: 12px;
      }

      h4 {
        margin: 0 0 8px;
        font-size: 16px;
        color: var(--text-primary);
      }

      p {
        margin: 0 0 12px;
        font-size: 13px;
        color: var(--text-secondary);
      }

      code {
        font-size: 12px;
        color: var(--accent);
        background: var(--surface);
        padding: 4px 8px;
        border-radius: 4px;
      }
    }

    .resolver-flow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .flow-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: var(--background);
      border-radius: 12px;
      text-align: center;

      mat-icon {
        color: var(--primary);
      }

      span {
        font-size: 12px;
        color: var(--text-secondary);
      }
    }

    .arrow {
      font-size: 24px;
      color: var(--text-secondary);
    }

    .code-example {
      h4 {
        margin: 0 0 12px;
        font-size: 14px;
        color: var(--text-secondary);
      }

      pre {
        margin: 0;
        padding: 16px;
        background: var(--background);
        border-radius: 8px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: var(--text-primary);
        overflow-x: auto;
      }
    }

    @media (max-width: 600px) {
      .guards-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RoutingDemoComponent {
  constructor(private router: Router) {}
}
