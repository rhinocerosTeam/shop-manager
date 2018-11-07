/**
 * Created by user on 2018/6/19.
 */

import {userDB} from '../db/user'
export default class UserControl {
  async addUser(data){
   return  await userDB.insertUser(data)
  }



}
export const userCtrl = new UserControl()
