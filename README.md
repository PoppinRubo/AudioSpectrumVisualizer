# AudioSpectrumVisualizer
音频频谱可视化插件
<br>
![Alt text](https://github.com/Poppinrubo/AudioSpectrumVisualizer/blob/gh-pages/images/4.gif)

使用方法
-------

1、引入js
  ```javascript
    <script src="js/visualizer.js" type="text/javascript"></script>
  ```
2、创建canvas
  ```html
    <canvas id="show" width="560" height="350"></canvas>
```

3、实例化,调用接口
  ```javascript
      var visualizer = new Visualizer();
      visualizer.config({
              audioUrl: "/music/1.mp3",//音频地址,注:地址不可跨域
              canvasId:"show"//canvas 标签的id
            });
  ```

[开发记录文档](https://poppinrubo.github.io/AudioSpectrumVisualizer/record "开发记录")  



