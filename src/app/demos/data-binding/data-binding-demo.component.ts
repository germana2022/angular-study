import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-data-binding-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './data-binding-demo.component.html',
  styleUrl: './data-binding-demo.component.scss'
})
export class DataBindingDemoComponent {
  title = 'Angular Data Binding';
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  clickCount = 0;
  inputValue = '';
  
  isActive = false;
  isHighlight = false;
  bgColor = 'var(--primary)';
  status = 'success';

  itemsWithoutTrack = [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }
  ];

  itemsWithTrack = [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }
  ];

  renderCountWithout = 0;
  renderCountWith = 0;

  onClick() {
    this.clickCount++;
  }

  changeColor() {
    const colors = ['var(--primary)', 'var(--accent)', 'var(--warning)', 'var(--error)'];
    this.bgColor = colors[Math.floor(Math.random() * colors.length)];
  }

  trackById(index: number, item: any): number {
    this.renderCountWith++;
    return item.id;
  }

  shuffleItems() {
    const shuffled = [...this.itemsWithTrack].sort(() => Math.random() - 0.5);
    this.itemsWithoutTrack = [...shuffled];
    this.itemsWithTrack = [...shuffled];
    this.renderCountWithout++;
    this.renderCountWith++;
  }

  updateItems() {
    this.itemsWithoutTrack = this.itemsWithoutTrack.map(item => ({
      ...item,
      name: item.name + ' *'
    }));
    this.itemsWithTrack = this.itemsWithTrack.map(item => ({
      ...item,
      name: item.name + ' *'
    }));
    this.renderCountWithout++;
    this.renderCountWith++;
  }

  resetItems() {
    this.itemsWithoutTrack = [
      { id: 1, name: 'Item A' },
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Item C' }
    ];
    this.itemsWithTrack = [
      { id: 1, name: 'Item A' },
      { id: 2, name: 'Item B' },
      { id: 3, name: 'Item C' }
    ];
  }
}
