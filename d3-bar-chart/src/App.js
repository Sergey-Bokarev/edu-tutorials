import { useState, useRef, useEffect } from 'react';
import * as d3 from'd3';
import './App.css';

function App() {
  const [data] = useState([200, 250, 60, 150, 100, 175]);
  const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 300;
    const color = d3.scaleOrdinal().range(d3.schemeSet2);
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible');

    const xScale = d3.scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, w])
      .padding(0.5);
    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h, 0]);
    
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    svg.append('g')
      .call(yAxis);

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
        .attr('x', (_, i) => xScale(i))
        .attr('y', yScale)
        .attr('width', xScale.bandwidth())
        .attr('height', val => h - yScale(val))
        .attr('fill', (_, i) => color(i))
        .attr('opacity', 0.7);
  }, [data]);

  return (
    <div className="App">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
