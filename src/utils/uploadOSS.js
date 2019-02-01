/**
 * Created by 宋佩兰 on 2018/7/13.
 */

import api from 'api'

class UploadOss {
  constructor() {

    if (UploadOss.unique !== undefined) { //单例模式
      return UploadOss.unique;
    }
    UploadOss.unique = this;

    this.ossOption = {}
    this.lasttime = 0
    this.enable = true
  }


  /**
   * 得到upload的参数
   * 如果超过过期时间去重新请求数据，如果未超过，则返回
   * */
  async getUploadConfig() {

    let expireTime = this.ossOption.expireTime || 0; // oss过期时间

    if (this.enable && (expireTime == 0 || Date.now() - this.lasttime > expireTime)) {

      this.enable = false
      let data = await api.getAliOssUploadCfg().catch((err) => {
        console.log('获得oss参数error', err)
        return null
      });
      if (data && data.code == 1000) {
        data = data.data
        this.lasttime = Date.now()
        this.ossOption = data
        //this.setImgHost()

      }
      this.enable = true
    }

    return this.ossOption

  }




  async upload($file) {
    return new Promise(async(reslove, reject) => {
      var fileName = $file['name'];
      let fileNamePostfix = fileName.substring(fileName.indexOf('.'))

      let uploadData = await this.getUploadConfig().catch((err) => {
        reject(err)
      });
      var ossData = uploadData;

      var request = new FormData();
      var dateTimer = Date.now() + '_';
      var ossImgUrl = ossData.host+"/" + ossData.dirPath + dateTimer + fileNamePostfix;
      request.append('OSSAccessKeyId', ossData.OSSAccessKeyId);
      request.append('policy', ossData.policy);
      request.append('Signature', ossData.signature);
      request.append('success_action_status', '200');
      request.append('key', ossData.dirPath + dateTimer + fileNamePostfix);

      $file && request.append('file', $file);
      request.append('dir', ossData.dirPath);


      api.uploadOss(request, ossData.host).done((data) => {
        reslove(ossImgUrl)
      }).fail((e) => {
        reject(e)
      })
    })

  }
}

export default UploadOss
