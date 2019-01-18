let zmitiCompanyUtil = {
    getUserInfo(key = 'companylogin') { //tasklogin需要修改成companylogin 因现在还没区分用户登录还是内部人员登录，先不做处理。

        var loginObj = {};
        try {
            loginObj = JSON.parse(localStorage.getItem(key));
        } catch (error) {
            window.location.hash = '/companylogin';
        }

        return loginObj ? loginObj.data : {};
    },
    ajax(option) {
        var opt = option.data || {};
        var userInfo = this.getUserInfo();


        if (userInfo && userInfo.companyuserid && userInfo.accesstoken && !option.isLogin) {
            opt.companyuserid = userInfo.companyuserid;
            opt.accesstoken = userInfo.accesstoken;
        }
        var formData = new FormData();



        for (var attr in opt) {
            formData.append(attr, opt[attr]);
        }
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata    
            }
        };
        axios.post(option.url, formData, config).then((dt) => {
            var dt = dt.data;

            if (dt.getret === 0) {

            } else if (dt.getret === 1000) {
                window.localStorage['login'] = '';
                if (option.self && option.self.isAdmin) {
                    window.location.href = './#/login';
                } else {
                    window.location.hash = '/login';
                }

                window.location.reload();


            }
            option.fn && option.fn(dt);
            option.success && option.success(dt);
        }).catch((err) => {

            option.fnError && option.fnError();
            option.error && option.error();
            option._this && option._this.$Message.error('服务器开小差了，请稍后重试');
        });

        return;


    },
};

export default zmitiCompanyUtil;