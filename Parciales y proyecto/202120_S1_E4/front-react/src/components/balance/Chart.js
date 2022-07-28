import * as d3 from 'd3';
import React, { useEffect } from "react";
import {useIntl} from "react-intl";

function Chart(props) {
  const intl = useIntl();
  useEffect(() => {
    let xValues = ["Jan","Feb","Mar","Jun","Jul","Aug","Sep"];
    let yValues = [];
    let progreso = intl.formatMessage({id: "progreso"});

    if(progreso !=="Progress"){
      xValues = ["Ene","Feb","Mar","Jun","Jul","Ago","Sep"];
    }

    let data = (datos) => {
      if (datos.datos.length === 0)
        return '';
      datos.datos.forEach(e => {
        if(e.UsuarioId === datos.usuario.id)
          yValues.push(e.bmi);
    })};

    data(props);

    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 1400 - margin.left - margin.right
    , height = 600 - margin.top - margin.bottom;

    var n = 7;

    var xScale = d3.scaleBand()
        .domain(xValues)
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([25, 27])
        .range([height, 0]);

    var line = d3.line()
        .x(function(d, i) { return xScale(xValues[i]); })
        .y(function(d, i) { return yScale(yValues[i]); })
        .curve(d3.curveMonotoneX)

    var dataset = d3.range(n).map(function(d, i) { return {[xValues[i]]: yValues[i]} })

    d3.selectAll("svg").remove();

    var svg = d3.select("#MyChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left  + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", 'none')
        .style("stroke", 'steelblue')
        .style("stroke-width", '3')
        .attr("transform", "translate(" + 2*margin.left  + "," + margin.top + ")");

    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d, i) { return xScale(xValues[i]); })
        .attr("cy", function(d, i) { return yScale(yValues[i]); })
        .style("fill", 'steelblue')
        .style("stroke", '#fff')
        .attr("r", 5)
        .attr("transform", "translate(" + 2*margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("transform", "translate(" + (width/2) + ", -40)")
        .attr("dy", ".35em")
        .attr("text-anchor", "progreso")
        .style("fill", "steelblue")
        .text("-" + progreso);

    svg.append("g").selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("dx", function(d, i) { return xScale(xValues[i]); })
        .attr("dy", function(d, i) { return yScale(yValues[i]); })
        .attr("text-anchor", "progreso")
        .style("fill", "black")
        .text(function(d, i) { return (yValues[i]); })
        .attr("transform", "translate(" + 2*margin.left + "," + (margin.top + 20) + ")");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "translate(0, -" + margin.top + ")")
        .text("BMI");
  }, [props, intl]);

  return (
    <div id="MyChart">
    </div>
  );
}

export default Chart;