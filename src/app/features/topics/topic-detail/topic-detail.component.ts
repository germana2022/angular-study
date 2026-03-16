import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { TopicService } from '../../../core/services/topic.service';
import { Topic } from '../../../core/models/topic.model';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { DemoContainerComponent } from '../../../shared/components/demo-container/demo-container.component';

import { ChangeDetectionDemoComponent } from '../../../demos/change-detection/change-detection-demo.component';
import { ObservablesDemoComponent } from '../../../demos/observables/observables-demo.component';
import { LifecycleHooksDemoComponent } from '../../../demos/lifecycle-hooks/lifecycle-hooks-demo.component';
import { FormsDemoComponent } from '../../../demos/forms/forms-demo.component';
import { RoutingDemoComponent } from '../../../demos/routing/routing-demo.component';
import { DiDemoComponent } from '../../../demos/di/di-demo.component';
import { DirectivesDemoComponent } from '../../../demos/directives/directives-demo.component';
import { ViewchildDemoComponent } from '../../../demos/viewchild/viewchild-demo.component';
import { DataBindingDemoComponent } from '../../../demos/data-binding/data-binding-demo.component';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    CodeBlockComponent,
    DemoContainerComponent,
    ChangeDetectionDemoComponent,
    ObservablesDemoComponent,
    LifecycleHooksDemoComponent,
    FormsDemoComponent,
    RoutingDemoComponent,
    DiDemoComponent,
    DirectivesDemoComponent,
    ViewchildDemoComponent,
    DataBindingDemoComponent
  ],
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss'
})
export class TopicDetailComponent implements OnInit {
  topic: Topic | undefined;

  demoCode: Record<string, string> = {
    changeDetection: `// Change Detection Demo
@Component({
  selector: 'app-cd-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button (click)="update()">Update</button>
    <p>Value: {{ value }}</p>
  \`
})
export class CdDemoComponent {
  @Input() value = 0;
}`,
    observables: `// Observable vs Promise
const obs$ = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => subscriber.next(3), 1000);
});

const promise = new Promise(resolve => {
  resolve(42);
});`,
    lifecycleHooks: `// Lifecycle Hooks Order
// 1. constructor
// 2. ngOnChanges
// 3. ngOnInit
// 4. ngDoCheck
// 5. ngAfterViewInit
// 6. ngAfterViewChecked
// 7. ngOnDestroy`,
    forms: `// Reactive Forms
@Component({
  template: \`
    <form [formGroup]="form">
      <input formControlName="name">
    </form>
  \`
})
export class FormComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });
}`,
    routing: `// Route Configuration
const routes: Routes = [
  { path: 'users/:id', component: UserComponent,
    canActivate: [AuthGuard],
    resolve: { user: UserResolver }
  }
];`,
    di: `// Dependency Injection
@Injectable({ providedIn: 'root' })
export class DataService {
  getData() { return this.http.get('/api'); }
}

@Component({
  providers: [DataService]
})
export class MyComponent {
  constructor(private data: DataService) {}
}`,
    directives: `// Custom Directive
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  
  @HostListener('mouseenter') onHover() {
    // code
  }
}`,
    viewchild: `// ViewChild Usage
@Component({
  template: \`<input #myInput>\`
})
export class ParentComponent 
  implements AfterViewInit {
  @ViewChild('myInput') input!: ElementRef;
  
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
}`,
    dataBinding: `// Data Binding Types
// Interpolation: {{ value }}
// Property: [src]="url"
// Event: (click)="onClick()"
// Two-way: [(ngModel)]="name"`
  };

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.topicService.getTopicBySlug(slug).subscribe(topic => {
        this.topic = topic;
      });
    });
  }

  formatDescription(desc: string): string {
    return desc
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
}
