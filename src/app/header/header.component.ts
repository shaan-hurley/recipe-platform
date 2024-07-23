import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    SearchBarComponent
  ]
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) { }

  onSearch(query: string) {
    this.router.navigate(['/recipes'], { queryParams: { search: query } });
  }
}
