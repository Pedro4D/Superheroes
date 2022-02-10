import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as d3 from 'd3';
import { CharConfig } from '../constants';

@Component({
  selector: 'app-dynamic-charts',
  templateUrl: './dynamic-charts.component.html',
  styleUrls: ['./dynamic-charts.component.scss'],
})
export class DynamicChartsComponent implements OnInit {
  @Input() type: string;
  @Input() charName: string;
  @Input() config: CharConfig;
  @Input() data: any[] = [];

  constructor() {}
  private svg: any;

  ngOnInit(): void {
    this.createSvg();
    this.drawBars();
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#chars')
      .append('svg')
      .attr('width', this.config.width + this.config.margin * 2)
      .attr('height', this.config.height + this.config.margin * 2)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.config.margin + ',' + this.config.margin + ')'
      );
  }

  private drawBars(): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.config.width])
      .domain(this.data.map((d: any) => d.gender))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.config.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(10,0)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const max = this.data.reduce((a: any, b: any) => +a.count + +b.count);
    const y = d3
      .scaleLinear()
      .domain([0, max + 10])
      .range([this.config.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.gender))
      .attr('y', (d: any) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.config.height - y(d.count))
      .attr('fill', '#039');
  }
}
