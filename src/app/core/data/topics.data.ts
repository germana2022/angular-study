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
        summary:
          'El nuevo motor de renderizado de Angular que mejora el rendimiento y reduce el tamaño del bundle.',
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
          'Genera código más legible y depurable',
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
        whenToUse:
          'Ivy está habilitado por defecto en Angular 12+, no necesitas configuración adicional. Úsalo en todas las aplicaciones nuevas.',
        commonMistakes: [
          'Intentar deshabilitar Ivy (no recomendado)',
          'No actualizar proyectos antiguos a Ivy',
          'Usar View Engine APIs obsoletas',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre View Engine e Ivy?',
        interviewAnswerShort:
          'Ivy es el nuevo compilador de Angular que compila por componente (locality), mientras View Engine compilaba todo el módulo juntos. Ivy reduce el bundle y mejora el rendimiento.',
        interviewAnswerStructured: `**Diferencias principales:**

1. **Compilación**: Ivy compila por componente (locality), View Engine compilaba todo el módulo
2. **Bundle**: Ivy genera bundles más pequeños
3. **Debug**: Ivy genera código más legible
4. **Tiempo**: Ivy compila más rápido

**Ventajas de Ivy:**
- Tree-shaking mejorado
- Lazy loading a nivel de componente
- Templates más pequeñas y legibles
- Mejor rendimiento en general`,
        hasDemo: false,
      },
      {
        id: 'change-detection',
        title: 'Change Detection',
        slug: 'change-detection',
        category: 'Angular Core',
        icon: 'sync',
        summary:
          'El mecanismo de Angular para sincronizar el estado de los componentes con el DOM.',
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
          'Use CD strategies para aplicaciones grandes',
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
        whenToUse:
          'Usa Default para apps pequeñas y OnPush para componentes que reciben datos via @Input() immutables.',
        commonMistakes: [
          'No entender cuándo se dispara CD',
          'Olvidar que OnPush requiere datos inmutables',
          'Mutar objetos en lugar de crear nuevos',
        ],
        interviewQuestion: '¿Cómo funciona Change Detection en Angular?',
        interviewAnswerShort:
          'Angular crea un árbol de componentes y verifica si los valores han cambiado después de cada evento (click, HTTP, setTimeout), actualizando el DOM automáticamente.',
        interviewAnswerStructured: `**¿Cómo funciona?**

1. Angular crea un árbol de componentes
2. Cada componente tiene su Change Detection Strategy
3. Cuando ocurre un evento, Angular recorre el árbol verificando cambios
4. Si detecta cambios, actualiza el DOM

**Desencadenantes de CD:**
- Eventos del usuario (click, input)
- Respuestas HTTP
- setTimeout/setInterval
- Suscripciones a observables

**Estrategias:**
- **Default**: Verifica en cada evento del árbol
- **OnPush**: Solo verifica cuando cambian las inputs o hay eventos locales`,
        hasDemo: true,
        demoComponent: 'change-detection',
      },
      {
        id: 'default-vs-onpush',
        title: 'Diferencia entre Default y OnPush',
        slug: 'default-vs-onpush',
        category: 'Angular Core',
        icon: 'compare_arrows',
        summary:
          'Dos estrategias de Change Detection con implicaciones diferentes en el rendimiento.',
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
          'Combine con señales para máximo rendimiento',
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
        whenToUse:
          'Usa OnPush en componentes que reciben datos via @Input() y quieres optimizar rendimiento.',
        commonMistakes: [
          'Mutar objetos con OnPush',
          'No usar ChangeDetectorRef cuando es necesario',
          'Olvidar que async pipe funciona con OnPush',
        ],
        interviewQuestion: '¿Cuándo usarías OnPush vs Default?',
        interviewAnswerShort:
          'Usa Default para apps pequeñas y OnPush para componentes que reciben datos via @Input() immutables en apps medianas/grandes.',
        interviewAnswerStructured: `**Default Strategy:**
- Se verifica en cada evento del árbol de componentes
- Funciona con datos mutables
- Más fácil de usar pero menos performante

**OnPush Strategy:**
- Solo se verifica cuando:
  - Una @Input() referencia cambia (comparación por referencia)
  - Un evento se origina en el componente o sus hijos
  - Se llama manualmente a markForCheck() o detectChanges()
  - Un observable emite a través del async pipe

**Cuándo usar OnPush:**
- Componentes puros que reciben datos via @Input()
- Listas grandes con muchos elementos
- Componentes que no cambian frecuentemente
- Apps de tamaño medio a grande`,
        hasDemo: true,
        demoComponent: 'change-detection',
      },
      {
        id: 'ngzone',
        title: '¿Qué es NgZone?',
        slug: 'ngzone',
        category: 'Angular Core',
        icon: 'layers',
        summary:
          'Un servicio que gestiona zonas de ejecución para controlar cuando se dispara Change Detection.',
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
          'Ejecuta código intensivo fuera de la zona',
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
          'No optimizar operaciones intensivas',
        ],
        interviewQuestion: '¿Cómo optimizarías el rendimiento usando NgZone?',
        interviewAnswerShort:
          'Usa runOutsideAngular() para ejecutar código que no necesita actualizar la vista, evitando Change Detection innecesario.',
        interviewAnswerStructured: `**NgZone** gestiona la zona de Angular para controlar cuándo se dispara Change Detection.

**runOutsideAngular():**
- Ejecuta código sin disparar CD
- Útil para第三方librerías, operaciones intensivas
- Ejemplo: setInterval, animaciones, tracking

**run():**
- Vuelve a entrar en la zona de Angular
- Necesario después de runOutsideAngular()

**Caso de uso común:**
\`\`\`typescript
this.ngZone.runOutsideAngular(() => {
  setInterval(() => {
    // No dispara CD
    this.contador++;
    //手动trigger CD
    this.ngZone.run(() => {});
  }, 1000);
});
\`\`\`

**Beneficios:**
- Optimiza rendimiento
- Evita CD innecesario
- Ideal para código que no actualiza la UI`,
        hasDemo: false,
      },
      {
        id: 'lifecycle-hooks',
        title: '¿Qué son los lifecycle hooks?',
        slug: 'lifecycle-hooks',
        category: 'Angular Core',
        icon: 'autorenew',
        summary:
          'Métodos que permiten ejecutar código en momentos específicos del ciclo de vida de un componente.',
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
          'Siempre desuscribirse en ngOnDestroy',
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
          'Hacer too much work en ngDoCheck',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre ngOnInit y el constructor?',
        interviewAnswerShort:
          'El constructor es para inyección de dependencias (se ejecuta antes que cualquier hook), ngOnInit es para inicialización del componente (después de que @Input() está disponible).',
        interviewAnswerStructured: `**Constructor:**
- Se ejecuta primero, antes que cualquier lifecycle hook
- Se usa principalmente para inyección de dependencias
- Angular resuelve las dependencias antes de crear el componente
- NO tienes acceso aún a @Input() y @Output()

**ngOnInit:**
- Se ejecuta una vez, después del primer ngOnChanges
- Es el lugar apropiado para lógica de inicialización
- TIENES acceso a todas las propiedades del componente
- Se llama solo una vez

**Orden de ejecución:**
1. Constructor
2. ngOnChanges
3. ngOnInit
4. ngDoCheck
5. ngAfterViewInit
6. ngOnDestroy

**Best Practice:**
- Constructor: solo DI y operaciones simples
- ngOnInit: lógica de inicialización, HTTP calls`,
        hasDemo: true,
        demoComponent: 'lifecycle-hooks',
      },
      {
        id: 'constructor-vs-ngoninit',
        title: 'Diferencia entre constructor y ngOnInit',
        slug: 'constructor-vs-ngoninit',
        category: 'Angular Core',
        icon: 'difference',
        summary:
          'El constructor es para inyección de dependencias, ngOnInit para inicialización del componente.',
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
          'ngOnInit es parte del lifecycle de Angular',
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
          'No implementar OnInit cuando necesitas',
        ],
        interviewQuestion: '¿Por qué no hacer HTTP calls en el constructor?',
        interviewAnswerShort:
          'Porque el constructor se ejecuta antes de que Angular configure las @Input() y el componente aún no está completamente inicializado, además de ser una mala práctica de separación de responsabilidades.',
        interviewAnswerStructured: `**Razones para no hacer HTTP calls en el constructor:**

1. **@Input() no disponible**: Las propiedades decoradas con @Input() aún no están configuradas
2. **No es el lugar correcto**: El constructor es para DI, no para lógica de negocio
3. **Difícil de testear**: Complica los unit tests
4. **Cambios en el futuro**: Angular podría cambiar el comportamiento del constructor

**Dónde hacer HTTP calls:**
- **ngOnInit()**: Lugar recomendado para inicialización
- **ngAfterViewInit()**: Si necesitas acceso al DOM primero

**Caso especial:**
- Si usas un resolver, los datos llegan antes de ngOnInit
- Si necesitas datos antes de renderizar el componente`,
        hasDemo: false,
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
          'Two-way requiere FormsModule',
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
        whenToUse:
          'Usa interpolation para texto, property para atributos, events para acciones, two-way para forms.',
        commonMistakes: [
          'Confundir property binding con interpolation',
          'Olvidar FormsModule para ngModel',
          'Usar () en lugar de [] para propiedades',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre property binding y event binding?',
        interviewAnswerShort:
          'Property Binding ([]) fluye del componente al template (actualiza propiedades), Event Binding () fluye del template al componente (maneja eventos del usuario).',
        interviewAnswerStructured: `**Property Binding []:**
- Dirección: Componente → Template
- Actualiza propiedades/atributos del DOM
- Ejemplo: [src], [disabled], [value]
- Usa corchetes []

**Event Binding ():**
- Dirección: Template → Componente
- Maneja eventos del usuario
- Ejemplo: (click), (input), (change)
- Usa paréntesis ()

**Diferencia clave:**
- Property binding: Angular actualiza el DOM
- Event binding: El usuario interactúa y dispara código

**Ejemplo:**
\`\`\`html
<img [src]="imagenUrl">           <!-- Property -->
<button (click)="onClick()">Click</button>  <!-- Event -->
\`\`\`

**Two-way Binding [(ngModel)]:**
- Combina property y event binding
- Sincroniza en ambas direcciones`,
        hasDemo: true,
        demoComponent: 'data-binding',
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
          'Crea pipes personalizados para lógica reusable',
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
          'No usar pure: false para pipes con estado',
        ],
        interviewQuestion: '¿Cómo crearías un pipe personalizado?',
        interviewAnswerShort:
          'Creas una clase que implemente PipeTransform con el decorador @Pipe, implementando el método transform() que devuelve el valor formateado.',
        interviewAnswerStructured: `**Pasos para crear un pipe:**

1. Crea una clase que implemente PipeTransform
2. Usa el decorador @Pipe con name único
3. Implementa el método transform()

**Ejemplo:**
\`\`\`typescript
@Pipe({ name: 'resumir' })
export class ResumirPipe implements PipeTransform {
  transform(value: string, limite: number = 50): string {
    if (value.length <= limite) return value;
    return value.substring(0, limite) + '...';
  }
}
\`\`\`

**Uso en template:**
\`\`\`html
{{ texto | resumir:100 }}
\`\`\`

**Tipos de pipes:**
- **Pure** (default): Solo se ejecuta cuando cambia la referencia
- **Impure** (pure: false): Se ejecuta en cada change detection

**Best practices:**
- Usa pipes puros por defecto
- Evita lógica compleja en pipes
- Los pipes no deben hacer HTTP calls`,
        hasDemo: false,
      },
      {
        id: 'dependency-injection',
        title: '¿Qué es Dependency Injection en Angular?',
        slug: 'dependency-injection',
        category: 'Angular Core',
        icon: 'construction',
        summary:
          'Un patrón de diseño donde las dependencias se inyectan en lugar de crearse dentro del componente.',
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
          'Los componentes también son injectables',
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
          'Circular dependencies',
        ],
        interviewQuestion: '¿Cómo configurarías un servicio como singleton?',
        interviewAnswerShort:
          'Usa @Injectable({ providedIn: "root" }) para que Angular cree una única instancia disponible en toda la aplicación.',
        interviewAnswerStructured: `**Método recomendado (Angular 6+):**
\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class MiServicioService {}
\`\`\`

**Otros métodos (menos recomendados):**
1. Agregar en providers del AppModule
\`\`\`typescript
@NgModule({
  providers: [MiServicioService]
})
export class AppModule {}
\`\`\`

2. providers a nivel de componente (no es singleton)
\`\`\`typescript
@Component({
  providers: [MiServicioService]
})
export class MiComponente {}
\`\`\`

**providedIn: 'root':**
- Crea el servicio como singleton automáticamente
- Se tree-shakea si no se usa
- No necesita declararlo en ningún módulo
- Es la mejor práctica recomendada

**providedIn: 'any':**
- Nueva instancia por módulo lazy loaded`,
        hasDemo: true,
        demoComponent: 'di',
      },
      {
        id: 'aot-compilation',
        title: '¿Qué es AOT Compilation?',
        slug: 'aot-compilation',
        category: 'Angular Core',
        icon: 'code',
        summary:
          'Compilación anticipada que convierte templates HTML y TypeScript en código JavaScript eficiente.',
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
          'Más seguro que JIT',
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
          'No usar --prod flag',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre AOT y JIT?',
        interviewAnswerShort:
          'AOT compila durante el build (antes de ejecutar en el navegador), JIT compila en el navegador al inicio de la aplicación. AOT es el modo predeterminado en producción.',
        interviewAnswerStructured: `**AOT (Ahead-of-Time):**
- Compila durante el proceso de build
- El código que llega al navegador ya está compilado
- Errores de template se detectan en build time
- Mejor rendimiento inicial
- Bundle más pequeño por tree-shaking
- Más seguro (no expuesta lógica de compilación)

**JIT (Just-in-Time):**
- Compila en el navegador al inicio
- Necesita el compilador en el navegador
- Más lento el primer render
- Útil para desarrollo (reload rápido)

**Configuración actual:**
- Desarrollo: JIT (más rápido el rebuild)
- Producción: AOT (habilitado por defecto)

**Comandos:**
\`\`\`bash
ng build          # AOT por defecto
ng build --aot=true   # Forzar AOT
ng serve         # JIT por defecto
\`\`\``,
        hasDemo: false,
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
          'Build de producción lo habilita automáticamente',
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
          'Side effects en módulos',
        ],
        interviewQuestion: '¿Cómo optimizarías el bundle size?',
        interviewAnswerShort:
          'Usa imports específicos en lugar de módulos completos, habilita AOT, usa providedIn: "root" en servicios, y habilita strict mode en TypeScript.',
        interviewAnswerStructured: `**Técnicas de optimización:**

1. **Imports específicos:**
\`\`\`typescript
// Bien - Tree shaking funciona
import { Component } from '@angular/core';

// Mal - Todo el módulo
import * as angular from '@angular/core';
\`\`\`

2. **Usa providedIn: 'root':**
- Permite tree shaking de servicios

3. **AOT Compilation:**
- Habilitado por defecto en producción

4. **Strict Mode TypeScript:**
- Elimina código no alcanzable

5. **Lazy Loading:**
- Carga módulos bajo demanda

6. **Evita librerías grandes:**
- Busca alternativas más pequeñas

7. **Budget en angular.json:**
\`\`\`json
"budgets": [
  { "type": "initial", "maximumWarning": "2MB" }
]
\`\`\`

**Resultado típico:**
- App vacía: ~200KB
- App pequeña: ~400KB
- App grande: ~800KB+`,
        hasDemo: false,
      },
      {
        id: 'performance-optimization',
        title: '¿Cómo optimizar performance en Angular?',
        slug: 'performance-optimization',
        category: 'Angular Core',
        icon: 'speed',
        summary:
          'Técnicas y mejores prácticas para mejorar el rendimiento de aplicaciones Angular.',
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
          'Optimiza imágenes y assets',
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
        commonMistakes: ['No usar OnPush', 'Olvidar trackBy', 'Memory leaks por observables'],
        interviewQuestion: '¿Cómo optimizarias una lista con 10,000 items?',
        interviewAnswerShort:
          'Usa virtual scrolling (CDK) para renderizar solo los elementos visibles, junto con trackBy y OnPush para minimizar re-renders.',
        interviewAnswerStructured: `**Solución completa:**

1. **Virtual Scrolling (Angular CDK):**
\`\`\`html
<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let item of items">{{item.name}}</div>
</cdk-virtual-scroll-viewport>
\`\`\`
- Solo renderiza ~20 elementos visibles
- El resto se renderiza al hacer scroll

2. **trackBy en ngFor:**
\`\`\`typescript
trackById(index: number, item: any): number {
  return item.id;
}
\`\`\`
- Evita recrear elementos que no cambiaron

3. **Change Detection OnPush:**
\`\`\`typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
\`\`\`
- Reduce verificaciones innecesarias

4. **Paginación (alternativa):**
- Carga datos en páginas
- Más simple que virtual scrolling

5. **Signals (Angular 16+):**
- Mejor rendimiento que RxJS para estado local`,
        hasDemo: false,
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
          'Mantén componentes pequeños y focused',
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
          'Mezclar responsabilidades',
        ],
        interviewQuestion: '¿Cómo organizarías un proyecto con 50+ componentes?',
        interviewAnswerShort:
          'Usa arquitectura por features con lazy loading: core (singletons), shared (reusable), features (funcionalidad específica), y layout (shell).',
        interviewAnswerStructured: `**Estructura recomendada:**

\`\`\`
src/app/
├── core/           # Singleton services, guards
│   ├── services/
│   ├── guards/
│   └── models/
├── shared/         # Componentes, pipes reusable
│   ├── components/
│   ├── pipes/
│   └── directives/
├── features/       # Por funcionalidad
│   ├── dashboard/
│   ├── usuarios/
│   └── productos/
└── layout/         # Shell components
    ├── header/
    └── sidebar/
\`\`\`

**Beneficios:**
- Separación de responsabilidades
- Lazy loading por feature
- Fácil de mantener y escalar
- Código reutilizable en shared

**Características:**
- Un módulo/carpeta por feature
- Feature puede ser lazy loaded
- Core para servicios singleton
- Shared para código reusable

**Best practices:**
- Componentes pequeños y enfocados
- Un archivo por clase
- Nombrado consistente (kebab-case)`,
        hasDemo: false,
      },
      {
        id: 'ssr',
        title: '¿Qué es SSR?',
        slug: 'ssr',
        category: 'Angular Core',
        icon: 'computer',
        summary:
          'Server-Side Rendering genera HTML en el servidor para mejor SEO y performance inicial.',
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
          'No todas las apps necesitan SSR',
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
          'Olvidar window/document en servidor',
        ],
        interviewQuestion: '¿Cuándo usarías SSR vs SPA tradicional?',
        interviewAnswerShort:
          'Usa SSR cuando SEO es crítico (blogs, e-commerce) o necesitas mejor FCP. Usa SPA tradicional para apps authenticated o dashboards donde SEO no importa.',
        interviewAnswerStructured: `**SSR (Server-Side Rendering):**

*Cuándo usarlo:*
- SEO es crítico (blogs, e-commerce, landing pages)
- Redes sociales comparten tus URLs
- Necesitas mejor First Contentful Paint (FCP)
- Dispositivos lentos del cliente

*Beneficios:*
- SEO mejorado (Google ve HTML completo)
- Carga inicial más rápida
- Mejor experiencia en dispositivos lentos

*Angular 17+:*
\`\`\`typescript
app.config.ts
providers: [
  provideClientHydration()
]
\`\`\`

**SPA tradicional:**

*Cuándo usarlo:*
- Apps autenticadas (dashboards, admin)
- SEO no es importante
- Interactividad alta
- API-first applications

*Beneficios:*
- Más interactivo después de carga
- Mejor TTI (Time to Interactive)
- Menos carga en servidor`,
        hasDemo: false,
      },
    ],
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
          'Cold vs Hot observables',
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
        commonMistakes: ['Olvidar unsubscribe', 'No manejar errores', 'Confundir con Promise'],
        interviewQuestion: '¿Qué es un Observable cold vs hot?',
        interviewAnswerShort:
          'Cold: el observable crea la data cuando te suscribes (cada suscriptor ve datos diferentes). Hot: la data se produce independientemente de las suscripciones (todos ven los mismos datos).',
        interviewAnswerStructured: `**Cold Observables:**
- Crean la data cuando te suscribes
- Cada suscriptor obtiene su propia ejecución
- Ejemplos: of(), from(), HTTP requests

\`\`\`typescript
const cold$ = new Observable(subscriber => {
  console.log('Ejecutando...');
  subscriber.next(Math.random());
});

cold$.subscribe(v => console.log(v)); // Ejecuta
cold$.subscribe(v => console.log(v)); // Ejecuta de nuevo
// Cada suscriptor ve valor diferente
\`\`\`

**Hot Observables:**
- Producen data independientemente de suscripciones
- Comparten la ejecución entre suscriptores
- Ejemplos: fromEvent(), Subject, BehaviorSubject

\`\`\`typescript
const hot$ = fromEvent(document, 'click');
hot$.subscribe(e => console.log('A:', e));
hot$.subscribe(e => console.log('B:', e));
// Ambos ven el mismo click
\`\`\`

**Cuándo usar cada uno:**
- Cold: operaciones que deben ejecutarse por suscriptor
- Hot: eventos, streams compartidos`,
        hasDemo: true,
        demoComponent: 'observables',
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
          'Usa from() para convertir Promise a Observable',
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
          'No usar async/await correctamente',
        ],
        interviewQuestion: '¿Cómo convertirías una Promise a Observable?',
        interviewAnswerShort:
          'Usa el operador from() de RxJS para convertir una Promise en Observable, o firstValueFrom() para obtener el primer valor como Promise.',
        interviewAnswerStructured: `**Método 1: from()**
\`\`\`typescript
import { from } from 'rxjs';

const promise = fetch('/api/data').then(r => r.json());
const observable$ = from(promise);
\`\`\`

**Método 2: firstValueFrom() (Angular 15+)**
\`\`\`typescript
import { firstValueFrom } from 'rxjs';

const data = await firstValueFrom(this.http.get('/api'));
\`\`\`

**Diferencia clave:**
- Observable: puede emitir múltiples valores
- Promise: emite un solo valor
- from() convierte el resultado de la Promise en un Observable

**Conversión inversa (Observable → Promise):**
\`\`\`typescript
import { toPromise } from 'rxjs';
// o
const value = await firstValueFrom(observable$);
\`\`\`

**Best practice (Angular 15+):**
- Usa firstValueFrom() o lastValueFrom()
- Evita toPromise() (deprecated)`,
        hasDemo: true,
        demoComponent: 'observables',
      },
      {
        id: 'subject',
        title: '¿Qué es un Subject?',
        slug: 'subject',
        category: 'RxJS & Observables',
        icon: 'hub',
        summary:
          'Un tipo especial de Observable que permite múltiples suscripciones y emitir valores manualmente.',
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
          'Úsalo para state management',
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
          'No usar BehaviorSubject para state',
        ],
        interviewQuestion: '¿Cuándo usarías Subject vs BehaviorSubject?',
        interviewAnswerShort:
          'Usa BehaviorSubject cuando necesitas el valor actual inicial (ej: state management), usa Subject cuando solo necesitas emitir eventos sin estado.',
        interviewAnswerStructured: `**Subject:**
- No tiene valor inicial
- Nuevos suscriptores NO reciben el último valor emitido
- Solo emite cuando se llama .next()

\`\`\`typescript
const subject = new Subject<string>();

subject.subscribe(v => console.log('A:', v));
subject.next('Hola');  // A recibe: Hola
subject.subscribe(v => console.log('B:', v)); // B NO recibe nada
subject.next('Mundo'); // A: Mundo, B: Mundo
\`\`\`

**BehaviorSubject:**
- Requiere valor inicial
- Nuevos suscriptores RECIBEN inmediatamente el último valor

\`\`\`typescript
const behavior$ = new BehaviorSubject('inicial');

behavior$.subscribe(v => console.log('A:', v)); // A: inicial
behavior$.next('nuevo'); // A: nuevo
behavior$.subscribe(v => console.log('B:', v)); // B: nuevo
\`\`\`

**Cuándo usar cada uno:**
- **BehaviorSubject**: State management, obtener valor actual
- **Subject**: Eventos, notificaciones sin estado`,
        hasDemo: true,
        demoComponent: 'observables',
      },
      {
        id: 'subject-vs-behaviorsubject',
        title: 'Diferencia entre Subject y BehaviorSubject',
        slug: 'subject-vs-behaviorsubject',
        category: 'RxJS & Observables',
        icon: 'all_inclusive',
        summary:
          'Subject no tiene valor inicial, BehaviorSubject sí y emite el último valor a nuevos suscriptores.',
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
          'Subject para eventos sin estado',
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
          'No desuscribir',
        ],
        interviewQuestion: '¿Cómo implementarías un state service?',
        interviewAnswerShort:
          'Usa un servicio con BehaviorSubject para mantener el estado, expose el estado como Observable, y provee métodos para actualizar el estado.',
        interviewAnswerStructured: `**Implementación básica:**

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class StateService {
  private _state = new BehaviorSubject<State>(initialState);
  
  // Expose como Observable (solo lectura)
  state$ = this._state.asObservable();
  
  // Getter para valor actual
  get state() { return this._state.getValue(); }
  
  // Método para actualizar
  updateState(partial: Partial<State>) {
    this._state.next({ ...this.state, ...partial });
  }
}
\`\`\`

**Uso en componente:**
\`\`\`typescript
constructor(private state: StateService) {
  this.state.state$.subscribe(s => this.datos = s.datos);
}

update() {
  this.state.updateState({ datos: 'nuevo' });
}
\`\`\`

**Ventajas:**
- Single source of truth
- Compartido entre componentes
- Estado inmutable
- testable

**Angular 16+ (Signals):**
\`\`\`typescript
count = signal(0);
double = computed(() => this.count() * 2);
\`\`\``,
        hasDemo: true,
        demoComponent: 'observables',
      },
    ],
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
          'Guards y resolvers disponibles',
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
          'No unsubscribe de params',
        ],
        interviewQuestion: '¿Cómo pasarías parámetros entre rutas?',
        interviewAnswerShort:
          'Usa route parameters en la URL (path/:id) y accede con ActivatedRoute.params, o usa query parameters (?id=123) con ActivatedRoute.queryParams.',
        interviewAnswerStructured: `**Route Parameters (/:id):**

1. Definir la ruta:
\`\`\`typescript
{ path: 'usuario/:id', component: UsuarioComponent }
\`\`\`

2. Navegar:
\`\`\`html
<a [routerLink]="['/usuario', usuario.id]">Detalle</a>
\`\`\`

3. Leer en componente:
\`\`\`typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe(p => this.id = p['id']);
  // O snapshot (sin subscribe)
  this.id = this.route.snapshot.params['id'];
}
\`\`\`

**Query Parameters (?id=123):**

1. Navegar:
\`\`\`html
<a [routerLink]="['/usuarios']" [queryParams]="{page: 2}">
\`\`\`

2. Leer:
\`\`\`typescript
this.route.queryParams.subscribe(q => this.page = q['page']);
\`\`\`

**Path vs Query:**
- Path: parámetros esenciales (id del recurso)
- Query: parámetros opcionales (filtros, paginación)`,
        hasDemo: true,
        demoComponent: 'routing',
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
          'Múltiples guards posibles',
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
          'No manejar async',
        ],
        interviewQuestion: '¿Cómo implementarías un guard de autenticación?',
        interviewAnswerShort:
          'Crea un servicio que implemente CanActivate, inyecta AuthService para verificar si el usuario está autenticado, y retorna boolean o UrlTree.',
        interviewAnswerStructured: `**Implementación del Guard:**

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    // Redirigir a login
    return this.router.createUrlTree(['/login']);
  }
}
\`\`\`

**Tipos de Guards:**
- **CanActivate**: Controla acceso a la ruta
- **CanActivateChild**: Controla acceso a rutas hijo
- **CanDeactivate**: Controla salida de la ruta
- **CanLoad**: Controla carga de módulo lazy

**Uso en rutas:**
\`\`\`typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard]
}
\`\`\`

**Con múltiples guards:**
\`\`\`typescript
canActivate: [AuthGuard, RoleGuard]
\`\`\``,
        hasDemo: true,
        demoComponent: 'routing',
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
          'Útil para datos críticos',
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
          'Confundir con CanActivate',
        ],
        interviewQuestion: '¿Cuándo usarías un resolver vs cargar datos en ngOnInit?',
        interviewAnswerShort:
          'Usa resolver cuando necesitas datos antes de mostrar el componente (evita flickering), ngOnInit cuando puedes mostrar un skeleton/loading mientras cargan.',
        interviewAnswerStructured: `**Resolver:**
- Precarga datos ANTES de renderizar el componente
- El componente recibe datos listos
- Evita "loading spinners" en el componente
- Útil para datos esenciales

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class UsuarioResolver implements Resolve<Usuario> {
  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
    return this.service.getUsuario(route.paramMap.get('id'));
  }
}

// Ruta
{
  path: 'usuario/:id',
  component: UsuarioComponent,
  resolve: { usuario: UsuarioResolver }
}

// Componente
ngOnInit() {
  const usuario = this.route.snapshot.data['usuario'];
}
\`\`\`

**ngOnInit:**
- Más flexible (puedes mostrar skeleton)
- Mejor para datos opcionales
- Controlas el estado de carga

**Cuándo usar cada uno:**
- **Resolver**: Datos esenciales para renderizar
- **ngOnInit**: Datos secundarios o con loading state`,
        hasDemo: true,
        demoComponent: 'routing',
      },
    ],
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
          'Usa ElementRef para acceder al DOM',
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
          'No usar Renderer2',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre componente y directiva?',
        interviewAnswerShort:
          'Un componente es una directiva con template (tiene vista), una directiva solo modifica elementos existentes sin crear nueva vista.',
        interviewAnswerStructured: `**Componente:**
- Es una directiva con template
- Tiene su propia vista (HTML)
- Crea nuevos elementos en el DOM
- Tiene su propio styles
- @Component decorator

\`\`\`typescript
@Component({
  selector: 'app-card',
  template: '<div>Contenido</div>'
})
export class CardComponent {}
\`\`\`

**Directiva:**
- Modifica comportamiento de elementos
- No tiene template propio
- Usa el elemento donde se aplica
- @Directive decorator

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
\`\`\`

**Uso:**
- Componente: 'app-card'
- Directiva: '<div appHighlight="yellow">'</div>

**Tipos de directivas:**
- Estructurales: *ngIf, *ngFor (modifican DOM)
- Atributo: [class], [style], custom`,
        hasDemo: true,
        demoComponent: 'directives',
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
          'div para estilos y layout',
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
          'Anidar *ngIf en ng-container',
        ],
        interviewQuestion: '¿Cuándo usarías ng-container en lugar de div?',
        interviewAnswerShort:
          'Usa ng-container cuando necesitas estructura lógica (*ngIf, *ngFor) pero NO quieres un elemento extra en el DOM. Usa div cuando necesitas estilos o clases.',
        interviewAnswerStructured: `**ng-container:**
- NO existe en el DOM final (se "quema")
- No puede tener estilos, clases, o atributos
- Solo estructura lógica
- Útil para evitar wrappers innecesarios

\`\`\`html
<!-- No crea elemento en DOM -->
<ng-container *ngFor="let item of items">
  <td>{{ item.name }}</td>
  <td>{{ item.value }}</td>
</ng-container>
\`\`\`

**div:**
- Crea un elemento real en el DOM
- Puede tener estilos, clases, atributos
- Afecta el layout
- Útil para styling

\`\`\`html
<!-- Crea elemento en DOM -->
<div *ngIf="mostrar" class="card">
  Contenido
</div>
\`\`\`

**Ejemplo comparativo:**

\`\`\`html
<!-- ng-container: DOM limpio -->
<ng-container *ngFor="let user of users">
  <td>{{ user.name }}</td>
</ng-container>

<!-- div: con clase -->
<div *ngFor="let user of users" class="user-row">
  {{ user.name }}
</div>
\`\`\``,
        hasDemo: false,
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
          'Múltiples con ViewChildren',
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
          'Olvidar static option',
        ],
        interviewQuestion: '¿Cómo accederías a un elemento del DOM desde el componente?',
        interviewAnswerShort:
          'Usa @ViewChild con un template reference (#miElemento) y ElementRef para acceder al elemento nativo, disponible en ngAfterViewInit.',
        interviewAnswerStructured: `**Pasos:**

1. Agregar template reference en el HTML:
\`\`\`html
<input #miInput type="text">
<button #miBoton>Click</button>
\`\`\`

2. Usar @ViewChild en el componente:
\`\`\`typescript
@ViewChild('miInput') inputEl: ElementRef;
@ViewChild('miBoton') botonEl: ElementRef;
\`\`\`

3. Acceder en ngAfterViewInit:
\`\`\`typescript
ngAfterViewInit() {
  this.inputEl.nativeElement.focus();
  console.log(this.botonEl.nativeElement);
}
\`\`\`

**Static vs Dynamic (Angular 8+):**
- **static: false** (default): Disponible en ngAfterViewInit
- **static: true**: Disponible en constructor

\`\`\`typescript
@ViewChild('miInput', { static: true }) inputEl: ElementRef;
\`\`\`

**Otros usos:**
- Acceder a componentes hijos:
\`\`\`typescript
@ViewChild('hijo') childComp: HijoComponent;
\`\`\``,
        hasDemo: true,
        demoComponent: 'viewchild',
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
          'Similar API a ViewChild',
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
          'No entender ng-content',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre ViewChild y ContentChild?',
        interviewAnswerShort:
          'ViewChild accede a elementos del template propio del componente, ContentChild accede a contenido proyectado desde el componente padre (ng-content).',
        interviewAnswerStructured: `**ViewChild:**
- Accede a elementos del template PROPIO
- Disponible en ngAfterViewInit
- Elements declarados en el template del componente

**ContentChild:**
- Accede a contenido PROYECTADO desde el padre
- Disponible en ngAfterContentInit
- Contenido que viene a través de <ng-content>

**Ejemplo:**

\`\`\`typescript
// Template del componente hijo (card.component.ts)
@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <h2>Title</h2>
      <ng-content></ng-content>  <!-- Contenido proyectado -->
    </div>
  \`
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') headerEl: ElementRef;
  
  ngAfterContentInit() {
    console.log(this.headerEl); // Acceso al contenido proyectado
  }
}
\`\`\`

**Uso del padre:**
\`\`\`html
<app-card>
  <p>Contenido proyectado</p>
  <span #header>Header</span>
</app-card>
\`\`\``,
        hasDemo: true,
        demoComponent: 'viewchild',
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
          'Útil con arrays que cambian frecuentemente',
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
          'trackBy con id no único',
        ],
        interviewQuestion: '¿Por qué trackBy mejora rendimiento?',
        interviewAnswerShort:
          'trackBy ayuda Angular a identificar elementos únicos en una lista, evitando que se recree todo el DOM cuando cambia la lista (solo actualiza lo que cambió).',
        interviewAnswerStructured: `**Problema sin trackBy:**
- Angular recrea TODOS los elementos cuando cambia la lista
- Aunque los datos sean los mismos
- Afecta rendimiento en listas grandes

**Con trackBy:**
- Angular sabe qué elemento cambió
- Solo actualiza ese elemento en el DOM
- Los elementos sin cambios se reutilizan

**Implementación:**
\`\`\`typescript
@Component({
  template: \`
    <li *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </li>
  \`
})
export class ListComponent {
  trackById(index: number, item: any): number {
    return item.id; // Identificador único
  }
}
\`\`\`

**Best practices:**
- Retorna ID único (no índice)
- El ID debe ser consistente
- Útil cuando la lista cambia frecuentemente

**Nota:** En Angular 17+ con @for, trackBy ya no es necesario ya que el nuevo control flow lo maneja automáticamente.`,
        hasDemo: true,
        demoComponent: 'data-binding',
      },
    ],
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
          'Beneficia apps grandes',
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
          'No manejar errores de carga',
        ],
        interviewQuestion: '¿Cómo implementarías lazy loading?',
        interviewAnswerShort:
          'Usa loadChildren para módulos o loadComponent para componentes standalone, importando dinámicamente el módulo cuando se navega a esa ruta.',
        interviewAnswerStructured: `**Lazy Loading de Módulos:**
\`\`\`typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => 
      import('./admin/admin.module')
        .then(m => m.AdminModule)
  }
];
\`\`\`

**Lazy Loading de Componentes (Angular 15+):**
\`\`\`typescript
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  }
];
\`\`\`

**Con routerLink:**
\`\`\`html
<a routerLink="/admin">Admin</a>
<a routerLink="/dashboard">Dashboard</a>
\`\`\`

**Preloading (cargar en background):**
\`\`\`typescript
RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});
\`\`\`

**Beneficios:**
- Menor tiempo de carga inicial
- Código splitted automáticamente
- Mejor UX en apps grandes`,
        hasDemo: false,
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
          'export: para uso externo',
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
          'Olvidar CommonModule',
        ],
        interviewQuestion: '¿Cuál es la diferencia entre declarations e imports?',
        interviewAnswerShort:
          'declarations declara componentes/directives/pipes propios del módulo, imports importa otros módulos cuyos exports quieres usar en este módulo.',
        interviewAnswerStructured: `**declarations:**
- Declara componentes, directivas, pipes PROPIOS
- Solo un módulo puede declarar cada componente
- Los componentes declarados son privados al módulo

\`\`\`typescript
@NgModule({
  declarations: [
    MiComponenteComponent,
    MiDirectivaDirective,
    MiPipePipe
  ]
})
export class MiModule {}
\`\`\`

**imports:**
- Importa otros módulos
- Expone sus exports al módulo actual
- Ejemplo: CommonModule (*ngIf, *ngFor)

\`\`\`typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class MiModule {}
\`\`\`

**exports:**
- Expone componentes para uso externo
- Permite usar el módulo en otros módulos

\`\`\`typescript
@NgModule({
  exports: [MiComponenteComponent]
})
export class MiModule {}
\`\`\`

**providers:**
- Registra servicios a nivel del módulo`,
        hasDemo: false,
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
          'Shared modules usan CommonModule',
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
          'No entender cuándo usar cada uno',
        ],
        interviewQuestion: '¿Por qué BrowserModule solo se importa una vez?',
        interviewAnswerShort:
          'BrowserModule incluye servicios de bootstrapping del navegador que solo deben cargarse una vez en AppModule. Para otros módulos, usa CommonModule.',
        interviewAnswerStructured: `**BrowserModule:**
- Exporta CommonModule + servicios de navegador
- Solo se importa EN APP MODULE (root) UNA VEZ
- Prove servicios de bootstrapping
- Maneja ngStable, etc.

**CommonModule:**
- Directivas: *ngIf, *ngFor, *ngSwitch
- Pipes: DatePipe, CurrencyPipe, AsyncPipe
- Directivas: ngClass, ngStyle, ngNonBindable
- Se usa en TODOS los demás módulos

**Estructura correcta:**

\`\`\`typescript
// AppModule - SOLO BrowserModule aquí
@NgModule({
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

// Feature/Lazy Modules - CommonModule
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [MiComponente]
})
export class FeatureModule {}

// SharedModule
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, MiComponente]
})
export class SharedModule {}
\`\`\`

**Si importas BrowserModule dos veces:**
- Warning de Angular
- Posibles problemas de rendimiento`,
        hasDemo: false,
      },
    ],
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
          'Both soportan custom validators',
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
          'Olvidar imports de ReactiveFormsModule',
        ],
        interviewQuestion: '¿Cuándo usarías Reactive Forms vs Template-driven?',
        interviewAnswerShort:
          'Usa Reactive Forms para forms complejos, dinámicos o con validación custom. Usa Template-driven para forms simples con validación básica.',
        interviewAnswerStructured: `**Template-Driven:**
- Directivas en el template (ngModel)
- Más simple, menos código
- Menos control
- Validación con directivas
- Ejemplo: form de contacto simple

\`\`\`typescript
<form #miForm="ngForm">
  <input [(ngModel)]="nombre" name="nombre" required>
</form>
\`\`\`

**Reactive Forms:**
- Programático en el componente
- FormControl, FormGroup, FormArray
- Mejor para validación custom
- Más testable
- Ejemplo: forms complejos, pasos

\`\`\`typescript
form = new FormGroup({
  nombre: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email])
});
\`\`\`

**Cuándo usar cada uno:**

| Template-Driven | Reactive Forms |
|-----------------|---------------|
| Forms simples | Forms complejos |
| Validación básica | Validación custom |
| Menos código | Más control |
| Quick prototyping | Enterprise apps |

**Importante:**
- Template-driven: import FormsModule
- Reactive: import ReactiveFormsModule`,
        hasDemo: true,
        demoComponent: 'forms',
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
          'Single source of truth',
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
          'Mutar estado en lugar de immutability',
        ],
        interviewQuestion: '¿Cómo implementarías state management sin NgRx?',
        interviewAnswerShort:
          'Usa un servicio con BehaviorSubject para mantener el estado, expone un Observable para que los componentes se suscriban, y usa métodos para actualizar.',
        interviewAnswerStructured: `**Service + BehaviorSubject (Basic):**

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class StoreService {
  private _state = new BehaviorSubject<State>(initialState);
  state$ = this._state.asObservable();
  
  get state() { return this._state.getValue(); }
  
  update(partial: Partial<State>) {
    this._state.next({ ...this.state, ...partial });
  }
}
\`\`\`

**Uso en componente:**
\`\`\`typescript
constructor(private store: StoreService) {
  this.store.state$.subscribe(s => this.data = s.data);
}
\`\`\`

**Signals (Angular 16+) - Moderno:**
\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class SignalStore {
  state = signal<State>(initialState);
  
  update(partial: Partial<State>) {
    this.state.set({ ...this.state(), ...partial });
  }
}
\`\`\`

**Opciones según complejidad:**

| Complejidad | Solución |
|-------------|----------|
| Baja | Service + BehaviorSubject |
| Media | Service + Signals |
| Alta | NgRx / Elf / Akita |

**Ventajas de no usar NgRx:**
- Menos boilerplate
- Más simple de aprender
- Suficiente para la mayoría de apps`,
        hasDemo: false,
      },
    ],
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
        summary:
          'Interfaz de línea de comandos para crear, desarrollar y mantener aplicaciones Angular.',
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
          'Usa --standalone con ng new',
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
        commonMistakes: ['Crear archivos manualmente', 'No usar generators', 'No actualizar CLI'],
        interviewQuestion: '¿Qué comandos usarías para crear un componente?',
        interviewAnswerShort:
          'Usa ng generate component (o ng g c) seguido del nombre del componente. Angular CLI genera los archivos automáticamente.',
        interviewAnswerStructured: `**Comandos principales:**

\`\`\`bash
# Generar componente
ng generate component components/mi-componente
ng g c components/mi-componente

# Generar con flags
ng g c components/mi-componente --flat          # Sin carpeta
ng g c components/mi-componente --inline-template  # Template inline
ng g c components/mi-componente --inline-style    # Styles inline
ng g c components/mi-componente --skip-tests      # Sin spec
ng g c components/mi-componente --standalone      # Standalone
\`\`\`

**Otros generadores útiles:**

\`\`\`bash
# Servicio
ng generate service services/mi-servicio
ng g s services/mi-servicio

# Directiva
ng generate directive directives/mi-directiva
ng g d directives/mi-directiva

# Pipe
ng generate pipe pipes/mi-pipe
ng g p pipes/mi-pipe

# Guard
ng generate guard guards/mi-guard
ng g g guards/mi-guard

# Interface
ng generate interface models/mi-model

# Clase
ng generate class models/mi-clase
\`\`\`

**Por qué usar CLI:**
- Best practices integradas
- Archivos correctamente estructurados
- Actualiza automáticamente otros archivos`,
        hasDemo: false,
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
          'Usa Angular Testing Library',
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
          'No mockear dependencias',
        ],
        interviewQuestion: '¿Cómo testearías un componente Angular?',
        interviewAnswerShort:
          'Usa TestBed para configurar el módulo de testing, crea el componente con ComponentFixture, y escribe specs con Jasmine (describe, it, expect).',
        interviewAnswerStructured: `**Setup básico:**

\`\`\`typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
\`\`\`

**Tests comunes:**

\`\`\`typescript
// Test de renderizado
it('should render title', () => {
  const el = fixture.nativeElement.querySelector('h1');
  expect(el.textContent).toContain('Título');
});

// Test de método
it('should increment counter', () => {
  component.increment();
  expect(component.counter).toBe(1);
});

// Test de evento
it('should call onClick', () => {
  spyOn(component, 'onClick');
  fixture.nativeElement.querySelector('button').click();
  expect(component.onClick).toHaveBeenCalled();
});
\`\`\`

**Mocking dependencias:**
\`\`\`typescript
TestBed.configureTestingModule({
  providers: [
    { provide: MiServicio, useValue: mockServicio }
  ]
});
\`\`\``,
        hasDemo: false,
      },
    ],
  },
];
