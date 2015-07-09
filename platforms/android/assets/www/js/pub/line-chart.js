/* 自定义linechart的实现 */
//绘制背景的若干平行线 给定位置和总条数
function drawParallel(ctx,bgPosition,lineNum,color){
    var lineSpace=bgPosition.height/(lineNum-1);
    var newY=bgPosition.basePoint.y;
    var firstY=newY;
    var startX=bgPosition.basePoint.x;
    var endX=bgPosition.basePoint.x+bgPosition.width;
    for(var i=0;i<lineNum;i++){
        newY=i*lineSpace+firstY;
        var startPoint=new Point(startX,newY);
        var endPoint=new Point(endX,newY);
        drawLine(ctx,startPoint,endPoint,color);
    }
    ctx.stroke();
}
//绘制垂直的虚线 比直线多了一个参数 虚线间隔长度
//绘制虚线完成后隔行填充
function drawVertical(ctx,bgPosition,lineNum,dottedSpace,color){
    var lineSpace=bgPosition.width/(lineNum-1);
    var newX=bgPosition.basePoint.x;
    var firstX=newX;
    var startY=bgPosition.basePoint.y;
    var endY=bgPosition.basePoint.y+bgPosition.height;
    var arrayY=new Array(); //增加数组存储垂线的x坐标 提供给后面的数值折线
    ctx.strokeStyle=color==undefined?'#000000':color;
    for(var i=0;i<lineNum;i++){
        newX=i*lineSpace+firstX;
        var startPoint=new Point(newX,startY);
        var endPoint=new Point(newX,endY);
        drawDottedLine(ctx,startPoint,endPoint,dottedSpace,color);
        arrayY[i]=newX;
    }
    ctx.stroke();

    //补充的隔行填充
    var rectX=bgPosition.basePoint.x;
    var rectY=bgPosition.basePoint.y;
    ctx.fillStyle='#FAFAFA';
    for(var i=0;i<lineNum-1;i++){
        if(i%2==0){
            ctx.fillRect(rectX,rectY,lineSpace,bgPosition.height);
        }
        rectX=rectX+lineSpace;
    }
    return arrayY;
}
//绘制y轴数值 给定文字大小和相对于基点的偏移量
function drawTextY(ctx,bgPosition,words,size,offSet){
    var startPoint=new Point(bgPosition.basePoint.x-offSet.x,bgPosition.basePoint.y-offSet.y);
    var lineSpace=bgPosition.height/(words.length-1);
    ctx.font=size+'px 微软雅黑';
    ctx.fillStyle='#c7c7cf';
    for(var i=0;i<words.length;i++){
        ctx.fillText(words[words.length-1-i],startPoint.x,startPoint.y);
        startPoint.y=startPoint.y+lineSpace;
    }
}
function drawTextX(ctx,bgPosition,words,size,offSet){
    var startPoint=new Point(bgPosition.basePoint.x-offSet.x,bgPosition.basePoint.y+bgPosition.height-offSet.y);
    var lineSpace=bgPosition.width/(words.length-1);
    //3倍字体绘制x轴起点
    ctx.font=(size*3)+'px 微软雅黑';
    ctx.fillStyle='#ff8000';
    ctx.fillText(words[0],startPoint.x,startPoint.y);
    startPoint.x=startPoint.x+lineSpace;
    //绘制中间的部分
    ctx.font=size*1.2+'px 微软雅黑';
    ctx.fillStyle='#c7c7cf';
    for(var i=1;i<words.length-1;i++){
        ctx.fillText(words[i],startPoint.x,startPoint.y);
        startPoint.x=startPoint.x+lineSpace;
    }
    ctx.font=(size*3)+'px 微软雅黑';
    ctx.fillStyle='#419ADC';
    ctx.fillText(words[words.length-1],startPoint.x,startPoint.y);
}
//绘制坐标折线 附加上的数值
function drawDataLine(ctx,bgPosition,data,arrayY){
    var maxY=data.yInfo[data.yInfo.length-1];
    var dataPoints=new Array();
    ctx.fillStyle='#c7c7cf';
    for(var i=0;i<data.data.length;i++){
        var value=data.data[i];
        var subValue=maxY-value;
        var offSetY=subValue*bgPosition.height/data.totalSub;
        if(i==0){
            ctx.moveTo(arrayY[i],bgPosition.basePoint.y+offSetY);
        }else{
            ctx.lineTo(arrayY[i],bgPosition.basePoint.y+offSetY);
        }
        var p=new Point(arrayY[i],bgPosition.basePoint.y+offSetY);
        dataPoints[i]=p;
        //补充绘制数值
        drawDataWord();
    }
    ctx.stroke();
    //给点错位画数值
    function drawDataWord(){
        ctx.strokeStyle='#c7c7c7';
        ctx.font='10px 微软雅黑';
        ctx.textAlign='center';
        ctx.fillText(value, p.x, p.y-16);
    }
    return dataPoints;
}
//绘制数据点的圆环
function drawBoldPoint(ctx,dataPoints,innerR,outterR){
    for(var i=0;i<dataPoints.length-1;i++){
        var x=dataPoints[i].x;
        var y=dataPoints[i].y;
        ctx.beginPath();
        ctx.strokeStyle='#ff8000';
        ctx.fillStyle='#ff8000';
        ctx.arc(x,y,outterR,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle='#ffffff';
        ctx.fillStyle='#ffffff';
        ctx.arc(x,y,innerR,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    //最后一个蓝色
    var x=dataPoints[dataPoints.length-1].x;
    var y=dataPoints[dataPoints.length-1].y;
    ctx.beginPath();
    ctx.strokeStyle='#4f94f3';
    ctx.fillStyle='#4f94f3';
    ctx.arc(x,y,outterR,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
}
//绘制折线图 需要接受state来传递路由信息
function drawLineChart(data,$state,communicateService,paramsService){
    var app=document.getElementById('app');
    var canvas=document.getElementById('canvas');
    canvas.width=app.clientWidth;
    canvas.height=app.clientHeight*data.heightPercent;
    var bgMargin=new BgMargin(0.06,0.10,0.16,0.072);
    var bgPosition=getBgPosition(canvas.width,canvas.height,bgMargin);
    var ctx=canvas.getContext('2d');
    var dottedSpace=2;
    var verticalLineNum=data.xInfo.length;
    var arrayY=drawVertical(ctx,bgPosition,verticalLineNum,dottedSpace,'#F0F0F0');//绘制垂线并且存储返回的垂线x坐标数组
    var parallelLineNum=(data.yInfo.length-1)*2;
    drawParallel(ctx,bgPosition,parallelLineNum,'#F0F0F0');
    drawTextY(ctx,bgPosition,data.yInfo,12,{x:36,y:-4});
    drawTextX(ctx,bgPosition,data.xInfo,6,{x:20,y:-24});
    var dataPoints=drawDataLine(ctx,bgPosition,data,arrayY);    //绘制数据折线 并且获取中间生成的折点坐标数组
    drawBoldPoint(ctx,dataPoints,4,7);
    //增加点击事件
    canvas.addEventListener('click',function(e){
        var clickX;
        var clickY;
        if(e.layerX|| e.layerX==0){
            clickX= e.layerX;
            clickY= e.layerY;
        }else if(e.offsetX|| e.offsetX==0){
            clickX= e.offsetX;
            clickY= e.offsetY;
        }
        for(var i=0;i<dataPoints.length;i++){
            var distance=Math.sqrt(Math.pow(clickX-dataPoints[i].x,2)+Math.pow(clickY-dataPoints[i].y,2));
            if(distance<16){
                //绘图方法里面修改state 这个做法增加耦合 不好 TODO
                communicateService.communicateTest('appService','action','quotaDataList').success(function(data){
                    paramsService.quotaDataList=data;
                    $state.go('quota.chart.columnchart');
                });

            }
        }
    },false)
}