var dataset1=[
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
        time:23,
        motionScore:20
    }
]
var dataset2=[
    {
        time:23,
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
var height = 400;
var padding = 20;

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

function draw_axix(){
    var xAxis = d3.axisBottom()
        .scale(xScale);
    var yAxis = d3.axisLeft()
        .scale(yScale);
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding + ',' + (height - padding) + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding + ',' + padding + ')')
        .call(yAxis);
}


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
            return d.motionScore
        });
};
function draw_star(n,emoji){
    let star = "";
    for (let i=0;i<n;++i){
        star += emoji;
    }
    return star;
}

function clean_pic(){
    document.getElementById("line_chart").innerHTML = ""
}
function draw_clean(n){
    clean_pic();
    draw_axix();
    draw_pic(n);
}
draw_clean(1);
var e_text = d3.select("#ee").text();
console.log(e_text);
d3.select("#ee").text(e_text+" "+draw_star(10,"🤯"));
console.log(e_text);
var p_text = d3.select("#pp").text();
d3.select("#pp").text(p_text+" "+draw_star(7,"😧"));
