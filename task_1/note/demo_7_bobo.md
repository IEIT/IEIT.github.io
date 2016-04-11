## 疑惑点
1. log 与 nav 是用浮动实现好呢？还是 绝对定位好呢？目前浮动方案
2. nav 里 li 浮动可以为 Inline-block ,也可以为 block 
3. section 与 header 之间有一段空隙。relative 时，fontsize 会进行 marign 叠加
4. 开始体验按钮，用button 写还是用 a 写。http://www.html-js.com/article/column/739
5. 盒子等分实现
 ```
 display:box;
    box-orient:horizontal;
 ```

 display: table; 
 display: table-cell;

 6. .characters-box:last-child div 要注意是选的：前的元素

 7. h1,h2# p# 也许会自带 margin，会导致 margin 叠加
 8. 等比例缩放 http://www.w3ctech.com/topic/1483
 9. flex 弹性布局 http://www.zhangxinxu.com/wordpress/2010/12/css-box-flex%E5%B1%9E%E6%80%A7%EF%BC%8C%E7%84%B6%E5%90%8E%E5%BC%B9%E6%80%A7%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B%E7%AE%80%E4%BB%8B/

 10. 解决 letter-spacing 最后一个 letter 空隙问题，用伪类解决

 .contact .contact-wrap form button:first-letter {
	letter-spacing: 1em;
}

11. 为 select 设置 placeholder


## demo_8

在浮动并排中，HTML 中在前的优先级高，会挤优先级低的到下一行。