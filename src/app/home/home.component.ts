import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Books} from '../books';
import {HttpErrorResponse} from '@angular/common/http';
import {BooksService} from '../books.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private booksService: BooksService, private fb: FormBuilder){}
  addForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z]*$')
    ]],
    author: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z]*$')
    ]],
    year: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.min(1),
      Validators.max(new Date().getFullYear()),
      Validators.pattern('^[0-9]*$')
    ]],
    imageUrl: ['', [
      Validators.required
    ]],
  });
  public books: Books[];
  public searchBook: Books[];
  public editBooks: Books;
  public deleteBooks: Books;
  public booksSearch: boolean;
  currentBook?: Books;
  currentIndex = -1;
  page = 0;
  count = 1;
  pageSize = 2;
  ngOnInit() {
    this.retrieveBooks();
  }


  public onAddBooks(addForm: FormGroup): void {
    document.getElementById('add-book-form').click();
    this.booksService.addBooks(this.addForm.value).subscribe(
      (response: Books) => {
        console.log(response);
        this.retrieveBooks();
        this.addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.addForm.reset();
      }
    );
  }

  public onUpdateBooks(books: Books): void {
    this.booksService.updateBooks(books).subscribe(
      (response: Books) => {
        console.log(response);
        this.retrieveBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBooks(booksId: number): void {
    this.booksService.deleteBooks(booksId).subscribe(
      (response: void) => {
        console.log(response);
        this.retrieveBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    const params: any = {};
    params[`key`] = key;
    this.booksService.findBooks(params).subscribe(
      (response: Books[]) => {
          this.searchBook = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    if (this.searchBook.length === 0) {
      this.booksSearch = false;
    } else{
      this.books = this.searchBook;
      this.pageSize = this.books.length;
      this.count = 0;
      this.booksSearch = true;
    }
    if (!key){
      this.pageSize = 2;
      this.retrieveBooks();
      this.booksSearch = true;
    }
  }
  public onOpenModal(books: Books, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === 'edit') {
      this.editBooks = books;
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBooks = books;
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }

  getRequestParams(page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  retrieveBooks(){
    const params = this.getRequestParams(this.page, this.pageSize);
    this.booksService.getFilterBooks(params).subscribe(
      (response: any) => {
        this.books = response.content;
        this.count = response.totalElements;
        console.log(response);
      },  error => { console.log(error); }
    );
  }


  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveBooks();
    // this.getBooks();
  }
}
