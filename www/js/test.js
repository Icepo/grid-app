window.onload=function(){
    //注册初始事件
    document.addEventListener('deviceready',onDeviceReady,false);
};
function onDeviceReady(){
    alert('deviceReady');
    //应用进入后台时触发
    document.addEventListener('pause',onPause,false);
    //应用从后台恢复时触发
    document.addEventListener('resume',onResume,false);
    //用户按返回键时触发
    document.addEventListener('backbutton',onBackButton,false);
    //用户按下菜单键   !不好用
    document.addEventListener('menubutton',onMenuButton,false);
    //降低音量按键
    document.addEventListener('volumedownbutton',onVolumeDownButton,false);
    //增加音量按键
    document.addEventListener('volumeupbutton',onVolumeUpButton,false);
    //显示设备信息
    showDevice();
}
function onPause(){
    alert('pause');
}
function onResume(){
    alert('resume');
}
function onBackButton(){
    alert('backButton');
}
function onMenuButton(){
    alert('menuButton');
}
function onVolumeDownButton(){
    alert('volumeDownButton');
}
function onVolumeUpButton(){
    alert('volumeUpButton');
}
function showDevice(){
    document.getElementById('device_cordova').innerHTML=device.cordova;
    document.getElementById('device_model').innerHTML=device.model;
    document.getElementById('device_uuid').innerHTML=device.uuid;
    document.getElementById('device_version').innerHTML=device.version;
    document.getElementById('device_imei').innerHTML=device.imei;
}