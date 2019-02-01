/**
 * Created by songpeilan on 2018/7/13.
 */
import {API_HOST, API_OSS_HOST} from '../config'


let host = 'http://apidoc.hefantv.com/mock'

export default {
  getAliOssUploadCfg() {
    return Promise.resolve(
      $.ajax({
        url: API_HOST + '/api/ossAuth', dataType: 'json',
        data: this.paramFormat()
      })
    );
  },
  uploadOss(request, host){
    return $.ajax({
      url: host,
      data: request,
      // 告诉jQuery不要去处理发送的数据
      processData: false,
      // 告诉jQuery不要去设置Content-Type请求头
      contentType: false,
      method: "POST",
    })
  },
  /** 商品管理-->申请列表*/
  getApplyList(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/apply/getApplyList",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品管理-->申请列表（申请上架/撤销审核）*/
  upStatus(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/apply/upStatus",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },

  /** 商品申请-获取商品详情*/
  getProductById(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/getProductApplyDetail",
        headers: this.setHeaders(),
        dataType: 'json',
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品申请-发布商品*/
  addProduct_apply(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/addProduct",
        dataType: 'json',
        headers: this.setHeaders(),
        // method: "POST",
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品申请-编辑商品*/
  editProduct_apply(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/apply/editProduct",
        dataType: 'json',
        headers: this.setHeaders(),
        method: "POST",
        data: this.paramFormat({...data})
      })
    );
  },

  /** 商品-编辑商品*/
  editProduct(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/editProduct",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品-商品详情接口*/
  getProductDetail(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/getProductDetail",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },

  /** 商品管理-->申请列表-->状态变更记录*/
  getUpStatusLog(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/apply/getUpStatusLog",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品管理-->商品列表*/
  getProductList(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/getProductList",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品管理-->商品列表-->上架/下架*/
  shelfProduct(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/shelfProduct",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品管理-->商品列表-->排序*/
  sortProduct(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/sortProduct",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
  /** 商品管理-->商品列表-->排序*/
  deleteProduct(data){
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/web/deleteProduct",
        dataType: 'json',
        headers: this.setHeaders(),
        data: this.paramFormat({...data})
      })
    );
  },
}
