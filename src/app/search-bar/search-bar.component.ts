import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class SearchBarComponent {
  searchControl = new FormControl('');

  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value !== null) {
        this.search.emit(value);
      }
    });
  }

  onSearch(): void {
    const value = this.searchControl.value;
    if (value !== null) {
      this.search.emit(value);
    }
  }
}
