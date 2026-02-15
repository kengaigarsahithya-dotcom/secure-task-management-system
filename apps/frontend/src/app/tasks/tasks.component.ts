import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];
  newTask = { title: '', description: '' };
  username: string = '';

  editingTaskId: string | null = null;
  editModel = { title: '', description: '' };

  /* SEARCH */
  searchText: string = '';

  /* PAGINATION */
  currentPage = 1;
  pageSize = 5;

  /* SORT */
  sortAsc = true;

  constructor(
    private http: HttpClient,
    private taskService: TaskService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => this.tasks = res,
      error: (err) => console.error(err)
    });
  }

  /* FILTERED TASKS */
  get filteredTasks(){
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /* PAGINATED */
  get paginatedTasks(){
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTasks.slice(start, start + this.pageSize);
  }

  nextPage(){
    if(this.currentPage * this.pageSize < this.filteredTasks.length){
      this.currentPage++;
    }
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
    }
  }

  sortByTitle(){
    this.tasks.sort((a,b)=>
      this.sortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    this.sortAsc = !this.sortAsc;
  }

  addTask(){
    if(!this.newTask.title) return;
    this.taskService.createTask(this.newTask).subscribe(()=>{
      this.newTask = { title:'', description:'' };
      this.fetchTasks();
    });
  }

  deleteTask(id:string){
    this.taskService.deleteTask(id).subscribe(()=>this.fetchTasks());
  }

  editTask(task:any){
    this.editingTaskId = task.id;
    this.editModel = { title: task.title, description: task.description };
  }

  cancelEdit(){
    this.editingTaskId = null;
  }

  saveEdit(id:string | null){
    if(!id) return;
    this.taskService.updateTask(id,this.editModel).subscribe(()=>{
      this.editingTaskId = null;
      this.fetchTasks();
    });
  }

  logout(){
    this.authService.logout();
  }
}
