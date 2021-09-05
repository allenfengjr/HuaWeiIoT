let dataset1=[
    {
        time:0,
        motionScore:30
    },
    {
        time:3,
        motionScore:60
    },
    {
        time:5,
        motionScore:100
    },
    {
        time:6,
        motionScore:70
    },
    {
        time:22,
        motionScore:20
    }
]
let dataset2=[
    {
        time:22,
        motionScore:100
    },
    {
        time:6,
        motionScore:60
    },
    {
        time:5,
        motionScore:100
    },
    {
        time:3,
        motionScore:70
    },
    {
        time:0,
        motionScore:20
    }
]

var width = 500;
var height = 300;
var padding = 40;

var xScale = d3.scaleLinear()
    .domain([0, 23])
    .range([0, width - padding*2]);
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - padding*2, 0]);



var svg = d3.select("#line_chart")
    .attr('width', width + 'px')
    .attr('height', height + 'px');


var linePath = d3.line()
    .x(function(d){ return xScale(d["time"]) })
    .y(function(d){ return yScale(d["motionScore"]) });

function draw_pic(n) {
    let dataset;
    let thecolor;
    if (n === 1) {
        dataset = dataset1;
        thecolor = 'red';
    }
    else{
        dataset = dataset2;
        thecolor = 'green'
    }
    console.log(11111)
    svg.append('g')
        .append('path')
        .attr('class', 'line-path')
        .attr('transform', 'translate(' + padding + ',' + padding + ')')
        .attr('d', linePath(dataset))
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', thecolor);

    svg.append('g')
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('id', "node")
        .attr('r', 5)
        .attr('transform', function (d) {
            return 'translate(' + (xScale(d["time"]) + padding) + ',' + (yScale(d["motionScore"]) + padding) + ')'
        })
        .attr('fill', thecolor)
        .attr("onclick", function (d) {
            console.log(d.motionScore)
            return d.motionScore
        });
};
function draw_star(n){
    let star = "";
    for (let i=0;i<n;++i){
        star += "🌟";
    }
    d3.selectAll("h3").text(star);
}
draw_pic(1);
