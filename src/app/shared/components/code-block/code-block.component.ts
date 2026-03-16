import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSnackBarModule],
  template: `
    <div class="code-block">
      <div class="code-header">
        <span class="language">{{ language }}</span>
        <button mat-icon-button 
                matTooltip="Copiar código" 
                (click)="copyCode()"
                class="copy-btn">
          <mat-icon>{{ copied ? 'check' : 'content_copy' }}</mat-icon>
        </button>
      </div>
      <pre><code>{{ code }}</code></pre>
    </div>
  `,
  styles: [`
    .code-block {
      background: #0d1117;
      border-radius: 12px;
      overflow: hidden;
      margin: 16px 0;
      border: 1px solid var(--border);
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      background: #161b22;
      border-bottom: 1px solid var(--border);
    }

    .language {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-secondary);
      font-family: 'IBM Plex Mono', monospace;
    }

    .copy-btn {
      color: var(--text-secondary);
      
      &:hover {
        color: var(--primary);
      }
    }

    pre {
      margin: 0;
      padding: 20px;
      overflow-x: auto;
    }

    code {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 14px;
      line-height: 1.6;
      color: #c9d1d9;
    }
  `]
})
export class CodeBlockComponent {
  @Input() code = '';
  @Input() language = 'typescript';
  
  copied = false;

  constructor(private snackBar: MatSnackBar) {}

  copyCode(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied = true;
      this.snackBar.open('Código copiado', 'Cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      setTimeout(() => this.copied = false, 2000);
    });
  }
}
