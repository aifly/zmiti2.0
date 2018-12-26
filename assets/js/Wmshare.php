<?php
/**
 * 文明网资源库_文明网公共接口
 *
 * @author liuhaijun_win
 */
namespace app\v1\controller;
use app\v1\controller\Base;
use think\Request;
use think\Validate;
use think\Config;

use app\v1\model\Wmsysconfig;
use app\v1\model\Wmresource;

class Wmshare extends Base{
	/**
	 * 
	 * @return type
	 */
	public function index(){
		return ['getret' => -3,'getmsg' =>'无API访问权限'];
	}
	/**
	 * 2.1.1文件上传
	 */
	public function uploadfile(){
		$request = Request::instance();
		if(!$request->isPost() && !config('app_debug')){
			return ['getret' => 1002,'getmsg' => '接口只支持POST请求方式'];
		}
		$postAry = $request->param();
		$rules = [
			['companyid',['regex' =>'/^\w+$/m'],'公司id不可为空且只允许字母或数字'],
			['projectclassname',['regex' =>'/^\w+$/m'],'项目大类名不可为空且只允许字母或数字'],
			['projectsubclassname',['regex' =>'/^\w+$/m'],'项目小类名不可为空且只允许字母或数字'],
			['uploadpath',['regex' =>'/^\w+$/m'],'上传路径不可为空且只允许字母或数字'],
			['userid',['regex' =>'/^\w+$/m'],'用户id不可为空且只允许字母或数字'],
			
			
			['chunk','number','chunk必须传整数'],
			['chunks','number','chunks必须传整数'],
		];
		$validate = new Validate($rules);
		$validateMsg = '';
		if (!$validate->check($postAry)) {
			$validateMsg = $validate->getError();
			return ['getret' => 1004,'getmsg' => $validateMsg];
		}
		
		$targetDir = 'upload_tmp';
		$uploadfileSavepath = $this->getUploadfilepath($postAry);
		if(empty($uploadfileSavepath)){
			return ['getret' => 1005,'getmsg' => '获取上传目录失败'];
		}
		$uploadDir = dirname(ROOT_PATH).DS.$uploadfileSavepath.DS;//上传后文件存储目录
		
		$cleanupTargetDir = true; // 是否删除临时目录中的文件
		$maxFileAge = 5 * 3600; // 临时文件有效期,单位:秒
		// 创建临时目录
		if (!file_exists($targetDir)) {
			@mkdir($targetDir,0777,true);
		}
		// 创建上传后文件存储目录
		if (!file_exists($uploadDir)) {
			@mkdir($uploadDir,0777,true);
		}
		
		// 获取上传的文件
		if (isset($_REQUEST["name"])) {
			$fileName = $_REQUEST["name"];
		} 
		elseif (!empty($_FILES)) {
			$fileName = $_FILES["file"]["name"];
		} 
		else{
			return ['getret' => 1006,'germsg' => '没有文件要上传'];
		}
		 $path_parts = getFileInfo($postAry['name']); //文件名与扩展名
		$ext = isset($path_parts['ex_extension']) ? strtolower($path_parts['ex_extension']) : '';
		$extAry = array(
			'jpg','jpeg','bmp','gif','png','tiff','tif',
			'rar','txt','zip','doc','docx','ppt','xls','xlsx','pdf',
			'mp4','webm',
			'mp3','aac','ogg','wma','vnd','dlna','adts',
		);
		if(!in_array($ext, $extAry)){
			return['getret' => 1007, 'germsg' => '非法的文件类型'];
		}
		$new_name = getOrderNo(); //新文件名
		$new_filename = $new_name.(empty($ext) ? '' : ('.'.$ext)); //新文件名包含格式
		$filePath = $targetDir.DS.$fileName; //临时文件的文件名
        $uploadPath = $uploadDir.DS.$new_filename; //文件存径路径及文件名
		$uploadUrl = '/'.$uploadfileSavepath.'/'.$new_filename;
		// 文件上传切片标识
		$chunk = isset($postAry['chunk']) ? intval($postAry['chunk']) : 0; //当前切片序号,从0开始
        $chunks = isset($postAry['chunks']) ? intval($postAry['chunks']) : 1; //总切片数量

		// 删除临时文件夹中的文件
		if ($cleanupTargetDir) {
			if (!is_dir($targetDir) || !$dir = opendir($targetDir)) {
				return ['getret' => 1008,'germsg' => '不能打开临时目录'];
			}
			while (($file = readdir($dir)) !== false) {
				$tmpfilePath = $targetDir . DIRECTORY_SEPARATOR . $file;
				// 如果临时文件是当前文件，则进入下一个文件
				if ($tmpfilePath == "{$filePath}_{$chunk}.part" || $tmpfilePath == "{$filePath}_{$chunk}.parttmp") {
					continue;
				}
				// 删除临时文件,且文件已经过期，且不是当前文件
				if (preg_match('/\.(part|parttmp)$/', $file) && (@filemtime($tmpfilePath) < time() - $maxFileAge)) {
					@unlink($tmpfilePath);
				}
			}
			closedir($dir);
		}
		// 打开临时文件
		if (!$out = @fopen("{$filePath}_{$chunk}.parttmp", "wb")) {
			return ['getret' => 1009,'germsg' => '打开文件输出流失败'];
		}
		if (!empty($_FILES)) {
			if ($_FILES["file"]["error"] || !is_uploaded_file($_FILES["file"]["tmp_name"])) {
				return ['getret' => 1010,'germsg' => '移动上传文件失败'];
			}
			// Read binary input stream and append it to temp file
			if (!$in = @fopen($_FILES["file"]["tmp_name"], "rb")) {
				return ['getret' => 1011,'germsg' => '打开输入流失败'];
			}
		} 
		else {
			if (!$in = @fopen("php://input", "rb")) {
				return ['getret' => 1012,'germsg' => '打开输入流失败'];
			}
		}
		while ($buff = fread($in, 4096)) {
			fwrite($out, $buff);
		}
		@fclose($out);
		@fclose($in);
		rename("{$filePath}_{$chunk}.parttmp", "{$filePath}_{$chunk}.part");
		$index = 0;
		$done = true;
		for( $index = 0; $index < $chunks; $index++ ) {
			if ( !file_exists("{$filePath}_{$index}.part") ) {
				$done = false;
				break;
			}
		}
		if ( $done ) {
			if (!$out = @fopen($uploadPath, "wb")) {
				return ['getret' => '1005','germsg' => '打开输出流失败'];
			}
			if ( flock($out, LOCK_EX) ) {
				for( $index = 0; $index < $chunks; $index++ ) {
					if (!$in = @fopen("{$filePath}_{$index}.part", "rb")) {
						break;
					}
					while ($buff = fread($in, 4096)) {
						fwrite($out, $buff);
					}
					@fclose($in);
					@unlink("{$filePath}_{$index}.part");
				}
				flock($out, LOCK_UN);
			}
			@fclose($out);
		}
		// 上传成功,返回数据
		$activeNum = intval($chunks) - intval($chunk);
		if (1 == $activeNum) {//表示文件切片都上传完成
			  return ['getret' => 0, 'germsg' => '上传成功', 'fileurl' => Config::get('img_url').$uploadUrl];
		}
		else{
			return ['getret' => 1007, 'getmsg' => '文件正在上传中'];
		}
		return ['getret' => -3, 'getmsg' => '无API访问权限'];
	}
	/**
	 * 获取文件上传后存储路径
	 * @param type $postAry
	 * @return string
	 */
	private function getUploadfilepath($postAry){
		$ret = '';
		$wmsysconfigTable = new Wmsysconfig();
		$row = $wmsysconfigTable->where(['configkeyname' => 'sys_fileuploadpath','status' => 1])->find();
		if(!empty($row)){
			$configcontent = $row['configcontent'];
			if(!empty($configcontent)){
				$configcontentAry = json_decode($configcontent,true);
				if(isset($configcontentAry['uploadpath'])){
					$configpathAry = explode('@', $configcontentAry['uploadpath']);
					if(!empty($configpathAry)){
						$configpathAry = array_filter($configpathAry);
						$defaultvalueAry = $configcontentAry['defaultvalue'];
						$tmpPath = array();
						foreach ($configpathAry as $key => $value){
							if($value != '/'){
								if($value == 'uploaddate'){
									$tmpPath[$key] = date('Ymd');
								}
								else{
									if(isset($postAry[$value]) && !empty($postAry[$value])){
										$tmpPath[$key] = $postAry[$value];
									}
									elseif(isset($defaultvalueAry[$value]) && !empty($defaultvalueAry[$value])){
										$tmpPath[$key] = $defaultvalueAry[$value];
									}
									else{
										return $ret;
									}
								}
							}
							else{
								$tmpPath[$key] = $value;
							}
						}
						if(!empty($tmpPath)){
							$ret = implode('', $tmpPath);
						}

					}
					else{
						$ret = $configcontentAry['uploadpath'];
					}
				}
			}
		}
		return trim($ret,'/');
	}
	/**
	 * 2.1.1文件上传_测试
	 */
	public function uploadfile_2(){
		$request = Request::instance();
		if(!$request->isPost() && !config('app_debug')){
			return ['getret' => 1002,'getmsg' => '接口只支持POST请求方式'];
		}
		$postAry = $request->param();
		$rules = [
			['chunk','number','chunk必须传整数'],
			['chunks','number','chunks必须传整数'],
		];
		$validate = new Validate($rules);
		$validateMsg = '';
		if (!$validate->check($postAry)) {
			$validateMsg = $validate->getError();
			return ['getret' => 1004,'getmsg' => $validateMsg];
		}
		$uploadFiles = $_FILES;
		$uploadFilesAry = array();
		if(!empty($uploadFiles)){
			$uploadFilesAry = $this->getUploadFiles($uploadFiles,$postAry);
		}
		print_r($uploadFilesAry);
		
	}
	/**
	 * 
	 * @param type $uploadFiles
	 * @param type $postAry
	 * @return type
	 */
	private function getUploadFiles($uploadFiles,$postAry){
		$aMultiFiles = array();
		// 判断是否是分片上传
		$iChunk  = isset($postAry["chunk"]) ? intval($postAry["chunk"]) : 0;
		$iChunks = isset($postAry["chunks"]) ? intval($postAry["chunks"]) : 0;
		foreach ($uploadFiles as $sKey => $mFiles) {
			if (is_array($mFiles['name'])) {
				$iCnt = count($mFiles['name']);
				for ($i = 0; $i < $iCnt; ++$i) {
					$aMultiFiles[] = array(
						'key'      => $sKey . '_' . $i,
						'name'     => $mFiles['name'][$i],
						'tmp_name' => $mFiles['tmp_name'][$i],
						'error'    => $mFiles['error'][$i],
						'size'     => $mFiles['size'][$i],
						'chunk'    => $iChunk,
						'chunks'    => $iChunks,
					);
				}
			} 
			else {
				$aMultiFiles[] = array(
					'key'      => $sKey,
					'name'     => $mFiles['name'],
					'tmp_name' => $mFiles['tmp_name'],
					'error'    => $mFiles['error'],
					'size'     => $mFiles['size'],
					'chunk'    => $iChunk,
					'chunks'   => $iChunks,
				);
			}
		}
		return $aMultiFiles;
	}



