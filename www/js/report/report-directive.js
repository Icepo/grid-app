/**
 * Created by liuzhangjun on 2015-5-25.
 */
app.directive('selector',function(){
    return {
        restrict:'A',
        link:function(scope,element,attrs){
            element.bind('click',function(event){
                var obj=event.target;
                if(obj.classList.contains('option')){
                    var options=obj.parent
                }
            });
        }
    }
});