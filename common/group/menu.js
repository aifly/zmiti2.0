import zmitiUtil from '../lib/util';

if (zmitiUtil.getCurrentCompanyId() && zmitiUtil.getCurrentCompanyId().companyid){
	var { changyue, company } = require('./usermenu');
	var menuObj = {
		changyue,
		company
	};
}else{
	
	var { user_company,
		basicconfig_admin_rolegroup_setrole_pv_form,
		workorder_workorderlist,
		adminchangyue_adminchangyuesetting_adminchangyuelog,
		product_productrole} = require('./adminmenu');
	var menuObj = {
		user_company,
		basicconfig_admin_rolegroup_setrole_pv_form,
		workorder_workorderlist,
		adminchangyue_adminchangyuesetting_adminchangyuelog,
		product_productrole,
	};
}






export default menuObj;