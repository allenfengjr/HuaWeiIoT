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
        motionScore:60
    },
    {
        time:1,
        motionScore:50
    },
    {
        time:2,
        motionScore:20
    },
    {
        time:3,
        motionScore:10
    },
    {
        time:4,
        motionScore:60
    },
    {
        time:5,
        motionScore:30
    },
    {
        time:6,
        motionScore:40
    },
    {
        time:7,
        motionScore:20
    },
    {
        time:8,
        motionScore:60
    },
    {
        time:9,
        motionScore:100
    },
    {
        time:10,
        motionScore:80
    },
    {
        time:11,
        motionScore:80
    },
    {
        time:12,
        motionScore:50
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
        motionScore:20
    },
    {
        time:16,
        motionScore:60
    },
    {
        time:17,
        motionScore:40
    },
    {
        time:18,
        motionScore:50
    },{
        time:19,
        motionScore:70
    },{
        time:20,
        motionScore:90
    },{
        time:21,
        motionScore:60
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

var width = 500;
var height = 400;
var padding = 10;
var xScale = d3.scaleLinear()
    .domain([0, 23])
    .range([padding*2, width-2*padding]);
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height-2*padding, padding*2]);



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
        .attr('transform', 'translate(0' + ',' + (height-padding*2) + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate('+(padding*2) + ',' + 0 + ')')
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
        thecolor = 'blue'
    }
    svg.append('g')
        .append('path')
        .attr('class', 'line-path')
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
            return 'translate(' + (xScale(d["time"])) + ',' + (yScale(d["motionScore"])) + ')'
        })
        .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.motionScore);})
        .on("mousemove", function(){
            return tooltip.style("top", (d3.event.pageY-20)+"px").style("left",(d3.event.pageX+20)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    var area = d3.area()
        .x(function(d) { return xScale(d.time); })
        .y0(yScale(0))
        .y1(function(d) { return yScale(d.motionScore); });

    var area_init = d3.area().x(function (d){return xScale(d.time)})
        .y0(yScale(0))
        .y1(yScale(0))
    ;
    svg.append("path")
        .datum(dataset)
        .attr("class","area").attr("d",area_init)
        .transition().duration(3000)
        .attr("class","area")
        .attr("d",area)
        .attr('fill',thecolor)
    ;
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

function refresh(){
    var the_p = document.getElementById("rec_content");
    the_p.innerHTML="";
    var iframe1 = document.createElement('iframe');
    iframe1.src="https://www.youtube.com/embed/vxnAV0rCDEA";
    iframe1.title="YouTube video player"
    iframe1.width="560";
    iframe1.height="315" ;
    iframe1.frameBorder="0"
    iframe1.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe1.allowFullscreen ;
    the_p.appendChild(iframe1);
    var iframe2 = document.createElement('iframe');
    iframe2.allow="autoplay *; encrypted-media *; fullscreen *";
    iframe2.frameBorder="0";
    iframe2.height="150";
    iframe2.style="width:100%;max-width:660px;overflow:hidden;background:transparent;"
    iframe2.sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
    iframe2.src="https://embed.music.apple.com/cn/album/usseewa/1535123741?i=1535123742&l=en"
    the_p.appendChild(iframe2)
    var iframe3 = document.createElement('iframe');
    iframe3.allow="autoplay *; encrypted-media *; fullscreen *";
    iframe3.frameBorder="0";
    iframe3.height="150";
    iframe3.style="width:100%;max-width:660px;overflow:hidden;background:transparent;"
    iframe3.src="https://embed.music.apple.com/cn/album/zero-eclipse/1468037766?i=1468037768&l=en"
    the_p.appendChild(iframe3)
}