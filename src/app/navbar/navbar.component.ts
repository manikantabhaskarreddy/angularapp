import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Main } from '../models/main';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  mainform!: FormGroup;
  records: Main[] = [];
  searchbyemail: string = '';
  recordfound: Main | null = null
  data: any;
  constructor(private service: MainService, private fb: FormBuilder) { }
  ininit(): void {
    this.mainform = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      branch: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })
  }
  getalldata(): void {
    this.service.onfetch().subscribe(data => this.records = data);
  }
  ngOnInit(): void {
    this.getalldata();
    this.ininit();
  }
  postdata(): void {
    const posting: Main = { ...this.mainform.value, id: this.getting() }
    this.service.onadd(posting).subscribe(() => {
      this.getalldata();
    })
  }
  getting(): number {
    return this.records.length > 0 ? Math.max(...this.records.map((record) => record.id || 0)) + 1 : 1;
  }
  deleteuser(id: number | undefined): void {
    if (id !== undefined)
      this.service.ondelete(id).subscribe(() => {
        this.getalldata()
      })
  }
  updateuser(): void {
    const id = this.mainform.value.id;
    const updaterecord: Main = { ...this.mainform.value }
    this.service.onupdate(id, updaterecord).subscribe(() => {
      this.getalldata();
    })
  }
  getbyemail(email: string): void {
    this.service.getbyemail(email).subscribe((data) => {
      if (data && data.length > 0) {
        this.data = data[0];
        // this.updateuser(this.data1);
      }
      else (this.data = null)
      console.log(`record is not found ${email} not found`)
    })
  }
}
