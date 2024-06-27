import { Component, OnInit } from '@angular/core';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger',
  standalone: true,
  imports: [],
  templateUrl: './swagger.component.html',
  styleUrl: './swagger.component.css'
})
export class SwaggerComponent implements OnInit {

  ngOnInit(): void {
    const ui = SwaggerUIBundle({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      url: 'http://localhost:8080/v3/api-docs',
      docExpansion: 'none',
      operationsSorter: 'alpha'
    });
  }

}
