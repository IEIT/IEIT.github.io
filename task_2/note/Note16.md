# 代码简化、JSON、正则表达
## 正则表达式匹配
[正则匹配中文及常用正则表达式](http://wangwei007.blog.51cto.com/68019/1108694)

## JSON 对象
[参考](http://javascript.ruanyifeng.com/stdlib/json.html)
[JavaScript对Json的增删改属性](http://cst.is-programmer.com/posts/21823.html)

## 代码简化

```
var $ = function (id) {
	return document.getElementById(id);
}
```

## 判断对象是否为空

```
isEmptyObject: function( obj ) {
    for ( var name in obj ) {
        return false;
    }
    return true;
}
```

[typeof MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
[数据类型判断](http://www.cnblogs.com/xyzhanjiang/p/4145951.html)

## 弹出框
[JS的三种最常见的对话框](http://blog.csdn.net/huileiforever/article/details/9464659)