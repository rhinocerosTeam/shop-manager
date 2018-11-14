/**
 * Created by Cray on 2017/1/5.
 */
export const API_HOST = (process.env.NODE_ENV === 'production')
  ? 'http://api.huayi-art.com'
  : (process.env.NODE_ENV === 'testing') ? 'http://devapi.huayi-art.com' : 'http://devapi.huayi-art.com';
