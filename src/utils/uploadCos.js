/**
 * @Author: user
 * @Date:2018/11/16
 * @Last Modified time: 2018/11/16
 * @Description: 描述
 * @Query: 页面参数
 * @Props: 组件参数
 * @Remark:
 - 备注一
 */


class UploadCOS {

  constructor(){
    var Bucket = 'shop-1256826840';
    var Region = 'ap-beijing-1';
    var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
    this.prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
    this._url = "http://127.0.0.1:7001/api/sts-auth"
    this.picUrl=protocol+"//"+Bucket+'.pictj.myqcloud.com/'
    this.dir='test/'
  }


  getAuthorization(options, callback) {
    var method = (options.Method || 'get').toLowerCase();
    var key = options.Key || '';
    var pathname = key.indexOf('/') === 0 ? key : '/' + key;
    // var url = 'http://127.0.0.1:3000/sts-auth' +
    var url = this._url +
      '?method=' + method +
      '&pathname=' + encodeURIComponent(pathname);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
      var AuthData;
      try {
        AuthData = JSON.parse(xhr.responseText)
      } catch (e) {}
      if (AuthData && AuthData.Authorization) {
        callback(null, {
          Authorization: AuthData.Authorization,
          XCosSecurityToken: AuthData.XCosSecurityToken,
        });
      } else {
        console.error(AuthData);
        callback('获取签名出错');
      }
    };
    xhr.onerror = function (e) {
      callback('获取签名出错');
    };
    xhr.send();
  }

  uploadFile(file, callback){
    var Key = this.dir + file.name; // 这里指定上传目录和文件名
    this.getAuthorization({Method: 'PUT', Key: Key},  (err, info)=> {

      if (err) {
        alert(err);
        return;
      }

      var auth = info.Authorization;
      var XCosSecurityToken = info.XCosSecurityToken;
      var url = this.prefix + Key;
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization', auth);
      XCosSecurityToken && xhr.setRequestHeader('x-cos-security-token', XCosSecurityToken);
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 206) {
          var ETag = xhr.getResponseHeader('etag');
          callback(null, {url: url, ETag: ETag});
        } else {
          callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
        }
      };
      xhr.onerror = function () {
        callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
      };
      xhr.send(file);
    });
  }



  upload(file){
    console.log("我进来了")
    return new Promise((resolve, reject)=>{
      file && this.uploadFile(file,  (err, data) =>{
        console.log("--->"+this.picUrl+this.dir+file.name)
        resolve(this.picUrl+this.dir+file.name)
      });
    })

  }

}

export default UploadCOS
