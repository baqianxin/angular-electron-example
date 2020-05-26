import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { screen } from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  value: any;
  foods: {};
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.foods = [{ value: '选项1', label: '黄金糕' },
    { value: '选项2', label: '双皮奶' },
    { elDisabled: true, value: '选项3', label: '蚵仔煎' },
    { value: '选项4', label: '龙须面' },
    { value: '选项5', label: '北京烤鸭' }];
  }
  handle(event: any): void {
    this.value = event
    console.log(event, this.value)
  }

  clear(): void {
    this.value = null
  }

}
