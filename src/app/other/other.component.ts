import { Component, OnInit } from '@angular/core';
import {Books} from "../books";
import {HttpErrorResponse} from "@angular/common/http";
import {BooksService} from "../books.service";

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit{
  constructor(private booksService: BooksService) {
  }
  books: Books[];
  ngOnInit(){
    this.getBooks();
  }
  public getBooks(): void {
    this.booksService.getBooks().subscribe(
      (response: Books[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
