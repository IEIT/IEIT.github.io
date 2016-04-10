## demo_3

- float
元素的水平方向浮动，意味着元素只能左右移动而不能上下移动，元素在文档中的顺序就很重要了。

- 防止图片被鼠标拖动
 ```
 # CSS中
 -webkit-user-select:none; /*防止选中*/
 pointer-events: none; /*避免拖动*/
 # HTML5中
 < img src="1.jpg" alt="pic" draggable="false">
 # 或用背景插入
 ```

---
## demo_4

实现垂直居中

```
/* 外边包一个块元素，设置此元素 line-height: 100%; */
display:inline-block

/* 借用表格垂直居中（内容可变时选） */
display: table;

display:table-cell;
vertical-align: middle;

/* 用绝对定位 */
position:absolute；
top:50%；
margin-top:-height/2；

```

- relative 定位中

只有设定父元素 height 值，才能使用 top 属性。

---
## demo_6

- <header>
 > The HTML <header> element represents a group of introductory or navigational aids. It may contain some heading elements but also other elements like a logo, wrapped section's header, a search form, and so on.

Volume＋数字 第几期
杂志名 ＋ issue **

段落间距是？？？

div 之间 会有间距，非margin 和 padding。 内部一旦有 p,h2 等标签，会自动将 margin 合并。

浮动文字，一定要设置行高。不然就不能实现下沉。

text-indent: 2em; 缩进两个字符

Html部分 ->  <div class="triangle"></div>
   Css部分  ->  .triangle {
                             /^ 1.width和height设置为0 ^/
                              width: 0;
                              height: 0;
                              /^ 2.设置三角形三边（上三角, 高为10px, 底边长为14px, 背景色为lime） ^/
                              border-bottom: 10px solid lime;
                              border-left: 7px solid transparent;
                              border-right: 7px solid transparent;
                        }

说明：想绘制朝向为X方向的三角形，那么样式中border-x就不要出现，对应方向的边框宽即为三角形的高，其余两边框的宽度之和即为三角形的底边长。

注：如果绘制的为直角三角形 -
       --->  Html部分 ->  同上.
               Css部分  ->  .triangle {
                                         width: 0;
                                         height: 0;
                                         /^ 1.绘制一条基本边border-top, 或border-bottom ^/
                                         border-bottom: 10px solid lime;
                                         /^ 2.绘制与另一条直角边相反方向的边线（比如这条直角边在右） ^/
                                         border-left: 10px solid transparent;
                                    }


绘制的图形，加 position: relative; 才能定位。

- [font-variant: small-caps](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps) 设置首字母大小不同
- @charset "utf-8"; 添加到 CSS 头部，防止字体乱码
