<template>
    <div class="symbin-dialog-person">
        <Button type="primary">人员列表</Button>
              
    </div>    
</template>
<script>
    import './index.css';
    import sysbinVerification from '../lib/verification';
    import symbinUtil from '../lib/util';
    import Vue from 'vue';
    export default {
        props: {
            
        },
        data:function () {
            return {
                modalpersonal: true
            }
        },
        methods:{
            /*getListRole(rak,fn){//获取数据
                    var s=this;
                    symbinUtil.ajax({
                        url:window.config.baseUrl+"/admin/getrolelist",
                        type:'post',
                        validate:s.validateData,
                        data:{
                            q:Date.parse(new Date()),
                        },
                        fn(data){
                            
                            if(data.getret===0){
                                console.log(data,'data');
                            }
                            else{

                                 s.$Message.error({
                                    content:data.getmsg,
                                    duration: 10
                                  });
                                 if(data.getret === 1300){
                                    window.location.hash = '/login/'

                                 }
                            }
                            
                        }
                    })
                }
            }*/
        }
    };
</script>