var stringutil = require('querystring');

var demo = function() {
    //格式化对象
    var result = stringutil.stringify({ name: 'wanglu', school: ['huaibei', 'hongzhong'], age: 25 });
    console.log(result);
    //第二个参数是将格式化后的字符串以‘，’号分隔
    result = stringutil.stringify({ name: 'wanglu', school: ['huaibei', 'hongzhong'], age: 25 }, ',');
    console.log(result);
    //第三个参数是将键值对以‘：’号分隔
    result = stringutil.stringify({ name: 'wanglu', school: ['huaibei', 'hongzhong'], age: 25 }, ',', ':');
    console.log(result);
    //解析格式化对象,同样有第二个和第三个参数，作用同上
    var real = stringutil.parse('name=wanglu&school=huaibei&school=hongzhong&age=25');
    console.log(real);
};
demo();
