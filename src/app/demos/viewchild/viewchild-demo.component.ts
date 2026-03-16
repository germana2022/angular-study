import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="child-component">
      <h4>Child Component</h4>
      <p>Contenido del child</p>
      <button mat-flat-button color="accent" (click)="childMethod()">
        Child Method
      </button>
    </div>
  `,
  styles: [`
    .child-component {
      padding: 20px;
      background: var(--surface-light);
      border-radius: 12px;
      border: 2px solid var(--accent);
    }
    h4 {
      margin: 0 0 12px;
      color: var(--accent);
    }
    p {
      margin: 0 0 12px;
      color: var(--text-secondary);
    }
  `]
})
export class ChildComponent {
  childMessage = 'Hello from Child!';
  
  childMethod() {
    alert('Child method executed!');
  }
}

@Component({
  selector: 'app-viewchild-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    ChildComponent
  ],
  template: `
    <div class="demo-wrapper">
      <mat-tab-group>
        <mat-tab label="ViewChild">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>ViewChild - Acceso al DOM</mat-card-title>
                <mat-card-subtitle>Accede a elementos del template propio</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="viewchild-demo">
                  <div class="input-section">
                    <input #myInput type="text" placeholder="Escribe algo...">
                    <button mat-flat-button color="primary" (click)="focusInput()">
                      Focus Input
                    </button>
                  </div>

                  <div class="child-section">
                    <app-child-component #childComp></app-child-component>
                    <button mat-flat-button color="accent" (click)="callChildMethod()">
                      Call Child Method
                    </button>
                  </div>

                  <div class="log-output">
                    <strong>Output:</strong>
                    <p>{{ logMessage }}</p>
                  </div>
                </div>

                <div class="code-preview">
                  <code>
ViewChild accede al DOM y componentes hijos
                  </code>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="ContentChild">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>ContentChild - Contenido Proyectado</mat-card-title>
                <mat-card-subtitle>Accede a ng-content del padre</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="contentchild-demo">
                  <h4>Ejemplo de proyección:</h4>
                  <div class="card">
                    <h4>Card Header</h4>
                    <p>Contenido proyectado</p>
                  </div>

                  <div class="explanation">
                    <p><strong>ContentChild</strong> accede a elementos proyectados</p>
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
    .demo-wrapper { width: 100%; }
    .tab-content { padding: 24px 0; }
    .demo-card { border-radius: 12px; }
    .viewchild-demo, .contentchild-demo { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
    .input-section { display: flex; gap: 12px; align-items: center; }
    .input-section input { flex: 1; padding: 12px 16px; border: 2px solid var(--border); border-radius: 8px; background: var(--background); color: var(--text-primary); font-size: 14px; }
    .input-section input:focus { outline: none; border-color: var(--primary); }
    .child-section { display: flex; gap: 16px; align-items: flex-start; }
    .card { padding: 16px; background: var(--surface); border-radius: 8px; border: 1px solid var(--border); }
    .card h4 { margin: 0 0 12px; color: var(--text-primary); }
    .explanation { padding: 16px; background: var(--surface); border-radius: 8px; }
    .explanation p { margin: 0; color: var(--text-secondary); }
    .log-output { padding: 16px; background: var(--background); border-radius: 8px; }
    .log-output strong { display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 14px; }
    .log-output p { margin: 0; font-family: 'IBM Plex Mono', monospace; color: var(--accent); }
    .code-preview { background: var(--background); border-radius: 12px; padding: 20px; }
    .code-preview code { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--text-primary); white-space: pre; }
  `]
})
export class ViewchildDemoComponent implements AfterViewInit {
  @ViewChild('myInput') inputEl!: ElementRef;
  @ViewChild('childComp') childComp!: ChildComponent;

  logMessage = '';

  ngAfterViewInit() {
    console.log('ViewChild disponible');
  }

  focusInput() {
    this.inputEl.nativeElement.focus();
    this.logMessage = 'Input enfocado!';
  }

  callChildMethod() {
    this.childComp.childMethod();
    this.logMessage = 'Child method called!';
  }
}
