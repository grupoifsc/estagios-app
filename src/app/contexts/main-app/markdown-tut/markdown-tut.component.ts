import { Component, Input, OnChanges, Signal, SimpleChanges, signal } from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-markdown-tut',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './markdown-tut.component.html',
  styleUrl: './markdown-tut.component.css'
})
export class MarkdownTutComponent implements OnChanges {

  constructor(
    private route: ActivatedRoute
  ) { }

  @Input({required: true}) tut! : string;

  tutorialSrc : string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['tut']) {
      this.tutorialSrc = '../../../../../wiki/' + this.tut + '.md';
    }
  }

}
