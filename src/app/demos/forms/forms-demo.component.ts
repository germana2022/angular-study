import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  template: `
    <div class="demo-wrapper">
      <mat-tab-group>
        <mat-tab label="Template-Driven">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Template-Driven Form</mat-card-title>
                <mat-card-subtitle>Usa ngModel en el template</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form #form="ngForm" (ngSubmit)="onTemplateSubmit(form)">
                  <mat-form-field appearance="outline">
                    <mat-label>Nombre</mat-label>
                    <input matInput [(ngModel)]="templateData.name" name="name" required>
                    <mat-icon matSuffix>person</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Email</mat-label>
                    <input matInput [(ngModel)]="templateData.email" name="email" 
                           required email>
                    <mat-icon matSuffix>email</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>País</mat-label>
                    <mat-select [(ngModel)]="templateData.country" name="country">
                      <mat-option value="mx">México</mat-option>
                      <mat-option value="co">Colombia</mat-option>
                      <mat-option value="ar">Argentina</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-checkbox [(ngModel)]="templateData.accept" name="accept">
                    Acepto los términos
                  </mat-checkbox>

                  <button mat-flat-button color="primary" type="submit" 
                          [disabled]="!form.valid">
                    <mat-icon>send</mat-icon>
                    Enviar
                  </button>
                </form>

                <div class="output-box">
                  <strong>Datos:</strong>
                  <pre>{{ templateData | json }}</pre>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Reactive Forms">
          <div class="tab-content">
            <mat-card class="demo-card">
              <mat-card-header>
                <mat-card-title>Reactive Form</mat-card-title>
                <mat-card-subtitle>FormGroup en el componente</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="reactiveForm" (ngSubmit)="onReactiveSubmit()">
                  <mat-form-field appearance="outline">
                    <mat-label>Username</mat-label>
                    <input matInput formControlName="username">
                    <mat-icon matSuffix>alternate_email</mat-icon>
                    @if (reactiveForm.get('username')?.hasError('required')) {
                      <mat-error>Username es requerido</mat-error>
                    }
                    @if (reactiveForm.get('username')?.hasError('minlength')) {
                      <mat-error>Mínimo 3 caracteres</mat-error>
                    }
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Password</mat-label>
                    <input matInput type="password" formControlName="password">
                    <mat-icon matSuffix>lock</mat-icon>
                  </mat-form-field>

                  <mat-radio-group formControlName="role">
                    <mat-radio-button value="admin">Admin</mat-radio-button>
                    <mat-radio-button value="user">User</mat-radio-button>
                  </mat-radio-group>

                  <div class="form-status">
                    <span [class.valid]="reactiveForm.valid"
                          [class.invalid]="reactiveForm.invalid">
                      Estado: {{ reactiveForm.status }}
                    </span>
                  </div>

                  <button mat-flat-button color="accent" type="submit"
                          [disabled]="reactiveForm.invalid">
                    <mat-icon>send</mat-icon>
                    Registrar
                  </button>
                </form>

                <div class="output-box">
                  <strong>Form Value:</strong>
                  <pre>{{ reactiveForm.value | json }}</pre>
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
      max-width: 500px;
      margin: 0 auto;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    mat-checkbox, mat-radio-group {
      margin: 8px 0;
    }

    mat-radio-group {
      display: flex;
      gap: 16px;
    }

    button {
      margin-top: 8px;
      border-radius: 8px;
    }

    .form-status {
      padding: 12px;
      background: var(--surface);
      border-radius: 8px;
      text-align: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 14px;

      .valid {
        color: var(--accent);
      }

      .invalid {
        color: var(--error);
      }
    }

    .output-box {
      margin-top: 24px;
      padding: 16px;
      background: var(--background);
      border-radius: 8px;

      strong {
        display: block;
        margin-bottom: 8px;
        color: var(--text-secondary);
      }

      pre {
        margin: 0;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 13px;
        color: var(--primary);
      }
    }
  `]
})
export class FormsDemoComponent {
  templateData = {
    name: '',
    email: '',
    country: '',
    accept: false
  };

  reactiveForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user')
  });

  onTemplateSubmit(form: any) {
    console.log('Template Form:', this.templateData);
    alert('Formulario enviado: ' + JSON.stringify(this.templateData));
  }

  onReactiveSubmit() {
    console.log('Reactive Form:', this.reactiveForm.value);
    alert('Formulario enviado: ' + JSON.stringify(this.reactiveForm.value));
  }
}
