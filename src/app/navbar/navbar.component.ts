import { Component, OnInit } from '@angular/core';
import {Books} from '../books';
import {HttpErrorResponse} from '@angular/common/http';
import {BooksService} from '../books.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public books: Books[];
  constructor(private booksService: BooksService){}

  ngOnInit() { }



  public onOpenModal(books: Books, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    container.appendChild(button);
    button.click();
  }



}
