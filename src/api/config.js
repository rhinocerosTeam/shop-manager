/**
 * Created by Cray on 2017/1/5.
 */
// 'http://apidoc.hefantv.com/mock';

// export const API_HOST = (process.env.NODE_ENV === 'production') ?
//
//   'https://apidian.hefantv.com/pubapi/diangw' : (process.env.NODE_ENV === 'preproduction' ?
//     'https://apidian.adposter.cn/pubapi/diangw' : (process.env.NODE_ENV === 'testing' ?
//       'https://testerapidian.hefantv.com/pubapi/diangw' :
//       // '//testmall.hefantv.com' :
//       'https://devapidian.hefantv.com/pubapi/diangw'))

export const API_HOST = (process.env.NODE_ENV === 'production') ?

  'https://apidian.hefantv.com/pubapi/diangw' : 'http://127.0.0.1:7002'


export const MALL_HTML_LINK = (process.env.NODE_ENV === 'production') ?
  '//mall.hefantv.com' : (process.env.NODE_ENV === 'preproduction' ?
    '//mall.adposter.cn' : (process.env.NODE_ENV === 'testing' ?
      '//testmall.hefantv.com' :
      '//devmall.hefantv.com'))

export const API_OSS_HOST = (process.env.NODE_ENV === 'production') ?
  'https://api.hefantv.com' : (process.env.NODE_ENV === 'preproduction' ?
    'https://api.adposter.cn' : (process.env.NODE_ENV === 'testing' ?

      'https://testerapi.hefantv.com' : 'https://devapi.hefantv.com'))
