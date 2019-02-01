/**
 * Created by 宋佩兰 on 2018/7/13.
 */

import api from 'api'


// 请求用到的参数
var Bucket =  'shop-1256826840';
var Region = 'ap-beijing-1';
var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';


class UploadOss {
  constructor() {

    if (UploadOss.unique !== undefined) { //单例模式
      return UploadOss.unique;
    }
    UploadOss.unique = this;

  }


  getAuthorization(options, callback){

    var key = options.Key || '';
    var pathname = key.indexOf('/') === 0 ? key : '/' + key;


    api.stsAuth({pathname:encodeURIComponent(pathname)}).done((data)=>{
      let AuthData = data
      callback(null, {
        Authorization: AuthData.Authorization,
        XCosSecurityToken: AuthData.XCosSecurityToken,
      });
    })


  }



  uploadFile(file, callback){
    //var Key = 'test/' + file.name; // 这里指定上传目录和文件名
    var Key = file.name; // 这里指定上传目录和文件名
    this.getAuthorization({Method: 'PUT', Key: Key}, function (err, info) {

      if (err) {
        alert(err);
        return;
      }

      var auth = info.Authorization;
      var XCosSecurityToken = info.XCosSecurityToken;
      var url = prefix + Key;
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization', auth);
      XCosSecurityToken && xhr.setRequestHeader('x-cos-security-token', XCosSecurityToken);
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 206) {
          var ETag = xhr.getResponseHeader('etag');
          callback(null, {url: url, ETag: ETag});
        } else {
          console.log(xhr)
          callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
        }
      };
      xhr.onerror = function () {
        callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
      };
      xhr.send(file);
    });
  }




  async upload($file) {
    return new Promise(async(reslove, reject) => {
    //  var fileName = ' http://'+Bucket+'.pictj.myqcloud.com/test/'+$file['name'];
      var fileName = ' http://'+Bucket+'.pictj.myqcloud.com/'+$file['name'];

      this.uploadFile($file,function(err, data){
        console.log(err || data);
        if(err){
          reject(err)
        }else{
          reslove(fileName)
        }
      })

    })

  }


  // async upload($file) {
  //   return new Promise(async(reslove, reject) => {
  //     var fileName = $file['name'];
  //     let fileNamePostfix = fileName.substring(fileName.indexOf('.'))
  //
  //     let uploadData = await this.getUploadConfig().catch((err) => {
  //       reject(err)
  //     });
  //     var ossData = uploadData;
  //
  //     var request = new FormData();
  //     var dateTimer = Date.now() + '_';
  //     var ossImgUrl = this.imgHost + ossData.dir + dateTimer + fileNamePostfix;
  //     request.append('OSSAccessKeyId', ossData.accessid);
  //     request.append('policy', ossData.policy);
  //     request.append('Signature', ossData.signature);
  //     request.append('success_action_status', '200');
  //     request.append('key', ossData.dir + dateTimer + fileNamePostfix);
  //
  //     $file && request.append('file', $file);
  //     request.append('dir', ossData.dir);
  //
  //
  //     api.uploadOss(request, ossData.host).done((data) => {
  //       reslove(ossImgUrl)
  //     }).fail((e) => {
  //       reject(e)
  //     })
  //   })
  //
  // }
}

export default UploadOss