	public function createzip(){
		$request = Request::instance();
        if(!$request->isPost()&& !config('app_debug')){
            return ['getret' => 1002,'getmsg' => '接口只支持POST请求方式'];
        }
        $postAry = $request->param();
        $rules = [
         
			//['ids' , 'require','id必传'],
			['urls' , 'require','url地址必传'],
        ];
		$validate = new Validate($rules);
        $validateMsg = '';
        if (!$validate->check($postAry)) {
            $validateMsg = $validate->getError();
            return ['getret' => 1004,'getmsg' => $validateMsg];
        }
        $dome = Config::get('img_url');
		$urls = str_replace($dome, dirname(ROOT_PATH), $postAry['urls']);
		$fileAry = explode(',', $urls);
		foreach ($fileAry as $key => $file){
			if(!file_exists($file)){
				unset($fileAry[$key]);
			}
		}
		if(!empty($fileAry)){
			$zipfilename = date('Ymd').'_'.getOrderNo().'.zip';
			$zippathname = dirname(ROOT_PATH).DS.'public'.DS.'downloads'.DS.'zip';
			if(!file_exists($zippathname)){
					@mkdir($zippathname, 0777, true);
			}
			$zipname = $zippathname.DS.$zipfilename;
			$zipurl = $dome.'/public/downloads/zip/'.$zipfilename;
			import('Pclzip.PclZip', EXTEND_PATH);
			$archive = new \PclZip($zipname);
			$v_list = $archive->create(
				$fileAry,
				PCLZIP_OPT_REMOVE_PATH,dirname(ROOT_PATH)
			);
			if ($v_list == 0) {
				return ['getret' => 1005,'getmsg' => '打包失败'];
			}
			else{
				return ['getret' => 0,'getmsg' => '打包成功','zipurl' => $zipurl];
			}
		}
		else{
			return ['getret' => 1006,'getmsg' => '没有文件需要打包'];
		}
		return ['getret' => -3,'getmsg' =>'无API访问权限'];
	}


