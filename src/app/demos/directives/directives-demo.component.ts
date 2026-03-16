import { Component, Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor = '#ffff00';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'transparent');
  }
}

@Directive({
  selector: '[appClickCounter]',
  standalone: true
})
export class ClickCounterDirective {
  clickCount = 0;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.clickCount++;
    this.el.nativeElement.innerHTML = `Clicks: ${this.clickCount}`;
    this.el.nativeElement.style.background = 'var(--primary)';
    this.el.nativeElement.style.color = 'white';
  }
}

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    HighlightDirective,
    ClickCounterDirective
  ],
  template: `
    <div class="demo-wrapper">
      <mat-tab-group>
        <mat-tab label="Custom Directives">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Directivas Personalizadas</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="directives-demo">
                  <div class="demo-section">
                    <h4>Highlight Directive</h4>
                    <p>Pasa el mouse sobre los elementos:</p>
                    <div class="demo-boxes">
                      <div class="box" appHighlight="red">Rojo</div>
                      <div class="box" appHighlight="blue">Azul</div>
                      <div class="box" appHighlight="green">Verde</div>
                      <div class="box" appHighlight="purple">Morado</div>
                    </div>
                  </div>

                  <div class="demo-section">
                    <h4>Click Counter Directive</h4>
                    <button mat-flat-button color="primary" appClickCounter>
                      Click me!
                    </button>
                  </div>
                </div>

                <div class="code-preview">
                  <h4>Código de HighlightDirective:</h4>
                  <pre>
&#64;Directive({{ '{' }}
  selector: '[appHighlight]'
{{ '}' }})
export class HighlightDirective {{ '{' }}
  &#64;Input('appHighlight') highlightColor = '#ffff00';

  constructor(private el: ElementRef, private renderer: Renderer2) {{ '{' }}

  &#64;HostListener('mouseenter') onMouseEnter() {{ '{' }}
    this.renderer.setStyle(
      this.el.nativeElement, 
      'backgroundColor', 
      this.highlightColor
    );
  {{ '}' }}
{{ '}' }}
                  </pre>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Built-in Directives">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Directivas Incorporadas</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="builtins-demo">
                  <div class="demo-row">
                    <h4>*ngIf</h4>
                    <button mat-stroked-button (click)="showMessage = !showMessage">
                      Toggle
                    </button>
                    <p *ngIf="showMessage" class="message">¡Mensaje visible!</p>
                  </div>

                  <div class="demo-row">
                    <h4>*ngFor</h4>
                    <div class="items-list">
                      @for (item of items; track item) {
                        <span class="item">{{ item }}</span>
                      }
                    </div>
                  </div>

                  <div class="demo-row">
                    <h4>ngClass</h4>
                    <div class="box" [ngClass]="{'active': isActive, 'disabled': !isActive}">
                      {{ isActive ? 'Activo' : 'Inactivo' }}
                    </div>
                    <button mat-stroked-button (click)="isActive = !isActive">
                      Toggle Class
                    </button>
                  </div>

                  <div class="demo-row">
                    <h4>ngStyle</h4>
                    <div class="box" [ngStyle]="{'background-color': bgColor, 'color': 'white'}">
                      Color: {{ bgColor }}
                    </div>
                    <button mat-stroked-button (click)="bgColor = bgColor === 'red' ? 'blue' : 'red'">
                      Change Color
                    </button>
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

    .directives-demo {
      margin-bottom: 24px;
    }

    .demo-section {
      margin-bottom: 24px;

      h4 {
        margin: 0 0 12px;
        font-size: 16px;
        color: var(--primary);
      }

      p {
        margin: 0 0 12px;
        color: var(--text-secondary);
      }
    }

    .demo-boxes {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .box {
      padding: 16px 24px;
      background: var(--surface);
      border-radius: 8px;
      cursor: default;
      font-weight: 500;
      border: 2px solid var(--border);

      &.active {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
      }

      &.disabled {
        background: var(--surface-light);
        color: var(--text-secondary);
      }
    }

    .code-preview {
      background: var(--background);
      border-radius: 12px;
      padding: 20px;

      h4 {
        margin: 0 0 12px;
        font-size: 14px;
        color: var(--text-secondary);
      }

      pre {
        margin: 0;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        color: var(--text-primary);
        overflow-x: auto;
      }
    }

    .builtins-demo {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .demo-row {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;

      h4 {
        margin: 0;
        min-width: 100px;
        font-size: 14px;
        color: var(--text-secondary);
      }
    }

    .message {
      padding: 12px 24px;
      background: var(--accent);
      color: white;
      border-radius: 8px;
      margin: 0;
      animation: fadeIn 0.3s ease;
    }

    .items-list {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .item {
      padding: 8px 16px;
      background: var(--surface);
      border-radius: 6px;
      font-size: 14px;
      color: var(--primary);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DirectivesDemoComponent {
  showMessage = false;
  isActive = false;
  bgColor = 'red';
  items = ['Angular', 'React', 'Vue', 'Svelte'];
}
