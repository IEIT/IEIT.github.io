## 延时函数
- `setTimeout` 延时执行，让函数延迟一段时间执行，这个函数只执行一次
 ```
function al(){
       alert("that's ok");
        setTimeout(al,1000);         
    } 
 ```
- `setInterval（function,time）` 定时执行
 ```
function bl(){
       alert("ok");
    }
    setInterval(bl,1000);
 ```

## for等效替换，实现延时
- 采用 `setTimeout` + 迭代实现
- `setInterval` 实现 [参考](http://bbs.csdn.net/topics/250028206)
 ```
for(i=1;i <10;i++)
{
  alert(i);
  delay(10);//延迟10s再执行下一步
} 
等效于
<script>
var i=1;
var timeID=null;
function display()
{
  timeID = window.setInterval("delay()", 1000);
}
function delay()
{
  if(i<10) 
  {
    alert(i);
    i++;
  }
  else
  {
    window.clearInterval(timeID);
  }
}
display();
</script>
 ```