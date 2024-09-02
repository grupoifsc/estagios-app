import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";
import { API_REQUEST } from '../../../interceptors/contexts';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, Location } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-markdown-tut',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, ],
  templateUrl: './markdown-tut.component.html',
  styleUrl: './markdown-tut.component.css'
})
export class MarkdownTutComponent implements OnChanges {

  constructor(
    private location: Location
  ) { }

  @Input({required: true}) tut! : string;

  dataURL: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['tut']) {
      this.dataURL = 'wiki/' + this.tut + '.md';
      // this.dataURL = '../../../../../wiki/' + this.tut + '.md';
    }
  }


}
