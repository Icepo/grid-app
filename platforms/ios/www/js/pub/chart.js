/**
 * 抽取canvas绘图中可重用的方法 作为自定义图表插件的基类
 * 自适应的实现：
 *      1.定义画板中的某一点为basePoint
 *      2.通过basePoint获取要绘制部分在canvas中的坐标
 *      3.按照背景、数据、补充信息的顺序绘制多个图层实现效果
 *      4。basePoint位置
 *          折线图：坐标系的左上角 留左侧边距的时候要考虑到数据宽度
 *          柱状图：第一个柱形左上角
 * Created by liuzhangjun on 2015/5/21.
 */

//定义点对象
function Point(x,y){
    this.x=x;
    this.y=y;
}
//两点画线 默认的实线
function drawLine(ctx,startPoint,endPoint,color){
    ctx.moveTo(startPoint.x,startPoint.y);
    ctx.strokeStyle=color==undefined?'#000000':color;
    ctx.lineTo(endPoint.x,endPoint.y);
}
//两点画虚线
function drawDottedLine(ctx,startPoint,endPoint,dottedSpace,color){
    var length=Math.sqrt(Math.pow(endPoint.x-startPoint.x,2)+Math.pow(endPoint.y-startPoint.y,2));
    var dotNum=Math.floor(length/dottedSpace);
    var tempX=(endPoint.x-startPoint.x)/dotNum;
    var tempY=(endPoint.y-startPoint.y)/dotNum;
    ctx.moveTo(startPoint.x,startPoint.y);
    ctx.strokeStyle=color==undefined?'#000000':color;
    var tempPoint=new Point(startPoint.x,startPoint.y);
    for(var i=0;i<dotNum;i++){
        tempPoint.x=tempPoint.x+tempX;
        tempPoint.y=tempPoint.y+tempY;
        if(i%2==0){
            ctx.lineTo(tempPoint.x,tempPoint.y);
        }else{
            ctx.moveTo(tempPoint.x,tempPoint.y);
        }
    }
}
//定义背景框在画板中的上下左右间距
function BgMargin(top,bottom,left,right){
    this.bgMarginTop=top;
    this.bgMarginBottom=bottom;
    this.bgMarginLeft=left;
    this.bgMarginRight=right;
}
//定义背景框在画板中的位置对象
//  左上做为基点 给出宽高
function BgPosition(basePoint,width,height){
    this.basePoint=basePoint;
    this.width=width;
    this.height=height;
}
//通过画板大小和背景框四面间距得出位置
function getBgPosition(canvasWidth,canvasHeight,bgMargin){
    var basePoint=new Point(canvasWidth*bgMargin.bgMarginLeft,canvasHeight*bgMargin.bgMarginTop);
    var width=canvasWidth*(1-bgMargin.bgMarginLeft-bgMargin.bgMarginRight);
    var height=canvasHeight*(1-bgMargin.bgMarginTop-bgMargin.bgMarginBottom);
    return new BgPosition(basePoint,width,height);
}
