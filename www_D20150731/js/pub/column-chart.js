/**
 * Created by liuzhangjun on 2015/5/21.
 */
app.factory('columnChartService',function(){
    //绘制柱状图的方法
    var drawColumnChart=function drawColumnChart(data,$state){
        var app=document.getElementById('app');
        var canvas=document.getElementById('canvas');
        canvas.width=app.clientWidth;
        var colHeight=15;   //定义柱形行高 后面的适配要以该值的比例为准
        canvas.height=data.data.length*colHeight*3+colHeight+colHeight*2.5;  //动态设定整个柱图画板的高度 上下留边top10 bottom25 该做法在数据量很大的时候表现不好 TODO
        var bgMargin=new BgMargin(0.06,0.00,0.24,0.072);
        var bgPosition=getBgPosition(canvas.width,canvas.height,bgMargin);
        var ctx=canvas.getContext('2d');
        var color='#e3e3e5';
        var lineNum=6;  //垂线的百分率暂时定死 TODO
        var endPoints=drawBgVertical(ctx,bgPosition,lineNum,color,colHeight);
        var words=['0','20%','40%','60%','80%','100%'];
        ctx.fillStyle='#acacac';
        drawBottomWords(ctx,endPoints,words);
        ctx.fillStyle='#ededed';
        var startPoints=drawBgColumn(ctx,bgPosition,colHeight,data.data.length);
        var colors=['#FFA11D','#4f94f3','#FF7200','#51BF69','#FFBC1B','#d051cc','#4F94F3','#FF7200','#51BF66','#FFBC1B'];
        drawColorColumn(ctx,bgPosition,colHeight,data,startPoints,colors);
        //绘制完成 通过y坐标判断点击位置
        canvas.addEventListener('click',clickColumn,false);
        function clickColumn(e){
            var clickX;
            var clickY;
            if(e.layerX|| e.layerX==0){
                clickX= e.layerX;
                clickY= e.layerY;
            }else if(e.offsetX|| e.offsetX==0){
                clickX= e.offsetX;
                clickY= e.offsetY;
            }
            if(clickX>bgPosition.basePoint.x-5){    //精确度5px
                for(var i=0;i<startPoints.length;i++){
                    if(Math.abs(clickY-startPoints[i].y)<colHeight-1){  //留出1px的误差值
                        $state.go('quota.chart.columnchart');
                    }
                }
            }
        }
    }
//绘制背景竖线
    function drawBgVertical(ctx,bgPosition,lineNum,color,colHeight){
        var lineSpace=bgPosition.width/(lineNum-1);
        var startPoint=new Point(bgPosition.basePoint.x,bgPosition.basePoint.y);    //要使用值复制的方法创建对象 用引用会破坏原始数据
        var endPoint=new Point();
        var endPoints=[];  //存储每条垂线的终点 提供给后面的数值绘制
        for(var i=0;i<lineNum;i++){
            endPoint.x=startPoint.x;
            endPoint.y=startPoint.y+bgPosition.height-2.5*colHeight;    //底部刻度留白
            ctx.fillStyle=color;
            ctx.fillRect(startPoint.x,startPoint.y,1,bgPosition.height-2.5*colHeight);  //画线会出现重合问题 这里用1个像素的矩形代替
            endPoints[i]=new Point(endPoint.x,endPoint.y);
            startPoint.x=startPoint.x+lineSpace;
        }
        ctx.stroke();
        return endPoints;
    }
//绘制底部刻度
    function drawBottomWords(ctx,points,words){
        for(var i=1;i<words.length;i++){    //0不展示
            ctx.fillText(words[i],points[i].x-16,points[i].y+20);
        }
    }
//循环绘制柱形底色
    function drawBgColumn(ctx,bgPosition,colHeight,num){
        var x=bgPosition.basePoint.x;
        var y=bgPosition.basePoint.y;
        var startPoints=[];    //每个柱形的起点 提供给后面的label
        for(var i=0;i<num;i++){
            ctx.fillRect(x,y,bgPosition.width,colHeight);
            startPoints[i]=new Point(x,y);
            y=colHeight*3+y;
        }
        ctx.stroke();
        return startPoints;
    }
//绘制彩色柱形
    function drawColorColumn(ctx,bgPosition,colHeight,data,startPoints,colors){
        var colorIndex=0;
        var colWidth=0;
        var endX=0;
        for(var i=0;i<data.data.length;i++){
            if(colorIndex==colors.length-1){    //循环使用颜色
                colorIndex=0;
            }
            ctx.fillStyle=colors[colorIndex];
            colorIndex++;
            colWidth=bgPosition.width*data.data[i].value/data.maxValue;
            ctx.clearRect(startPoints[i].x,startPoints[i].y,colWidth,colHeight);
            ctx.fillRect(startPoints[i].x,startPoints[i].y,colWidth,colHeight);
            //处理左侧文字
            ctx.font='9px 微软雅黑';
            ctx.fillStyle='#8F8F8F';
            ctx.textAlign='right';
            ctx.fillText(data.data[i].text,startPoints[i].x-5,startPoints[i].y+11);
            //处理下后面数值文字的显示位置 如果预计要超出边界就向左移动一个列高的距离
            endX=startPoints[i].x+colWidth;
            if(endX>(bgPosition.basePoint.x+bgPosition.width)*0.9)
            {
                ctx.textAlign='right';
                ctx.fillStyle='#ffffff';
                ctx.fillText(data.data[i].value,endX-2,startPoints[i].y+11);
            }else{
                ctx.textAlign='left';
                ctx.fillText(data.data[i].value,endX+4,startPoints[i].y+11);
            }
        }
        ctx.stroke();
    }
    return {
        'drawColumnChart':drawColumnChart
    }
});
