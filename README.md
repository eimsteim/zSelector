# zSelector
zSelector是一款简单的，基于jQuery开发的级联菜单插件，理论上支持无限级联。

使用方法：

1、在使用前，请保证你的工程中已经正确地引入jquery.js和jquery.zSelector.js
2、在你的HTML页面中需要级联菜单的位置插入如下代码：
```html
<div id="demo_select">
    <select idx="0"></select>
    <select idx="1"></select>
    <select idx="2"></select>
</div>
```
注意：
1）外层div容器的id是可以随意指定的；
2）内层select标签可以无限增加，但请保证每个select标签都包含idx属性，且idx的值是按顺序递增的，这点非常重要；

3、在你的script脚本中添加如下代码：
```javascript
<script type="text/javascript">
$(function(){
    $('#demo_select').zSelector();
});
</script>
```
传统的jQuery插件调用方式。

4、demo中提供了一个默认的数据源data.js，数据格式为JSON，你可以自己研究一下data.js的格式，并通过如下形式定义自己的数据源：
```javascript
<script type="text/javascript">
$(function(){
	$('#demo_select').zSelector({
		data: 'my.js'
	});
});
</script>
```
* 很抱歉，目前暂不支持远程数据源的调用。

5、对data.js的数据格式说明：
* name		- 将作为内容显示在option中
* id		- 将作为option的ID
* zipcode	- 非常重要的一个字段，用于构建哈希表索引，在这里我使用了邮编（因为是用来做省市区级联），你也可以定义自己的zipcode，但前提是每个zipcode都必须唯一。
* selected 	- 标识该option是否被设置为selected
* children	- 拥有children的option，其children将被自动更新到下一级菜单
