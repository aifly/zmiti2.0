import symbinUtil from './util';
var sysbinVerification = {
	validate($this){
		
		try{
			return JSON.parse(symbinUtil.getCookie('login'));
		}catch(e){
			$this.$Message && $this.$Message.warning('登录失效，请登录');
			setTimeout(()=>{
				window.location.hash = '/login/';
			},300)
		}
	}
};
export default sysbinVerification;