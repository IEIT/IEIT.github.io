var num = 0,
    myStr = `<p>
      <a href="./task_${1}/demo_${2}/">${3}</a>
      <a href="https://github.com/IEIT/IEIT.github.io/tree/master/task_${1}/demo_${2}" class="code">Code</a>
    </p>`


let nn = myStr.replace(/\d+/g, function() {
  return 111
})

console.log(nn)

// '<span style="font-family:\'微软雅黑\';">;\'demo\'</span>'.replace(/\'[^']+\'/g,function(){
//     var sResult=arguments[0];
//     console.log(sResult);//'微软雅黑'
//     console.log(num++)
//     // sResult=sResult.replace(/\'/g,'');
//     // console.log(sResult);//微软雅黑
//     return sResult;
//
// })//<span style="font-family:微软雅黑;">demo</span>
