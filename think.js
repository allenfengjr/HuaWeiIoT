var dataset1=[
    {
        time:0,
        motionScore:30
    },
    {
        time:1,
        motionScore:10
    },
    {
        time:2,
        motionScore:20
    },
    {
        time:3,
        motionScore:60
    },
    {
        time:4,
        motionScore:30
    },
    {
        time:5,
        motionScore:70
    },
    {
        time:6,
        motionScore:50
    },
    {
        time:7,
        motionScore:60
    },
    {
        time:8,
        motionScore:80
    },
    {
        time:9,
        motionScore:100
    },
    {
        time:10,
        motionScore:70
    },
    {
        time:11,
        motionScore:40
    },
    {
        time:12,
        motionScore:60
    },
    {
        time:13,
        motionScore:50
    },
    {
        time:14,
        motionScore:30
    },
    {
        time:15,
        motionScore:40
    },
    {
        time:16,
        motionScore:60
    },
    {
        time:17,
        motionScore:70
    },
    {
        time:18,
        motionScore:70
    },{
        time:19,
        motionScore:80
    },{
        time:20,
        motionScore:90
    },{
        time:21,
        motionScore:70
    },
    {
        time:22,
        motionScore:60
    },
    {
        time:23,
        motionScore:20
    }
]
var dataset2=[
    {
        time:0,
        motionScore:20
    },{
        time:1,
        motionScore:20
    },{
        time:2,
        motionScore:20
    },{
        time:3,
        motionScore:20
    },{
        time:4,
        motionScore:20
    },{
        time:5,
        motionScore:20
    },{
        time:6,
        motionScore:20
    },{
        time:7,
        motionScore:20
    },{
        time:8,
        motionScore:20
    },{
        time:9,
        motionScore:20
    },{
        time:10,
        motionScore:20
    },
    {
        time:11,
        motionScore:20
    }
];

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
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");


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
        .attr('fill', thecolor)
        .attr('transform', function (d) {
            return 'translate(' + (xScale(d["time"]) + padding) + ',' + (yScale(d["motionScore"]) + padding) + ')'
        })
        .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.motionScore);})
        .on("mousemove", function(){
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    var area = d3.area()
        .x(function(d) { return xScale(d.time); })
        .y0(yScale(0))
        .y1(function(d) { return yScale(d.motionScore); });
    svg.append("path")
        .datum(dataset)
        .attr("class","area")
        .attr("d",area)
        .attr('fill',thecolor)
        .attr('transform',"translate("+padding+","+padding+")");
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
