import symbinUtil from './util';
import Vue from 'vue';
var farmerUtil = {
	getColumnByMenuId(_menuid,s){

		var obserable = Vue.obserable;
		symbinUtil.ajax({
			url:window.config.baseUrl+"/admin/getmenulist",
			validate:s.validateData,
			data:{
				isformat:0
			},
			fnError(){
			},
			fn(data){


				if(data.getret === 0){
					
					var arr = [];
					data.list.forEach((menu,i)=>{
						if(menu.parentmenuid === _menuid){
							var childrenArr = [];
							data.list.forEach((dt,k)=>{
								if(dt.parentmenuid === menu.menuid){
									childrenArr.push({
										name:dt.menuname,
										link:dt.menuurl+_menuid
									})
								}
							})
							var menuObj = {
								name:menu.menuname,
								status:false,
								link:menu.menuurl+(menu.children?'':_menuid)
							};
							if(childrenArr.length){
								menuObj.children =  childrenArr;
							}
							arr.push(menuObj)
						}
						/**/
					});


					//更新tab页面的选中
					obserable.trigger({
						type:'fillTabs',
						data:arr
					});

					switch(s.$route.name){
						case "landownerbaseinfo":
							obserable.trigger({
								type:'fillTabIndex',
								data:[0,0,0]
							})
						break;
						case "landowneraddress":
							obserable.trigger({
								type:'fillTabIndex',
								data:[0,1,0]
							})
						break;
						case "repository":
							obserable.trigger({
								type:'fillTabIndex',
								data:[1,0,-1]
							})
						break;
					}
					
				}
				
			}
		})
	}
}

export default farmerUtil;