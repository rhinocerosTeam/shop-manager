<template>
    <div class="addChannel" style="width:600px">
        <el-form ref="form" :model="cData" label-width="100px">
            <el-form-item label="频道名称">
                <el-input v-model="cData.name"></el-input>
            </el-form-item>
            <el-form-item label="路径">
                <el-input v-model="cData.path"></el-input>
            </el-form-item>
            <el-form-item label="是否为主页">
                <el-switch v-model="isHome"  active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
            <el-form-item>
                
                <el-button type="primary" @click="save">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {Switch} from 'element-ui';
import api from 'api';
import Utils from 'utils/utils'
export default {
    data(){
        return {
            id: Utils.getQueryStringVue('id'), // 商品id
            cData:{
                name:"",
                path:"",
                isHome:"0",
                templates:"[]"
            },
            isHome:false,
        }
    },
    components: {'el-switch':Switch},
    
    mounted(){
        this.init()
    },
    watch:{
       isHome(){
           if(this.isHome){
               this.cData.isHome = "1"
           }else{
               this.cData.isHome = "0"
           }
       } 
    },
    methods:{
        init(){
            if(this.id){
                this.api_getChannel()
            }
        },
        api_getChannel(){
            api.getChannel({id:this.id}).then(res=>{
                let data = api.parse(res);
                if (res.code == 1000) {
                    if(data.isHome == "1"){
                        this.isHome = true
                    }
                    this.cData = data
                }
            })
        },
        save(){
            let fun = {}
            
            if(this.cData.id){
                fun = api.eidtChannel(this.cData)
            }else{
                fun = api.addChannel(this.cData)
            }

            fun.then(res=>{
                let data = api.parse(res);
                if (res.code == 1000) {
                    this.$message({
                        message: "成功",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            })
            
        }
    }
}
</script>

