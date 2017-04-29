/**
 * HTML5 Audio Visualizer API
 * HTML5音频频谱可视化API
 * Author：PoppinRubo
 * License: MIT
 */

//创建一个对象方法
function Visualizer() {
    //先把自己用变量储存起来,后面要用
    var Myself = this;
    //频谱配置,外部调用就开始进行处理
    this.config = function (Object) {
        Myself.audioUrl = Object.audioUrl;
        windowAudioContext();
    }
    //下面这些为内部方法,外部不可访问

    //实例化一个音频类型window.AudioContext
    function windowAudioContext() {
        //下面这些是为了统一Chrome和Firefox的AudioContext
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            Myself.audioContext = new AudioContext();
            //AudioContext实例化后就拉取音频
            loadSound();
        } catch (e) {
            console.log(e + ',您的浏览器不支持 AudioContext');
        }
    }

    //加载音频对象方法
    function loadSound() {
        var request = new XMLHttpRequest(); //建立一个请求
        request.open('GET', Myself.audioUrl, true); //配置请求类型，文件路径,路径不可跨域
        request.responseType = 'arraybuffer'; //配置数据返回类型
        request.onload = function () {
            //拉取成功返回ArrayBuffer(一块内存空间,缓冲),调用播放
            play(request.response);
        }
        request.send();
    }

    function play(audioData) {
        var audioContext = Myself.audioContext;
        //解码ArrayBuffer
        audioContext.decodeAudioData(audioData).then(function (decodedData) {
            //解码完成,播放,到这里你就可以听到声音了
            var audioBufferSouceNode = audioContext.createBufferSource();
            audioBufferSouceNode.connect(audioContext.destination);
            audioBufferSouceNode.buffer = decodedData;
            audioBufferSouceNode.start(0);
        }, function (e) {
            console.log(e+",文件解码失败!");
        });

    }

}