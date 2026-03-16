import { TopicCategory } from '../models/topic.model';

export const TOPICS_DATA: TopicCategory[] = [
  {
    name: 'Angular Core',
    icon: 'architecture',
    topics: [
      {
        id: 'angular-ivy',
        title: 'Angular Ivy',
        slug: 'angular-ivy',
        category: 'Angular Core',
        icon: 'bolt',
        summary: 'El nuevo motor de renderizado de Angular que mejora el rendimiento y reduce el tamaño del bundle.',
        description: `Angular Ivy es la nueva arquitectura del compilador y renderizado de Angular que reemplazo al antiguo View Engine. Fue introducido en Angular 9 y viene habilitado por defecto desde Angular 12.

**Características principales:**

Ivy utiliza un enfoque de "locality" meaning que cada componente se compila de manera independiente, lo que permite:
- Compilación más rápida
- Tamaño de bundle reducido
- Mejor tree-shaking
- Debuggear más simple
- Plantillas más legibles

El compilador Ivy genera instrucciones de renderizado más pequeñas y eficientes que el View Engine anterior.`,
        keyPoints: [
          'Ivy es el compilador y renderer de Angular desde Angular 9+',
          'Compilación incremental y por componente',
          'Reduce significativamente el tamaño del bundle',
          'Mejora el tiempo de compilación',
          'Permite lazy loading a nivel de componente',
          'Genera código más legible y depurable'
        ],
        codeExample: `@Component({
  selector: 'app-mi-componente',
  template: \`
    <h1>{{ titulo }}</h1>
    <button (click)="onClick()">Click</button>
  \`
})
export class MiComponenteComponent {
  titulo = 'Hola Ivy';
  
  onClick() {
    console.log('Clicked!');
  }
}`,
        whenToUse: 'Ivy está habilitado por defecto en Angular 12+, no necesitas configuración adicional. Úsalo en todas las aplicaciones nuevas.',
        commonMistakes: [
          'Intentar deshabilitar Ivy (no recomendado)',
          'No actualizar proyectos antiguos a Ivy',
          'Usar View Engine APIs obsoletas'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre View Engine e Ivy?',
        hasDemo: false
      },
      {
        id: 'change-detection',
        title: 'Change Detection',
        slug: 'change-detection',
        category: 'Angular Core',
        icon: 'sync',
        summary: 'El mecanismo de Angular para sincronizar el estado de los componentes con el DOM.',
        description: `El Change Detection (Detección de Cambios) es el proceso mediante el cual Angular verifica si el estado de los datos ha cambiado y actualiza el DOM en consecuencia.

**¿Cómo funciona?**

Angular crea un árbol de componentes y cada componente tiene su propia Change Detection Strategy. Cuando ocurre un evento (click, HTTP response, setTimeout, etc.), Angular recorre el árbol de componentes verificando si los valores han cambiado.

**Zonas:**

Angular usa NgZone para manejar la ejecución asíncrona. Cada vez que una tarea asíncrona completa, NgZone ejecuta change detection.`,
        keyPoints: [
          'Change Detection sincroniza el estado con la vista',
          'Angular verifica el árbol de componentes después de cada evento',
          'NgZone maneja la ejecución asíncrona',
          'Cada componente tiene su propia estrategia',
          'OnPush puede mejorar significativamente el rendimiento',
          'Use CD strategies para aplicaciones grandes'
        ],
        codeExample: `@Component({
  selector: 'app-ejemplo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h1>{{ mensaje }}</h1>
  \`
})
export class EjemploComponent {
  @Input() mensaje: string;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  manualUpdate() {
    this.cdr.detectChanges();
  }
}`,
        whenToUse: 'Usa Default para apps pequeñas y OnPush para componentes que reciben datos via @Input() immutables.',
        commonMistakes: [
          'No entender cuándo se dispara CD',
          'Olvidar que OnPush requiere datos inmutables',
          'Mutar objetos en lugar de crear nuevos'
        ],
        interviewQuestion: '¿Cómo funciona Change Detection en Angular?',
        hasDemo: true,
        demoComponent: 'change-detection'
      },
      {
        id: 'default-vs-onpush',
        title: 'Diferencia entre Default y OnPush',
        slug: 'default-vs-onpush',
        category: 'Angular Core',
        icon: 'compare_arrows',
        summary: 'Dos estrategias de Change Detection con implicaciones diferentes en el rendimiento.',
        description: `**Default Strategy:**

Ejecuta Change Detection cada vez que:
- Un evento ocurre en el componente o sus hijos
- Un observable emite un nuevo valor (async pipe)
- Una HTTP request completa
- setTimeout/setInterval completa

**OnPush Strategy:**

Ejecuta Change Detection solo cuando:
- Una @Input() referencia cambia (comparación por referencia)
- Un evento originates del componente o sus hijos
- Se llama manualmente a markForCheck() o detectChanges()
- Un observable emits a través del async pipe

**Rendimiento:**

OnPush puede reducir drasticamente el número de verificaciones porque solo se ejecuta cuando es necesario.`,
        keyPoints: [
          'Default: CD en cada evento del árbol',
          'OnPush: CD solo cuando cambian las inputs o eventos locales',
          'OnPush requiere datos inmutables',
          'OnPush mejora rendimiento en apps grandes',
          'Use ChangeDetectorRef para control manual',
          'Combine con señales para máximo rendimiento'
        ],
        codeExample: `// Default - Se verifica en cada cambio
@Component({
  selector: 'app-default',
  changeDetection: ChangeDetectionStrategy.Default,
  template: \`<h1>{{ counter }}</h1>\`
})
export class DefaultComponent {
  counter = 0;
}

// OnPush - Solo cuando cambia la referencia
@Component({
  selector: 'app-onpush',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<h1>{{ data.value }}</h1>\`
})
export class OnPushComponent {
  @Input() data: { value: string };
  
  // Necesitas datos inmutables
  update() {
    // Bien: nueva referencia
    this.data = { value: 'nuevo' };
    // Mal: mutación
    // this.data.value = 'nuevo';
  }
}`,
        whenToUse: 'Usa OnPush en componentes que reciben datos via @Input() y quieres optimizar rendimiento.',
        commonMistakes: [
          'Mutar objetos con OnPush',
          'No usar ChangeDetectorRef cuando es necesario',
          'Olvidar que async pipe funciona con OnPush'
        ],
        interviewQuestion: '¿Cuándo usarías OnPush vs Default?',
        hasDemo: true,
        demoComponent: 'change-detection'
      },
      {
        id: 'ngzone',
        title: '¿Qué es NgZone?',
        slug: 'ngzone',
        category: 'Angular Core',
        icon: 'layers',
        summary: 'Un servicio que gestiona zonas de ejecución para controlar cuando se dispara Change Detection.',
        description: `NgZone es un servicio injectable que proporciona una forma de ejecutar código fuera de la zona de Angular (fuera de Change Detection) y luego volver a entrar cuando sea necesario.

**¿Por qué existe?**

Las operaciones asíncronas como setTimeout, Promises, HTTP calls, etc., automáticamente disparan Change Detection. Esto puede ser innecesario si no actualizas el estado de la aplicación.

**runOutsideAngular:**

Te permite ejecutar código sin disparar Change Detection:

\`\`\`typescript
this.ngZone.runOutsideAngular(() => {
  // No dispara CD
  setTimeout(() => { }, 1000);
});
\`\`\`

**run:**

Vuelve a entrar en la zona de Angular:

\`\`\`typescript
this.ngZone.run(() => {
  // Dispara CD
  this.actualizarEstado();
});
\`\`\``,
        keyPoints: [
          'NgZone gestiona la zona de Angular',
          'runOutsideAngular evita CD automático',
          'run() vuelve a entrar en la zona',
          'Úsalo para第三方librerías que no usan Angular',
          'Optimiza rendimiento evitando CD innecesario',
          'Ejecuta código intensivo fuera de la zona'
        ],
        codeExample: `import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-ejemplo-zona',
  template: \`<p>Contador: {{ counter }}</p>\`
})
export class EjemploZonaComponent {
  counter = 0;
  
  constructor(private ngZone: NgZone) {}
  
  actualizarConZone() {
    this.ngZone.run(() => {
      this.counter++; // Dispara CD
    });
  }
  
  actualizarSinZone() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.counter++;
        // Necesitas marcar manualmente
        this.ngZone.run(() => {});
      }, 1000);
    });
  }
}`,
        whenToUse: 'Usa NgZone para optimizar rendimiento evitando Change Detection innecesario.',
        commonMistakes: [
          'Olvidar llamar run() después de runOutsideAngular',
          'No usarlo con librerías externas',
          'No optimizar operaciones intensivas'
        ],
        interviewQuestion: '¿Cómo optimizarías el rendimiento usando NgZone?',
        hasDemo: false
      },
      {
        id: 'lifecycle-hooks',
        title: '¿Qué son los lifecycle hooks?',
        slug: 'lifecycle-hooks',
        category: 'Angular Core',
        icon: 'autorenew',
        summary: 'Métodos que permiten ejecutar código en momentos específicos del ciclo de vida de un componente.',
        description: `Los Lifecycle Hooks son interfaces que permiten ejecutar código en diferentes momentos del ciclo de vida de un componente, directiva o servicio.

**Hooks disponibles:**

1. **ngOnInit** - Se llama una vez, después del primer ngOnChanges
2. **ngOnChanges** - Se llama antes de ngOnInit y cuando cambian las @Input()
3. **ngDoCheck** - Se llama en cada change detection
4. **ngAfterViewInit** - Después de inicializar la vista del componente
5. **ngAfterViewChecked** - Después de cada verificación de la vista
6. **ngAfterContentInit** - Después de proyectar contenido
7. **ngAfterContentChecked** - Después de cada verificación de contenido proyectado
8. **ngOnDestroy** - Antes de destruir el componente`,
        keyPoints: [
          'ngOnInit: inicialización principal',
          'ngOnChanges: responde a cambios en @Input()',
          'ngOnDestroy: limpieza de recursos',
          'ngAfterViewInit: acceso al DOM hijo',
          'No hacer operaciones costosas en ngDoCheck',
          'Siempre desuscribirse en ngOnDestroy'
        ],
        codeExample: `import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ejemplo-lifecycle',
  template: \`<h1>{{ titulo }}</h1>\`
})
export class EjemploLifecycleComponent 
  implements OnInit, OnDestroy, AfterViewInit {
  
  titulo = '';
  
  ngOnInit() {
    console.log('1. ngOnInit - Inicialización');
    this.titulo = 'Componente Listo';
  }
  
  ngAfterViewInit() {
    console.log('4. ngAfterViewInit - Vista lista');
  }
  
  ngOnDestroy() {
    console.log('5. ngOnDestroy - Limpieza');
  }
  
  ngOnChanges() {
    console.log('2. ngOnChanges - Input cambió');
  }
  
  ngDoCheck() {
    console.log('3. ngDoCheck - Verificación');
  }
}`,
        whenToUse: 'Usa ngOnInit para inicialización, ngOnDestroy para cleanup.',
        commonMistakes: [
          'Poner lógica de inicialización en el constructor',
          'Olvidar desuscribirse de observables',
          'Hacer too much work en ngDoCheck'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre ngOnInit y el constructor?',
        hasDemo: true,
        demoComponent: 'lifecycle-hooks'
      },
      {
        id: 'constructor-vs-ngoninit',
        title: 'Diferencia entre constructor y ngOnInit',
        slug: 'constructor-vs-ngoninit',
        category: 'Angular Core',
        icon: 'difference',
        summary: 'El constructor es para inyección de dependencias, ngOnInit para inicialización del componente.',
        description: `**Constructor:**

- Se ejecuta antes que cualquier otro lifecycle hook
- Se usa principalmente para inyección de dependencias
- Angular resuelve las dependencias antes de crear el componente
- No tienes acceso aún a @Input() y @Output()

**ngOnInit:**

- Se ejecuta una vez después de que Angular configure las @Input()
- Es el lugar apropiado para lógica de inicialización
- Tienes acceso a todas las propiedades del componente
- Se llama solo una vez

**Best Practice:**

Usa el constructor solo para inyección de dependencias y operaciones simples.`,
        keyPoints: [
          'Constructor: inyección de dependencias',
          'ngOnInit: inicialización del componente',
          '@Input() no está disponible en constructor',
          'ngOnInit se llama después de ngOnChanges',
          'No hacer HTTP calls en constructor',
          'ngOnInit es parte del lifecycle de Angular'
        ],
        codeExample: `@Component({
  selector: 'app-ejemplo',
  template: \`<h1>{{ titulo }}</h1>\`
})
export class EjemploComponent {
  @Input() data: string;
  titulo = '';
  
  // Constructor: solo para DI
  constructor(private service: MiService) {
    // @Input() data NO está disponible aquí
    console.log('Constructor');
  }
  
  // ngOnInit: para inicialización
  ngOnInit() {
    // @Input() data SÍ está disponible
    console.log('ngOnInit', this.data);
    this.titulo = 'Inicializado';
    this.cargarDatos();
  }
  
  cargarDatos() {
    // HTTP calls aquí
  }
}`,
        whenToUse: 'Usa constructor para DI y ngOnInit para inicialización.',
        commonMistakes: [
          'Hacer HTTP calls en el constructor',
          'Confundir responsabilidades',
          'No implementar OnInit cuando necesitas'
        ],
        interviewQuestion: '¿Por qué no hacer HTTP calls en el constructor?',
        hasDemo: false
      },
      {
        id: 'data-binding',
        title: '¿Qué es Data Binding?',
        slug: 'data-binding',
        category: 'Angular Core',
        icon: 'swap_horiz',
        summary: 'El mecanismo para comunicar el modelo (datos) con la vista (template).',
        description: `Data Binding permite sincronizar automáticamente los datos entre el componente y el template.

**Tipos de Data Binding:**

1. **Interpolation {{ }}** - Unidirectional, component → template
   \`{{ nombre }}\`

2. **Property Binding []** - Unidirectional, component → template
   \`<img [src]="imagenUrl">\`

3. **Event Binding ()** - Unidirectional, template → component
   \`<button (click)="onClick()">\`

4. **Two-way Binding [(ngModel)]** - Bidirectional
   \`<input [(ngModel)]="nombre">\`

5. **Attribute Binding** - Para atributos no DOM
   \`<td [attr.colspan]="2">\`

6. **Class Binding** - Para clases CSS
   \`<div [class.active]="isActive">\`

7. **Style Binding** - Para estilos
   \`<div [style.color]="color">\``,
        keyPoints: [
          'Interpolation: {{ value }} para texto',
          'Property Binding: [property]="value"',
          'Event Binding: (event)="handler()"',
          'Two-way: [(ngModel)]="value"',
          'Usa [] para propiedades, () para eventos',
          'Two-way requiere FormsModule'
        ],
        codeExample: `@Component({
  selector: 'app-data-binding',
  template: \`
    <!-- Interpolation -->
    <h1>{{ titulo }}</h1>
    
    <!-- Property Binding -->
    <img [src]="imagenUrl" [alt]="descripcion">
    
    <!-- Event Binding -->
    <button (click)="onClick()">Click</button>
    
    <!-- Two-way Binding -->
    <input [(ngModel)]="nombre" (input)="onInput()">
    
    <!-- Class & Style Binding -->
    <div [class.active]="isActive" 
         [style.color]="color">
      contenido
    </div>
  \`
})
export class DataBindingComponent {
  titulo = 'Data Binding';
  imagenUrl = 'imagen.jpg';
  nombre = '';
  isActive = true;
  color = 'red';
  
  onClick() {
    console.log('Click!');
  }
  
  onInput() {
    console.log(this.nombre);
  }
}`,
        whenToUse: 'Usa interpolation para texto, property para atributos, events para acciones, two-way para forms.',
        commonMistakes: [
          'Confundir property binding con interpolation',
          'Olvidar FormsModule para ngModel',
          'Usar () en lugar de [] para propiedades'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre property binding y event binding?',
        hasDemo: true,
        demoComponent: 'data-binding'
      },
      {
        id: 'pipe',
        title: '¿Qué es un Pipe?',
        slug: 'pipe',
        category: 'Angular Core',
        icon: 'transform',
        summary: 'Una función transformadora que se aplica en templates para formatear datos.',
        description: `Los Pipes transforman datos en el template sin modificar el componente.

**Pipes incorporados:**

- date: formatear fechas
- currency: formatear monedas
- json: convertir a JSON
- uppercase/lowercase: mayúsculas/minúsculas
- percent: formatear porcentajes
- slice: cortar arrays/strings
- async: subscribe a observables
- keyvalue: iterable para objetos

**Custom Pipes:**

\`\`\`typescript
@Pipe({ name: 'miPipe' })
export class MiPipePipe implements PipeTransform {
  transform(value: string, param?: string): string {
    return value.toUpperCase();
  }
}
\`\`\``,
        keyPoints: [
          'Pipes transforman datos en templates',
          'Usa el operador | para aplicar pipes',
          'Puedes encadenar pipes: {{ valor | pipe1 | pipe2 }}',
          'Los pipes pueden recibir parámetros',
          'async pipe suscribe automáticamente',
          'Crea pipes personalizados para lógica reusable'
        ],
        codeExample: `@Pipe({ name: 'resumir' })
export class ResumirPipe implements PipeTransform {
  transform(value: string, limite: number = 50): string {
    if (value.length <= limite) return value;
    return value.substring(0, limite) + '...';
  }
}

// Usage: {{ texto | resumir:100 }}`,
        whenToUse: 'Usa pipes para formateo visual de datos.',
        commonMistakes: [
          'Olvidar el pipe async para observables',
          'Usar pipes para lógica compleja',
          'No usar pure: false para pipes con estado'
        ],
        interviewQuestion: '¿Cómo crearías un pipe personalizado?',
        hasDemo: false
      },
      {
        id: 'dependency-injection',
        title: '¿Qué es Dependency Injection en Angular?',
        slug: 'dependency-injection',
        category: 'Angular Core',
        icon: 'construction',
        summary: 'Un patrón de diseño donde las dependencias se inyectan en lugar de crearse dentro del componente.',
        description: `Dependency Injection (DI) es un patrón donde un objeto recibe otros objetos de los que depende, en lugar de crearlos directamente.

**¿Cómo funciona en Angular?**

1. Registras dependencias en providers
2. Angular crea el injector
3. Cuando necesitas una dependencia, la pides al injector
4. Angular resuelve las dependencias y las inyecta

**Niveles de providers:**

- **root**: aplicación completa (singleton)
- **any**: cada lazy-loaded module
- **platform**: toda la aplicación
- **Component**: solo el componente y hijos`,
        keyPoints: [
          'DI es central en Angular',
          'Usa @Injectable() para servicios',
          'providedIn: "root" es preferred',
          'Puedes injectar en constructor',
          'useClass, useValue, useFactory para config',
          'Los componentes también son injectables'
        ],
        codeExample: `@Injectable({ providedIn: 'root' })
export class DataService {
  getData() {
    return HttpClient;
  }
}

@Component({
  selector: 'app-mi-componente',
  providers: [DataService]
})
export class MiComponenteComponent {
  constructor(private dataService: DataService) {
    // Inyectado automáticamente
  }
}

// Provider a nivel de componente
@Component({
  selector: 'app-otro',
  providers: [{ provide: API_URL, useValue: 'https://api.com' }]
})
export class OtroComponent {
  constructor(@Inject(API_URL) private apiUrl: string) {}
}`,
        whenToUse: 'Usa DI para共享 lógica y servicios entre componentes.',
        commonMistakes: [
          'Olvidar providedIn: "root"',
          'Crear múltiples instancias sin querer',
          'Circular dependencies'
        ],
        interviewQuestion: '¿Cómo configurarías un servicio como singleton?',
        hasDemo: true,
        demoComponent: 'di'
      },
      {
        id: 'aot-compilation',
        title: '¿Qué es AOT Compilation?',
        slug: 'aot-compilation',
        category: 'Angular Core',
        icon: 'code',
        summary: 'Compilación anticipada que convierte templates HTML y TypeScript en código JavaScript eficiente.',
        description: `AOT (Ahead-of-Time) Compilation compila el código Angular durante el proceso de build, antes de que se ejecute en el navegador.

**JIT vs AOT:**

- **JIT (Just-in-Time)**: Compila en el navegador al inicio
- **AOT (Ahead-of-Time)**: Compila durante el build

**Ventajas de AOT:**

1. Renderizado más rápido
2. Menos requests HTTP
3. Errores de template en build time
4. Mejor seguridad (no código Angular en browser)
5. Tree shaking más efectivo`,
        keyPoints: [
          'AOT compila durante el build',
          'JIT compila en el navegador',
          'AOT es el default en Angular',
          'Errores de template se detectan antes',
          'Menor bundle size con AOT',
          'Más seguro que JIT'
        ],
        codeExample: `// Configuración en angular.json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "aot": true,
            "buildOptimizer": true
          }
        }
      }
    }
  }
}

// En producción: ng build --configuration=production
// AOT está habilitado por defecto`,
        whenToUse: 'AOT siempre está habilitado en producción.',
        commonMistakes: [
          'Confundir AOT con tree shaking',
          'No optimizar el build',
          'No usar --prod flag'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre AOT y JIT?',
        hasDemo: false
      },
      {
        id: 'tree-shaking',
        title: '¿Qué es Tree Shaking?',
        slug: 'tree-shaking',
        category: 'Angular Core',
        icon: 'park',
        summary: 'El proceso de eliminar código no utilizado del bundle final.',
        description: `Tree Shaking es una optimización que elimina código muerto del bundle final. Es posible gracias a ES modules (import/export).

**¿Cómo funciona?**

1. Analiza el grafo de imports/exports
2. Identifica código utilizado
3. Elimina código no utilizado
4. Reduce el tamaño del bundle

**Para maximizar tree shaking:**

- Usa import específico en lugar de import completo
- Evita módulos con side effects
- Usa providedIn: "root" en servicios
- Habilita strict mode en TypeScript`,
        keyPoints: [
          'Tree shaking elimina código no usado',
          'Solo funciona con ES modules',
          'Reduce tamaño del bundle significativamente',
          'Usa import específico: import { foo }',
          'providedIn: "root" permite tree shaking',
          'Build de producción lo habilita automáticamente'
        ],
        codeExample: `// Bien - Tree shaking funciona
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Mal - Todo el módulo se importa
import * as angular from '@angular/core';

// Bien - Solo lo que necesitas
import { map, filter } from 'rxjs/operators';

// Bien - providedIn permite tree shaking
@Injectable({ providedIn: 'root' })
export class MiServicio {}`,
        whenToUse: 'Tree shaking es automático en builds de producción.',
        commonMistakes: [
          'Usar imports de todo el módulo',
          'Olvidar providedIn en servicios',
          'Side effects en módulos'
        ],
        interviewQuestion: '¿Cómo optimizarías el bundle size?',
        hasDemo: false
      },
      {
        id: 'performance-optimization',
        title: '¿Cómo optimizar performance en Angular?',
        slug: 'performance-optimization',
        category: 'Angular Core',
        icon: 'speed',
        summary: 'Técnicas y mejores prácticas para mejorar el rendimiento de aplicaciones Angular.',
        description: `**Estrategias de Optimización:**

1. **Change Detection**
   - Usa OnPush strategy
   - Evita mutaciones, usa datos inmutables
   - Usa ChangeDetectorRef.run() con NgZone

2. **Carga**
   - Lazy loading de módulos
   - Preload estrategias
   - OnPush + señalización

3. **Rendering**
   - TrackBy en *ngFor
   - Virtual scrolling para listas grandes
   - Evita expresiones complejas en templates

4. **RXJS**
   - Unsubscribe en ngOnDestroy
   - Usa operators apropiados
   - Evita memory leaks

5. **Build**
   - AOT compilation
   - Tree shaking
   - Budget limits`,
        keyPoints: [
          'Usa OnPush change detection',
          'Implementa trackBy en ngFor',
          'Lazy loading para módulos',
          'Usa virtual scrolling',
          'Desuscribe observables',
          'Optimiza imágenes y assets'
        ],
        codeExample: `// 1. OnPush + trackBy
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </div>
  \`
})
export class ListComponent {
  trackById(index: number, item: any): any {
    return item.id;
  }
}

// 2. Virtual Scrolling
<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let item of items">{{item}}</div>
</cdk-virtual-scroll-viewport>

// 3. Unsubscribe
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data.pipe(
    takeUntil(this.destroy$)
  ).subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}`,
        whenToUse: 'Aplica optimizaciones desde el inicio en apps grandes.',
        commonMistakes: [
          'No usar OnPush',
          'Olvidar trackBy',
          'Memory leaks por observables'
        ],
        interviewQuestion: '¿Cómo optimizarias una lista con 10,000 items?',
        hasDemo: false
      },
      {
        id: 'project-structure',
        title: '¿Cómo estructurar una aplicación Angular grande?',
        slug: 'project-structure',
        category: 'Angular Core',
        icon: 'folder',
        summary: 'Arquitectura recomendada para proyectos Angular escalables y mantenibles.',
        description: `**Estructura recomendada:**

\`\`\`
src/
├── app/
│   ├── core/           # Singleton services, guards, interceptors
│   │   ├── services/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── models/
│   ├── shared/         # Componentes, pipes, directives reusable
│   │   ├── components/
│   │   ├── pipes/
│   │   └── directives/
│   ├── features/       # Módulos por funcionalidad (lazy loaded)
│   │   ├── dashboard/
│   │   ├── usuarios/
│   │   └── productos/
│   └── layout/         # Shell components
│       ├── header/
│       ├── sidebar/
│       └── footer/
\`\`\`

**Principios:**

- Separa concerns por funcionalidad
- Un módulo por feature (lazy loaded)
- Core para singleton services
- Shared para código reusable
- Facade pattern para data access`,
        keyPoints: [
          'Usa arquitectura por features',
          'Lazy loading para módulos grandes',
          'Core para singletons',
          'Shared para reusable code',
          'Usa Facade para data layer',
          'Mantén componentes pequeños y focused'
        ],
        codeExample: `// Estructura de un feature module
export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    resolve: { usuarios: UsuariosResolver }
  }
];

// Lazy loading en app-routing
{
  path: 'usuarios',
  loadChildren: () => 
    import('./features/usuarios/usuarios.module')
      .then(m => m.UsuariosModule)
}`,
        whenToUse: 'Usa esta estructura desde el inicio en proyectos grandes.',
        commonMistakes: [
          'Poner todo en AppModule',
          'No usar lazy loading',
          'Mezclar responsabilidades'
        ],
        interviewQuestion: '¿Cómo organizarías un proyecto con 50+ componentes?',
        hasDemo: false
      },
      {
        id: 'ssr',
        title: '¿Qué es SSR?',
        slug: 'ssr',
        category: 'Angular Core',
        icon: 'computer',
        summary: 'Server-Side Rendering genera HTML en el servidor para mejor SEO y performance inicial.',
        description: `SSR (Server-Side Rendering) permite que Angular renderice la aplicación en el servidor, enviando HTML completo al cliente.

**Angular Universal:**

- Implementa SSR en Angular
- Ahora integrado como @angular/ssr

**Beneficios:**

1. **SEO**: Los crawlers ven contenido completo
2. **Performance inicial**: Menos tiempo hasta FCP
3. **Dispositivos lentos**: Menos trabajo en cliente

**Hydration:**

Angular 17+ usa hydration no destructiva:
\`\`\`typescript
app.config.ts
providers: [
  provideClientHydration()
]
\`\`\`

**Consideraciones:**

- No todo necesita SSR
- Considera prerendering estático
- Angular SSR es para apps que lo necesitan`,
        keyPoints: [
          'SSR renderiza en el servidor',
          'Mejora SEO significativamente',
          'Angular 17+ tiene hydration no destructiva',
          'Usa provideClientHydration()',
          'Considera SSG/prerendering',
          'No todas las apps necesitan SSR'
        ],
        codeExample: `// angular.json
{
  "projects": {
    "app": {
      "architect": {
        "server": {
          "options": {
            "outputPath": "dist/my-app/server",
            "outputHashing": "media"
          }
        },
        "serve-ssr": {
          "options": {
            "browserTarget": "app:build",
            "serverTarget": "app:server"
          }
        }
      }
    }
  }
}

// Comandos
npm run build:ssr
npm run serve:ssr`,
        whenToUse: 'Usa SSR cuando SEO es crítico o hay requisitos de performance.',
        commonMistakes: [
          'Usar SSR sin necesitarlo',
          'No configurar hydration',
          'Olvidar window/document en servidor'
        ],
        interviewQuestion: '¿Cuándo usarías SSR vs SPA tradicional?',
        hasDemo: false
      }
    ]
  },
  {
    name: 'RxJS & Observables',
    icon: 'timeline',
    topics: [
      {
        id: 'observable',
        title: '¿Qué es un Observable?',
        slug: 'observable',
        category: 'RxJS & Observables',
        icon: 'radio_button_checked',
        summary: 'Una secuencia de valores que se emite asíncronamente y puede ser observada.',
        description: `Un Observable es una colección que llega de manera asíncrona over time. Es la base de RxJS y el patrón Observer.

**Características:**

- Emite valores (0 a muchos)
- Puede ser sincrónico o asincrónico
- Puede ser finito o infinito
- Es lazy (no ejecuta hasta que te suscribes)
- Puede ser cancelled (unsubscribe)

**Creación:**

\`\`\`typescript
// De array
of(1, 2, 3)

// De evento
fromEvent(document, 'click')

// De Promise
from(promise)

// Custom
new Observable(subscriber => { ... })
\`\`\``,
        keyPoints: [
          'Observable emite valores over time',
          'Es lazy hasta que te suscribes',
          'Usa subscribe() para escuchar',
          'Unsubscribe para cancelar',
          'Operators transforman datos',
          'Cold vs Hot observables'
        ],
        codeExample: `import { Observable } from 'rxjs';

const miObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

miObservable.subscribe({
  next: valor => console.log(valor),
  error: err => console.error(err),
  complete: () => console.log('Completado')
});

// Output: 1, 2, 3, Completado`,
        whenToUse: 'Usa Observables para flujos de datos asíncronos.',
        commonMistakes: [
          'Olvidar unsubscribe',
          'No manejar errores',
          'Confundir con Promise'
        ],
        interviewQuestion: '¿Qué es un Observable cold vs hot?',
        hasDemo: true,
        demoComponent: 'observables'
      },
      {
        id: 'observable-vs-promise',
        title: 'Diferencia entre Observable y Promise',
        slug: 'observable-vs-promise',
        category: 'RxJS & Observables',
        icon: 'compare',
        summary: 'Dos modelos diferentes para manejar asincronía con características distintas.',
        description: `**Promise:**

- Emite un solo valor
- No es lazy (ejecuta inmediatamente)
- No puede ser cancelled
- Solo maneja un valor o error
- Then chain es lineal

**Observable:**

- Emite múltiples valores (0 a muchos)
- Es lazy (no ejecuta hasta subscribe)
- Puede ser cancelled (unsubscribe)
- Operators para transformación
- Maneja flujos complejos

**Cuándo usar cada uno:**

- Promise: Operaciones únicas (HTTP GET simple)
- Observable: Streams de datos, múltiples valores, combinación`,
        keyPoints: [
          'Promise: single value, Observable: multiple',
          'Promise eager, Observable lazy',
          'Observable puede ser cancelled',
          'Operators transforman Observables',
          'Promise no tiene operators',
          'Usa from() para convertir Promise a Observable'
        ],
        codeExample: `// Promise - single value
const promise = new Promise(resolve => {
  resolve(42);
});

promise.then(val => console.log(val));

// Observable - multiple values
const observable$ = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => subscriber.next(3), 1000);
});

observable$.subscribe(val => console.log(val));
// Outputs: 1, 2, 3 (over time)

// Conversión
const obsFromPromise$ = from(promise);`,
        whenToUse: 'Usa Promise para una operación, Observable para flujos.',
        commonMistakes: [
          'Usar Promise para streams',
          'Olvidar unsubscribe con Observables',
          'No usar async/await correctamente'
        ],
        interviewQuestion: '¿Cómo convertirías una Promise a Observable?',
        hasDemo: true,
        demoComponent: 'observables'
      },
      {
        id: 'subject',
        title: '¿Qué es un Subject?',
        slug: 'subject',
        category: 'RxJS & Observables',
        icon: 'hub',
        summary: 'Un tipo especial de Observable que permite múltiples suscripciones y emitir valores manualmente.',
        description: `Un Subject es un tipo especial de Observable que puede emitir valores activamente y tiene múltiples suscriptores.

**Características:**

- Es both Observable y Observer
- Puede emitir valores manualmente con .next()
- Es hot (comparte ejecución entre suscriptores)
- Cada suscriptor recibe el mismo valor
- No tiene valor inicial

**Tipos de Subject:**

1. **Subject**: Sin valor inicial
2. **BehaviorSubject**: Con valor inicial, emite el último valor a nuevos suscriptores
3. **ReplaySubject**: Emite valores anteriores a nuevos suscriptores
4. **AsyncSubject**: Emite solo el último valor cuando completa`,
        keyPoints: [
          'Subject es Observable y Observer',
          'Usa .next() para emitir valores',
          'Es hot - comparte ejecución',
          'BehaviorSubject tiene valor inicial',
          'ReplaySubject replay valores pasados',
          'Úsalo para state management'
        ],
        codeExample: `import { Subject, BehaviorSubject } from 'rxjs';

const subject = new Subject<string>();

subject.subscribe(v => console.log('A:', v));
subject.next('Hola');
subject.subscribe(v => console.log('B:', v));
subject.next('Mundo');

// Output:
// A: Hola
// A: Mundo
// B: Mundo

// BehaviorSubject
const behavior$ = new BehaviorSubject('inicial');

behavior$.subscribe(v => console.log('A:', v));
behavior$.next('nuevo');
behavior$.subscribe(v => console.log('B:', v));

// Output:
// A: inicial
// A: nuevo
// B: nuevo`,
        whenToUse: 'Usa Subject para compartir datos entre componentes/servicios.',
        commonMistakes: [
          'Confundir Subject con Observable normal',
          'Olvidar que es hot',
          'No usar BehaviorSubject para state'
        ],
        interviewQuestion: '¿Cuándo usarías Subject vs BehaviorSubject?',
        hasDemo: true,
        demoComponent: 'observables'
      },
      {
        id: 'subject-vs-behaviorsubject',
        title: 'Diferencia entre Subject y BehaviorSubject',
        slug: 'subject-vs-behaviorsubject',
        category: 'RxJS & Observables',
        icon: 'all_inclusive',
        summary: 'Subject no tiene valor inicial, BehaviorSubject sí y emite el último valor a nuevos suscriptores.',
        description: `**Subject:**

- No tiene valor inicial
- Nuevos suscriptores NO reciben el último valor emitido
- Si no hay emisión previa, no hay valor

\`\`\`typescript
const subject = new Subject<string>();
subject.subscribe(v => console.log(v)); // No recibe nada
subject.next('Hola'); // Solo si hay suscripción activa
\`\`\`

**BehaviorSubject:**

- Requiere valor inicial
- Nuevos suscriptores RECIBEN inmediatamente el último valor
- Siempre tiene un "current value"

\`\`\`typescript
const behavior$ = new BehaviorSubject('inicial');
behavior$.subscribe(v => console.log(v)); // Recibe 'inicial' inmediatamente
\`\`\`

**Caso de uso:**

- Subject: Eventos, notificaciones
- BehaviorSubject: State management, valores actuales`,
        keyPoints: [
          'BehaviorSubject tiene valor inicial',
          'Nuevos suscriptores reciben último valor',
          'Subject no tiene valor hasta que se emite',
          'BehaviorSubject siempre tiene current value',
          'Úsalo para state management',
          'Subject para eventos sin estado'
        ],
        codeExample: `// Subject - sin valor inicial
const miSubject = new Subject<string>();

miSubject.subscribe(v => console.log('S1:', v));
miSubject.next('A');

miSubject.subscribe(v => console.log('S2:', v));
miSubject.next('B');

// Output:
// S1: A
// S1: B
// S2: B

// BehaviorSubject - con valor inicial
const miBehavior$ = new BehaviorSubject('inicial');

miBehavior$.subscribe(v => console.log('B1:', v));
miBehavior$.next('A');

miBehavior$.subscribe(v => console.log('B2:', v));
miBehavior$.next('B');

// Output:
// B1: inicial
// B1: A
// B2: A
// B1: B
// B2: B`,
        whenToUse: 'Usa BehaviorSubject para state, Subject para eventos.',
        commonMistakes: [
          'Usar Subject cuando necesitas valor actual',
          'Olvidar el valor inicial',
          'No desuscribir'
        ],
        interviewQuestion: '¿Cómo implementarías un state service?',
        hasDemo: true,
        demoComponent: 'observables'
      }
    ]
  },
  {
    name: 'Routing & Navigation',
    icon: 'route',
    topics: [
      {
        id: 'angular-router',
        title: '¿Qué es Angular Router?',
        slug: 'angular-router',
        category: 'Routing & Navigation',
        icon: 'navigation',
        summary: 'El sistema de navegación de Angular para crear SPAs con múltiples vistas.',
        description: `Angular Router permite navegación en Single Page Applications sin recargar la página.

**Conceptos clave:**

- **Routes**: Definición de URLs a componentes
- **Router Outlet**: Donde se renderiza el componente
- **RouterLink**: Navegación declarativa
- **ActivatedRoute**: Acceso a información de la ruta actual

**Configuración básica:**

\`\`\`typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
\`\`\``,
        keyPoints: [
          'Routes define URL a componentes',
          'router-outlet renderiza componentes',
          'RouterLink para navegación',
          'ActivatedRoute para params',
          'Soporta child routes',
          'Guards y resolvers disponibles'
        ],
        codeExample: `// app.routes.ts
export const routes: Routes = [
  { 
    path: 'usuarios', 
    children: [
      { path: '', component: ListaComponent },
      { path: ':id', component: DetalleComponent }
    ]
  }
];

// Template
<a routerLink="/usuarios">Usuarios</a>
<a [routerLink]="['/usuarios', usuario.id]">Detalle</a>
<router-outlet></router-outlet>

// Componente
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe(p => this.id = p['id']);
}`,
        whenToUse: 'Usa Router para navegación entre vistas.',
        commonMistakes: [
          'No configurar rutas correctamente',
          'Olvidar router-outlet',
          'No unsubscribe de params'
        ],
        interviewQuestion: '¿Cómo pasarías parámetros entre rutas?',
        hasDemo: true,
        demoComponent: 'routing'
      },
      {
        id: 'route-guard',
        title: '¿Qué es un Route Guard?',
        slug: 'route-guard',
        category: 'Routing & Navigation',
        icon: 'security',
        summary: 'Funciones que controlan el acceso a rutas basándose en condiciones.',
        description: `Los Route Guards controlan si una ruta puede ser accedida.

**Tipos de Guards:**

1. **CanActivate**: ¿Puede acceder a la ruta?
2. **CanActivateChild**: ¿Puede acceder a rutas hijo?
3. **CanDeactivate**: ¿Puede salir de la ruta actual?
4. **CanLoad**: ¿Puede cargar el módulo lazy?
5. **CanMatch**: ¿Puede hacer match con la ruta?`,
        keyPoints: [
          'CanActivate controla acceso',
          'CanDeactivate para confirmar salida',
          'CanLoad para lazy loading',
          'Returns boolean o UrlTree',
          'Inyecta servicios para lógica',
          'Múltiples guards posibles'
        ],
        codeExample: `@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

// En rutas
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard]
}`,
        whenToUse: 'Usa guards para protección de rutas.',
        commonMistakes: [
          'No retornar valor correcto',
          'Olvidar injectar servicios',
          'No manejar async'
        ],
        interviewQuestion: '¿Cómo implementarías un guard de autenticación?',
        hasDemo: true,
        demoComponent: 'routing'
      },
      {
        id: 'resolver',
        title: '¿Qué es un resolver?',
        slug: 'resolver',
        category: 'Routing & Navigation',
        icon: 'download',
        summary: 'Funciones que precargan datos antes de activar una ruta.',
        description: `Un Resolver asegura que los datos estén disponibles antes de que el componente se renderice.

**¿Por qué usarlo?**

- Evitar "loading spinners" en componentes
- Garantizar datos disponibles
- Manejo centralizado de datos

**Diferencia con CanActivate:**

- CanActivate: decide si acceder
- Resolver: espera datos antes de mostrar`,
        keyPoints: [
          'Resolvers precargan datos',
          'El componente recibe datos resueltos',
          'Retorna Observable/Promise',
          'Usa route.data para acceder',
          'Maneja errores apropiadamente',
          'Útil para datos críticos'
        ],
        codeExample: `@Injectable({ providedIn: 'root' })
export class UsuarioResolver implements Resolve<Usuario> {
  constructor(private service: UsuarioService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
    const id = route.paramMap.get('id');
    return this.service.getUsuario(id);
  }
}

// Ruta
{
  path: 'usuario/:id',
  component: UsuarioComponent,
  resolve: { usuario: UsuarioResolver }
}

// Componente
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const usuario = this.route.snapshot.data['usuario'];
  // O subscribe para reactivity
  this.route.data.subscribe(d => this.usuario = d.usuario);
}`,
        whenToUse: 'Usa resolver cuando necesitas datos antes de mostrar el componente.',
        commonMistakes: [
          'No acceder a los datos correctamente',
          'No manejar errores del resolver',
          'Confundir con CanActivate'
        ],
        interviewQuestion: '¿Cuándo usarías un resolver vs cargar datos en ngOnInit?',
        hasDemo: true,
        demoComponent: 'routing'
      }
    ]
  },
  {
    name: 'Components & Directives',
    icon: 'widgets',
    topics: [
      {
        id: 'directives',
        title: '¿Qué son las directivas?',
        slug: 'directives',
        category: 'Components & Directives',
        icon: 'code',
        summary: 'Instrucciones en el DOM que extienden el comportamiento de elementos.',
        description: `Las directivas son clases que añaden comportamiento al DOM.

**Tipos:**

1. **Components**: Directivas con template
2. **Structural**: *ngIf, *ngFor, *ngSwitch (cambian estructura)
3. **Attribute**: Cambian apariencia/comportamiento

**Custom Directives:**

\`\`\`typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: string;
  
  constructor(private el: ElementRef) {}
  
  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }
}
\`\`\``,
        keyPoints: [
          'Directivas extienden el DOM',
          'Components son directivas con template',
          'Structural: *ngIf, *ngFor',
          'Attribute: [class], [style]',
          'Usa @Input para pasar datos',
          'Usa ElementRef para acceder al DOM'
        ],
        codeExample: `@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  @HostListener('mouseenter') onHover() {
    // Mostrar tooltip
  }
  
  @HostListener('mouseleave') onLeave() {
    // Ocultar tooltip
  }
}

// Uso
<p appTooltip="Mensaje de ayuda">Texto</p>`,
        whenToUse: 'Usa directivas para reusable DOM logic.',
        commonMistakes: [
          'Confundir con components',
          'Manipular DOM directamente',
          'No usar Renderer2'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre componente y directiva?',
        hasDemo: true,
        demoComponent: 'directives'
      },
      {
        id: 'ng-container-vs-div',
        title: 'Diferencia entre ng-container y div',
        slug: 'ng-container-vs-div',
        category: 'Components & Directives',
        icon: 'view_quilt',
        summary: 'ng-container no渲染a un elemento en el DOM, div sí.',
        description: `**ng-container:**

- No existe en el DOM final
- No puede tener estilos
- No puede tener directivas estructurales anidadas
- Solo estructura lógica

**div:**

- Crea un elemento real en el DOM
- Puede tener estilos y clases
- Afecta el layout

**Ejemplo:**

\`\`\`html
<!-- ng-container no aparece en DOM -->
<ng-container *ngIf="mostrar">
  <p>Solo este contenido</p>
</ng-container>

<!-- div crea elemento -->
<div *ngIf="mostrar">
  <p>Este también</p>
</div>
\`\`\``,
        keyPoints: [
          'ng-container no renderiza elemento',
          'div sí renderiza en DOM',
          'ng-container no tiene estilos',
          'Úsalo para evitar wrappers innecesarios',
          'ng-container con *ngFor/*ngIf',
          'div para estilos y layout'
        ],
        codeExample: `<!-- Evita wrappers innecesarios -->
<ng-container *ngFor="let item of items">
  <td>{{ item.name }}</td>
  <td>{{ item.value }}</td>
</ng-container>

<!-- Con ng-template -->
<ng-container *ngTemplateOutlet="template; context: ctx">
</ng-container>

<!-- Error común: div anidado en ng-container no funciona -->
<ng-container>
  <div *ngIf="true">
    <!-- Esto funciona -->
  </div>
</ng-container>`,
        whenToUse: 'Usa ng-container para estructura lógica sin DOM extra.',
        commonMistakes: [
          'Confundir cuando usar cada uno',
          'Intentar poner estilos en ng-container',
          'Anidar *ngIf en ng-container'
        ],
        interviewQuestion: '¿Cuándo usarías ng-container en lugar de div?',
        hasDemo: false
      },
      {
        id: 'viewchild',
        title: '¿Qué es ViewChild?',
        slug: 'viewchild',
        category: 'Components & Directives',
        icon: 'visibility',
        summary: 'Decorador para acceder a elementos del template desde el componente.',
        description: `ViewChild permite acceder a elementos del template desde el componente.

**Características:**

- Accede a elementos del template propio
- Disponible en ngAfterViewInit
- Puede acceder a componentes hijos
- Soporta static option (Angular 8+)

**Static vs Dynamic:**

- **static: false** (default): Disponible en ngAfterViewInit
- **static: true**: Disponible en constructor`,
        keyPoints: [
          'ViewChild accede al template',
          'Usa ElementRef para elementos nativos',
          'Accede a componentes hijos',
          'Disponible en ngAfterViewInit',
          'static: true para @if excluded',
          'Múltiples con ViewChildren'
        ],
        codeExample: `@Component({
  selector: 'app-mi-componente',
  template: \`
    <input #miInput type="text">
    <app-hijo #hijo></app-hijo>
  \`
})
export class MiComponenteComponent 
  implements AfterViewInit {
  
  @ViewChild('miInput') inputEl: ElementRef;
  @ViewChild('hijo') childComp: HijoComponent;
  @ViewChildren('miInput') inputs: QueryList;
  
  ngAfterViewInit() {
    this.inputEl.nativeElement.focus();
    this.childComp.metodoDelHijo();
  }
}`,
        whenToUse: 'Usa ViewChild para acceder a elementos del DOM o componentes hijos.',
        commonMistakes: [
          'Acceder en ngOnInit (undefined)',
          'No usar ElementRef correctamente',
          'Olvidar static option'
        ],
        interviewQuestion: '¿Cómo accederías a un elemento del DOM desde el componente?',
        hasDemo: true,
        demoComponent: 'viewchild'
      },
      {
        id: 'contentchild',
        title: '¿Qué es ContentChild?',
        slug: 'contentchild',
        category: 'Components & Directives',
        icon: 'dynamic_feed',
        summary: 'Decorador para acceder a contenido proyectado desde el padre.',
        description: `ContentChild accede a contenido que se proyecta desde un componente padre (usando ng-content).

**Diferencia con ViewChild:**

- ViewChild: elementos del template propio
- ContentChild: contenido proyectado desde fuera

**Características:**

- Disponible en ngAfterContentInit
- Accede a elementos delng-content
- Para múltiples: ContentChildren`,
        keyPoints: [
          'ContentChild accede a ng-content',
          'Proyección de contenido desde padre',
          'Disponible en ngAfterContentInit',
          'ContentChildren para múltiples',
          'Usa ElementRef o ComponentRef',
          'Similar API a ViewChild'
        ],
        codeExample: `// Componente hijo (card.component.ts)
@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <h2>Card Title</h2>
      <ng-content></ng-content>
    </div>
  \`
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') headerEl: ElementRef;
  
  ngAfterContentInit() {
    console.log(this.headerEl);
  }
}

// Uso (padre)
<app-card>
  <p>Contenido proyectado</p>
  <span #header>Header</span>
</app-card>`,
        whenToUse: 'Usa ContentChild para acceder a contenido proyectado.',
        commonMistakes: [
          'Confundir con ViewChild',
          'Acceder antes de ngAfterContentInit',
          'No entender ng-content'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre ViewChild y ContentChild?',
        hasDemo: true,
        demoComponent: 'viewchild'
      },
      {
        id: 'trackby',
        title: '¿Qué hace trackBy en ngFor?',
        slug: 'trackby',
        category: 'Components & Directives',
        icon: 'repeat',
        summary: 'Función que ayuda Angular a identificar qué elementos cambiaron en una lista.',
        description: `trackBy ayuda Angular a rastrear elementos en *ngFor para minimizar re-renders.

**Problema sin trackBy:**

Angular recrea todos los elementos DOM cuando cambia la lista, incluso si los datos son los mismos.

**Con trackBy:**

Angular sabe qué elemento cambió y solo actualiza ese.

**Implementación:**

\`\`\`typescript
trackById(index: number, item: Item): any {
  return item.id; // Unique identifier
}
\`\`\``,
        keyPoints: [
          'trackBy identifica elementos únicos',
          'Reduce re-renders innecesarios',
          'Usa id único como return',
          'Mejora performance en listas',
          'Función: (index, item) => identifier',
          'Útil con arrays que cambian frecuentemente'
        ],
        codeExample: `@Component({
  template: \`
    <!-- Con trackBy - optimizado -->
    <li *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </li>
    
    <!-- Sin trackBy - recreate siempre -->
    <li *ngFor="let item of items">
      {{ item.name }}
    </li>
  \`
})
export class ListComponent {
  items = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' }
  ];
  
  trackById(index: number, item: any): number {
    return item.id;
  }
  
  updateList() {
    // Cambia orden pero mismo id
    this.items = [this.items[1], this.items[0]];
    // Con trackBy: solo reordena DOM
    // Sin trackBy: destroy y recreate
  }
}`,
        whenToUse: 'Usa trackBy en *ngFor para listas que cambian.',
        commonMistakes: [
          'No usar trackBy en listas grandes',
          'Retornar índice en lugar de id',
          'trackBy con id no único'
        ],
        interviewQuestion: '¿Por qué trackBy mejora rendimiento?',
        hasDemo: true,
        demoComponent: 'data-binding'
      }
    ]
  },
  {
    name: 'Modules & Architecture',
    icon: 'library_books',
    topics: [
      {
        id: 'lazy-loading',
        title: '¿Qué es Lazy Loading y cuándo usarlo?',
        slug: 'lazy-loading',
        category: 'Modules & Architecture',
        icon: 'hourglass_empty',
        summary: 'Técnica para cargar módulos bajo demanda, mejorando el tiempo de carga inicial.',
        description: `Lazy Loading carga módulos solo cuando se necesitan, no al inicio.

**Beneficios:**

- Menor tiempo de carga inicial
- Menos JS total descargado
- Mejor UX en apps grandes
- Código splitted automáticamente

**Implementación:**

\`\`\`typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule)
}
\`\`\`

**Preloading:**

\`\`\`typescript
RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
})
\`\`\``,
        keyPoints: [
          'Carga módulos bajo demanda',
          'Mejora initial load time',
          'Usa loadChildren para módulos',
          'PreloadAllModules precarga demás',
          'QuicklinkStrategy para prefetch inteligente',
          'Beneficia apps grandes'
        ],
        codeExample: `// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

// Preloading
RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});`,
        whenToUse: 'Usa lazy loading para módulos que no son necesarios inicialmente.',
        commonMistakes: [
          'No usar lazy loading en apps grandes',
          'Olvidar que es async',
          'No manejar errores de carga'
        ],
        interviewQuestion: '¿Cómo implementarías lazy loading?',
        hasDemo: false
      },
      {
        id: 'angular-module',
        title: '¿Qué es un Angular module?',
        slug: 'angular-module',
        category: 'Modules & Architecture',
        icon: 'inventory_2',
        summary: 'Un contenedor para agrupar componentes, servicios y otras funcionalidades.',
        description: `Un NgModule organiza el código en bloques cohesivos de funcionalidad.

**Decorador @NgModule:**

\`\`\`typescript
@NgModule({
  declarations: [],      // Componentes, directivas, pipes
  imports: [],            // Otros módulos
  providers: [],         // Servicios
  bootstrap: []          // Componente raíz (AppModule)
})
export class MiModule {}
\`\`\`

**Conceptos:**

- Bundle de funcionalidad relacionada
- Configura el injector
- Exporta componentes para uso externo
- Ideal para lazy loading`,
        keyPoints: [
          'NgModule agrupa funcionalidad',
          'declarations: componentes propios',
          'imports: módulos externos',
          'providers: servicios',
          'bootstrap: componente raíz',
          'export: para uso externo'
        ],
        codeExample: `@NgModule({
  declarations: [
    MiComponenteComponent,
    MiDirectivaDirective,
    MiPipePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MiComponenteComponent
  ],
  providers: [
    MiServicioService
  ]
})
export class FeaturesModule {}`,
        whenToUse: 'Usa módulos para organizar funcionalidad.',
        commonMistakes: [
          'Un módulo muy grande',
          'No exportar lo necesario',
          'Olvidar CommonModule'
        ],
        interviewQuestion: '¿Cuál es la diferencia entre declarations e imports?',
        hasDemo: false
      },
      {
        id: 'browsermodule-vs-commonmodule',
        title: 'Diferencia entre BrowserModule y CommonModule',
        slug: 'browsermodule-vs-commonmodule',
        category: 'Modules & Architecture',
        icon: 'view_module',
        summary: 'BrowserModule incluye CommonModule más servicios del navegador.',
        description: `**BrowserModule:**

- Exporta CommonModule
- Prove servicios de bootstrapping de navegador
- Solo importar EN APP ROOT una vez
- Exports: CommonModule + browser-specific

**CommonModule:**

- Directivas: *ngIf, *ngFor, *ngSwitch
- Pipes: AsyncPipe, DatePipe, etc.
- Directivas: ngClass, ngStyle, ngNonBindable

**Regla:**

- AppModule (root): BrowserModule
- Feature/Lazy Modules: CommonModule
- Shared Modules: CommonModule`,
        keyPoints: [
          'BrowserModule = CommonModule + browser',
          'Solo BrowserModule en root',
          'CommonModule en feature modules',
          'Contiene *ngIf, *ngFor',
          'Contiene Pipes comunes',
          'Shared modules usan CommonModule'
        ],
        codeExample: `// AppModule - solo una vez
@NgModule({
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

// FeatureModule - CommonModule
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MiComponente]
})
export class FeatureModule {}

// SharedModule - CommonModule
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, MiComponente]
})
export class SharedModule {}`,
        whenToUse: 'Usa BrowserModule solo en AppModule, CommonModule en otros.',
        commonMistakes: [
          'Importar BrowserModule múltiples veces',
          'Olvidar CommonModule en features',
          'No entender cuándo usar cada uno'
        ],
        interviewQuestion: '¿Por qué BrowserModule solo se importa una vez?',
        hasDemo: false
      }
    ]
  },
  {
    name: 'Forms',
    icon: 'edit_note',
    topics: [
      {
        id: 'angular-forms',
        title: '¿Qué son Angular Forms?',
        slug: 'angular-forms',
        category: 'Forms',
        icon: 'dynamic_form',
        summary: 'Sistemas para manejar formularios: Template-driven y Reactive.',
        description: `Angular Forms proporciona dos enfoques:

**Template-Driven Forms:**

- Directivas en el template
- NgModel para two-way binding
- Validación con directivas
- Más simple, menos control

\`\`\`typescript
<form #miForm="ngForm">
  <input [(ngModel)]="nombre" name="nombre" required>
</form>
\`\`\`

**Reactive Forms:**

- Programático en el componente
- FormControl, FormGroup, FormArray
- Validación custom más fácil
- Mejor para forms complejos

\`\`\`typescript
form = new FormGroup({
  nombre: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email])
});
\`\`\``,
        keyPoints: [
          'Template-driven: ngModel, simple',
          'Reactive: FormGroup, complejo',
          'Validators: required, email, pattern',
          'Reactive mejor para forms dinámicos',
          'FormArray para arrays dinámicos',
          'Both soportan custom validators'
        ],
        codeExample: `// Reactive Form
@Component({
  selector: 'app-mi-form',
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="nombre">
      <div *ngIf="form.get('nombre').touched && form.get('nombre').invalid">
        Error
      </div>
      <button type="submit" [disabled]="form.invalid">Enviar</button>
    </form>
  \`
})
export class MiFormComponent {
  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  onSubmit() {
    console.log(this.form.value);
  }
}`,
        whenToUse: 'Usa Reactive Forms para complex forms, Template-driven para simples.',
        commonMistakes: [
          'Confundir los dos enfoques',
          'No desuscribir en Reactive Forms',
          'Olvidar imports de ReactiveFormsModule'
        ],
        interviewQuestion: '¿Cuándo usarías Reactive Forms vs Template-driven?',
        hasDemo: true,
        demoComponent: 'forms'
      },
      {
        id: 'state-management',
        title: '¿Qué es State Management en Angular?',
        slug: 'state-management',
        category: 'Forms',
        icon: 'storage',
        summary: 'Patrones y herramientas para gestionar el estado de la aplicación.',
        description: `State Management organiza cómo compartes y modificas datos entre componentes.

**Opciones:**

1. **Services + RxJS** (simple)
   - BehaviorSubject para estado
   - Compartido entre componentes

2. **NgRx** (redux pattern)
   - Store, Actions, Reducers, Effects
   - Más boilerplate, más estructura

3. **Akita** (alternativa)
   - Más opinionated
   - APIs simples

4. **Signals** (Angular 16+)
   - Reactivo sin RxJS
   - compute(), effect()`,
        keyPoints: [
          'Services + RxJS para casos simples',
          'NgRx para apps complejas',
          'BehaviorSubject como store básico',
          'Signals nueva opción en Angular 16+',
          'Evita prop drilling',
          'Single source of truth'
        ],
        codeExample: `// Service básico con BehaviorSubject
@Injectable({ providedIn: 'root' })
export class StateService {
  private _state = new BehaviorSubject<State>(initialState);
  state$ = this._state.asObservable();
  
  get state() { return this._state.getValue(); }
  
  updateState(partial: Partial<State>) {
    this._state.next({ ...this.state, ...partial });
  }
}

// Componente suscribe
constructor(private state: StateService) {
  this.state.state$.subscribe(s => this.datos = s.datos);
}

// Signals (Angular 16+)
count = signal(0);
double = computed(() => this.count() * 2);`,
        whenToUse: 'Usa Services + RxJS simple, NgRx para apps grandes.',
        commonMistakes: [
          'Overengineering con NgRx para apps pequeñas',
          'Olvidar unsubscribe',
          'Mutar estado en lugar de immutability'
        ],
        interviewQuestion: '¿Cómo implementarías state management sin NgRx?',
        hasDemo: false
      }
    ]
  },
  {
    name: 'Tools & CLI',
    icon: 'build',
    topics: [
      {
        id: 'angular-cli',
        title: '¿Qué es Angular CLI?',
        slug: 'angular-cli',
        category: 'Tools & CLI',
        icon: 'terminal',
        summary: 'Interfaz de línea de comandos para crear, desarrollar y mantener aplicaciones Angular.',
        description: `Angular CLI es la herramienta oficial para desarrollar Angular.

**Comandos principales:**

\`\`\`bash
# Nuevo proyecto
ng new my-app

# Generar componentes
ng generate component mi-componente
ng g c mi-componente

# Generar servicios
ng generate service mi-servicio
ng g s mi-servicio

# Build
ng build
ng build --configuration=production

# Serve
ng serve
ng serve --open
\`\`\`

**Schematics:**

Generadores de código que siguen best practices.`,
        keyPoints: [
          'ng new crea proyectos',
          'ng generate (g) crea código',
          'ng build compila',
          'ng serve levanta dev server',
          'ng test corre tests',
          'Usa --standalone con ng new'
        ],
        codeExample: `# Instalar CLI global
npm install -g @angular/cli

# Nuevo proyecto
ng new mi-proyecto --routing --style=scss

# Generadores
ng g c components/header
ng g s services/api
ng g m modules/admin
ng g guard guards/auth
ng g directive directives/highlight

# Build
ng build --configuration=production --optimization`,
        whenToUse: 'Usa Angular CLI para todo en Angular.',
        commonMistakes: [
          'Crear archivos manualmente',
          'No usar generators',
          'No actualizar CLI'
        ],
        interviewQuestion: '¿Qué comandos usarías para crear un componente?',
        hasDemo: false
      },
      {
        id: 'testing',
        title: '¿Qué Testing Framework se usa?',
        slug: 'testing',
        category: 'Tools & CLI',
        icon: 'science',
        summary: 'Jasmine + Karma + Protractor para testing en Angular.',
        description: `**Stack de testing en Angular:**

1. **Jasmine**: Framework de testing (describe, it, expect)
2. **Karma**: Test runner (ejecuta tests en navegadores)
3. **Angular Testing Library**: Utilidades para testing

**Testing Types:**

1. **Unit Tests**: Jasmine + Testing Utilities
2. **Integration**: Módulos parciales
3. **E2E**: Cypress/Protractor

**Comandos:**

\`\`\`bash
ng test           # Unit tests
ng test --watch   # Con watch
ng e2e           # E2E tests
\`\`\``,
        keyPoints: [
          'Jasmine para unit tests',
          'Karma como test runner',
          'TestBed para testing de componentes',
          'Fixtures para acceso al template',
          'describe/it/expect syntax',
          'Usa Angular Testing Library'
        ],
        codeExample: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComponenteComponent } from './mi-componente.component';

describe('MiComponenteComponent', () => {
  let component: MiComponenteComponent;
  let fixture: ComponentFixture<MiComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiComponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const el = fixture.nativeElement.querySelector('h1');
    expect(el.textContent).toContain('Título');
  });
});`,
        whenToUse: 'Usa testing desde el inicio del proyecto.',
        commonMistakes: [
          'No escribir tests',
          'No usar TestBed correctamente',
          'No mockear dependencias'
        ],
        interviewQuestion: '¿Cómo testearías un componente Angular?',
        hasDemo: false
      }
    ]
  }
];
