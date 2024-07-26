import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ErrorComponent {
  errorMessage: string = 'An error has occurred. Please try again later.';
}
