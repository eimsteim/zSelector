/*
 * Relative Dropdown（具有关系的多级联动下拉菜单）
 * 
 * 通用的多级联动菜单，加载外部数据源（如：本地JS文件、远端数据）
 * 数据格式：JSON
 * 依赖jQuery
 */
(function($){

	$.fn.zSelector = function(options){
		//default settings
		var defaults = {
			data: 'data.js'					//数据源
		};

		var settings = $.extend(defaults, options);

		//获取this下的所有select
		var _selects = this.children('select');

		//构造哈希表
		var hash = new Object({
			put: function (key, val){
				hash[key] = val;
			},
			get: function(key){
				return hash[key];		
			},
			rm: function(key){
				delete hash[key];
			}
		});

		//添加selector的onchange事件
		$(_selects).change(function(){
			var key = $(this).children(':selected').attr('zipcode');
			//从hash中获取数据
			var obj = hash.get(key);

			//如果包含子节点，则更新到下一级的selector
			if(obj.children){
				var this_idx = $(this).attr('idx');
				var next_idx = parseInt(this_idx) + 1;

				load(obj.children, next_idx);
			} else {	//如果没有子节点，则将所有下级select置为“请选择”

				var _sel_this = $(this);
				while(_sel_this.next('select').length !== 0){
					_sel_this.next('select').empty().append('<option>请选择</option>');

					_sel_this = _sel_this.next('select');
				}

			}
		});

		//递归处理
		//list: 数据源
		//index: 需要从哪一级selector开始更新（起始0）
		var load = function(list, index){
			if(_selects[index]){ //防止selector下标越界
				
				$(_selects[index]).empty();
				//
				if(list.length === 0){
					console.inf('list is empty');
				}

				$.each(list, function(i, n){
					//为当前selector添加option
					$(_selects[index]).append('<option id="'+n.id+'" zipcode="'+n.zipcode+'">'+n.name+'</option>')
					
					//加入hash
					hash.put(n.zipcode, n);

					if(n.selected === "true"){
						//添加selected标记
						$(_selects[index]).children('option[id=' + n.id + ']').attr('selected', 'true');
						//只有当前节点有子节点时才执行递归
						if(n.children){ 
							load(n.children, index+1);
						}
					}
				});
			}
		}

		//加载数据源（以后改为配置动态数据源）
		$.getJSON(settings.data, function(data){
			load(data, 0);
		});




		return this;
	}

})(jQuery);