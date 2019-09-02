
if (!window.isAdmin){
	var { changyue, company, workorder_workorderlist, triptraffic, infomanager, orderFood, meetingRoom, Party,voteManager} = require('./usermenu');
	var menuObj = {
		changyue,
		company,
		workorder_workorderlist,
		triptraffic,
		infomanager,
		orderFood,
		meetingRoom,
		Party,
		voteManager
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