function fixupFirstRow(tab,num) {
    var div=tab.parentNode;
    if(div.className.toLowerCase()=="freezediv"){
        for(var i=0;i<num;i++){
            tab.rows[i].style.zIndex="1";
            tab.rows[i].style.position="relative";
        }
        var tr;
        div.onscroll = function(){
            for(var j=0;j<num;j++){
                tr = tab.rows[j];
                tr.style.top = this.scrollTop-(this.scrollTop==0?1:2);
                tr.style.left=-1;
            }
        }
    }
}