    /**
     *  查询作品列表
     *
     */
    public function getthefinallist()
    {
        $request = Request::instance();
        if (!$request->isPost() && !config('app_debug')) {
            return ['getret' => 1002, 'getmsg' => '接口只支持POST请求方式'];
        }
        $postAry = $request->param();
        $rules = [
            ['resourceid', 'require', '资源id必传'],

            ['page' , 'number','页数不合法'],
            ['pagenum' , 'number','每页数量不合法'],
        ];
        $validate = new Validate($rules);
        if (!$validate->check($postAry)) {
            $validateMsg = $validate->getError();
            return ['getret' => 1004, 'getmsg' => $validateMsg];
        }
        $resourceTable = new Wmresource();
        $resources = $resourceTable->where(['resourceid' => $postAry['resourceid']])->find();
        if (!empty($resources)) {
            if (!isset($postAry['pagenum'])) {//每页数量
                $pagenum = 20;
            } else {
                $pagenum = intval($postAry['pagenum']) > 0 ? intval($postAry['pagenum']) : 20;
            }
            if (!isset($postAry['page'])) {//第几页fv
                $page = 1;
            } else {
                $page = intval($postAry['page']) > 0 ? intval($postAry['page']) : 1;
            }
            $resourceTableName = $resources['tablemodelname'];
            $talbeObj = model($resourceTableName);


            if(isset($postAry['searchkey']) && !empty($postAry['searchkey'])){ //用户自定义标签 文件名
                $whereAry['filename|userlabel'] = ['like','%'.$postAry['searchkey'].'%'];
            }
            if(isset($postAry['author']) && !empty($postAry['author'])){  // 作者
                $whereAry['author'] =  ['like','%'.$postAry['author'].'%'];
            }

            if(isset($postAry['username']) && !empty($postAry['username'])){  // 用户名
                $whereAry['username'] =  ['like','%'.$postAry['username'].'%'];
            }
            if(isset($postAry['filetitle']) && !empty($postAry['filetitle'])){  // 文件名
                $whereAry['filetitle'] =  ['like','%'.$postAry['filetitle'].'%'];
            }

            if(isset($postAry['publicadtype']) && !empty($postAry['publicadtype'])){  // 类型
                $whereAry['publicadtype'] =  $postAry['publicadtype'];
            }
            if(isset($postAry['status']) && !empty($postAry['status'])){ // 状态
                $whereAry['status'] = $postAry['status'];
            }else{
                $whereAry['status'] = ['in','1,3'];

            }
            $data = $talbeObj->where($whereAry)->limit($pagenum*($page-1), $pagenum)->select();
            $totalnum = $talbeObj->where($whereAry)->field('count(*) num')->find();
            $list = [];
            foreach($data as $value) {
                $filepath = Config::get('img_url').'/'. $value['filepath'].'/'.$value['newfilename'].'.'.$value['fileextname'];
				$pcbilethum = Config::get('img_url') .'/'. $value['pcbilethum'];
				$mobilethum = Config::get('img_url').'/'. $value['mobilethum'];
				$value['filepath'] = $filepath;
				$value['pcbilethum'] = $pcbilethum;
				$value['mobilethum'] = $mobilethum;
            }

            return ['getret' => 0, 'getmsg' => '查询成功','list' =>$data,'totalnum'=>$totalnum];
        }else{
            return ['getret' => 1001, 'getmsg' => '无法找到资源'];
        }
        return ['getret' => -3, 'getmsg' => '无API访问权限'];
    }















}
