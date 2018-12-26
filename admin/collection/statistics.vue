<template>
	<section  class="wm-collection-statistics-manager">
		<div class='wm-statistics-user-count-C'>
            <div class='wm-statistics-user-upload-count'>
                <header>用户上报数</header>
                <div>
                    <div class='wm-statistics-user-count'>
                        <div>{{userList.length}}</div>
                        <div>总上报人数</div>
                        <div>
                            <span>今日上报量：<label for="">{{statustotal.reporttodaynum}}</label></span> 
                            <span>今日审核量：<label>{{statustotal.todayauditnum}}</label></span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class='wm-statistics-user-upload-list'>
                <Table :width="(viewW-200-100)*3/7" :bordered="false" :data='userList' :columns='columns'></Table>
            </div>
        </div>
		<div class='wm-statistics-file-count-C'>
            <div class='wm-statistics-user-upload-count'>
                 <header>作品总数</header>
                <div class='wm-statistics-file-checked-status-C'>
                    <div>
                        <div class='wm-statistics-user-count'>
                            <div>{{statustotal.totalnum}}</div>
                            <div>总作品</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>待审核</div>
                            <div>{{statustotal.uncheckednum}}</div>
                        </div>
                        <div>
                            <div>已审核</div>
                            <div>{{statustotal.checkednum}}</div>
                        </div>
                        <div>
                            <div>审核失败</div>
                            <div>{{statustotal.unpassnum}}</div>
                        </div>
                        <div>
                            <div>已通过终审</div>
                            <div>{{statustotal.lastcheckednum}}</div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div>
                <Table  :data='fileList' :columns='columns1'></Table>
            </div>
        </div>
	</section>
</template>

<script>
    import symbinUtil from '../lib/util';
    import './statistics.css';
	import Vue from "vue";
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
                userList:[
                   
                ],
                fileList:[],
                statustotal:{},
                usertotalnum:0,
                viewW:window.innerWidth,
                
                columns:[
                    {
                        title:'上传者',
                        key:'username',
                        align:'center',
                        width:160,
                        fixed: 'left'
                    },
                    {
                        title:'总数量',
                        key:'totalnum',
                        align:'center',
                        width:100,
                       fixed: 'left'
                    },
                    {
                        title:'总浏览量',
                        key:'viewsnum',
                        align:'center',
                        width:110,
                    }, {
                        title:'总下载量',
                        key:'downloadsnum',
                        align:'center',
                        width:110,
                    },
                    {
                        title:'已审核',
                        key:'checkednum',
                        align:'center',
                        width:100,
                    },
                    {
                        title:'待审核',
                        key:'uncheckednum',
                        align:'center',
                        width:100,
                    },
                    {
                        title:'审核未通过',
                        key:'unpassnum',
                        align:'center',
                        width:100
                    },
                    {
                        title:'已通过终审',
                        key:'lastcheckednum',
                        
                        width:100,
                        align:'center'
                    },
                    {
                        title:'未通过终审',
                        key:'lastrejectnum',
                        align:'center',
                        width:100
                    }
                ],
                columns1:[
                    {
                        title:'图标',
                        key:'username',
                        align:'center',
                        render:(h,params)=>{
                            return h('div',{
                                style:{
                                    margin:'0 auto',
                                    width:'24px',
                                    height:'27px',
                                    background:'url('+imgs[params.row.type.split('-')[0]]+') no-repeat center',
                                    backgroundSize:'contain'
                                },
                                props:{
                                    
                                }
                            },'')
                        }
                    },
                    {
                        title:'总数量',
                        key:'totalnum',
                        align:'center'
                    },
                    {
                        title:'已审核',
                        key:'checkednum',
                        align:'center'
                    },
                    {
                        title:'待审核',
                        key:'uncheckednum',
                        align:'center'
                    },
                    {
                        title:'审核未通过',
                        key:'unpassnum',
                        align:'center'
                    },
                    {
                        title:'已通过终审',
                        key:'lastcheckednum',
                        align:'center'
                    },
                    {
                        title:'未通过终审',
                        key:'lastrejectnum',
                        align:'center'
                    }
                ]
                

			}
		},
		components:{
		},
		watch:{

			mainType(val){
				if(val === 3){
				}
			},
			
		},
		methods:{

            getList(){
                var id = this.$route.params.id;
				var s = this;
                var {obserable} = Vue;
                var t = setInterval(()=>{

                    var resource = obserable.trigger({
                        type:'getResource'
                    });
                    
                    if(resource){
                        var uploadtype = '';
                        clearInterval(t);
                        var data = JSON.parse(resource[0].tablefield).fieldlist;
                        data.forEach((item,i)=>{
                            if(item.fieldname === "publicadtype"){
                                uploadtype = item.data.join(',');
                                var  data  ={
                                    admintoken:s.userinfo.admintoken,
                                    adminusername:s.userinfo.adminusername,
                                    resourceid:id,
                                    uploadtype
                                };
                                symbinUtil.ajax({
                                    url:window.config.baseUrl+'/wmadadmin/getsummary',
                                    data,
                                    success(data){
                                        console.log(data);
                                        if(data.getret === 0){
                                            s.userList = data.list.usertotal;
                                            s.statustotal = data.list ?data.list.statustotal:{};
                                            s.usertotalnum = data.list.usertotalnum;
                                            for(var upload in data.list.uploadtypetotal){
                                                var item = data.list.uploadtypetotal[upload];
                                                item.type = upload;
                                                s.fileList.push(item);
                                            }
                                        }
                                    }
                                })
                            }
                        })
                        
                    }
                },30)
                
				
            }

		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
            
            this.getList();
		
 
		}
	}
</script>
 <style>
	
 </style>
 