import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@nx-study/data';

@Component({
  selector: 'nx-study-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todos';

  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Todo[]>('/api/todos').subscribe((t) => (this.todos = t));
  }

  addTodo(title: string) {
    this.http.post('/api/addTodo', { title }).subscribe(() => {
      this.fetch();
    });
  }
}
