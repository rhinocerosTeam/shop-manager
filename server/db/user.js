/**
 * Created by user on 2018/6/19.
 */
import {query} from  '../lib/mysql'

export default class UserDB {

  /*创建用户*/
  async insertUser(value){
    await query('insert into users(name,pass) values(?,?);',value)
  }
}
export const userDB = new UserDB()
