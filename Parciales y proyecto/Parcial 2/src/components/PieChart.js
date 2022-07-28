import * as d3 from 'd3';
import { useEffect } from 'react';
import { FormattedMessage } from "react-intl";

function PieChart(props){
    useEffect(() => {
        let data = {};
        props.room.forEach((e) => e.homeId === props.id ? data[e.name] = e.powerUsage.value : "");

        const width = 450,
            height = 450,
            margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        d3.selectAll("svg").remove();

        const canvas = d3.select("#canvas");
        const svg = canvas.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);
        
        const color = d3.scaleOrdinal().range(d3.schemeSet2);
        
        const pie = d3.pie().value(function(d) {return d[1]; })
        var data_ready = pie(Object.entries(data))
        
        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        
        const path  = svg.selectAll('mySlices')
            .data(data_ready)
            .join('path')
            .attr('d', arcGenerator)
                .attr('fill', function(d){ return(color(d.data[0])) })
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.7);

        const tooltip = svg.selectAll('mySlices')
            .data(data_ready)
            .join('text')
            .style("text-anchor", "middle")
            .style("font-size", 15);
                
        path.on('mouseover', (d, i) => {
            tooltip.style("visibility", "visible")
            .text(i.data[0] +': '+i.data[1] + ' KwH')
            .attr("transform", () => { return `translate(${arcGenerator.centroid(i)})`});
        });

        path.on('mouseout', () => { tooltip.style("visibility", "hidden"); });
    }, [props]);

    return (
        <div id="canvas">
            <h3><FormattedMessage id="Stats"/></h3>
        </div>
    )
}

export default PieChart;
