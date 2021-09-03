const id_dict = {
    1:"cloth",
    2:"food",
    3:"home",
    4:"sport",
    5:"think"
}
function show(n){

    var curr=document.querySelector("div[style]");
    curr.removeAttribute("style");
    document.getElementById("content"+n)
        .style.zIndex="1";
}
function nextpage(id){
    show(id)
    $("#content"+id).load('./'+id_dict[id]+'.html');
}