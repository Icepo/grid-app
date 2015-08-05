/**
 * Created by liuzhangjun on 2015-7-21.
 */
app.filter('dateFilter',function(){
    return function(input,param1){
        if(typeof input=="date"){
            var str="";
            if(param=='yyyy/MM/dd'){
                str=input.getFullYear()+"/"+(input.getMonth()+1)+"/"+input.getDate();
            }
        }
    }
});