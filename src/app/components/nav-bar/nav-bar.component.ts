import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private searchService: SearchService) {}

  handleSearch(value: string) {
    this.searchService.setSearchValue(value);
  }

  search = new FormControl('');

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(debounceTime(300))
    .subscribe(value => this.handleSearch(value ?? ''));
  }
  
}
