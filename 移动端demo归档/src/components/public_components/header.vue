<template>
    <div class="public-header" :style="{'background-color':bg_color,'color':text_color}">
        <div class="goback-btn" @click="goback()"></div>
            <div class="main-text">{{title}}</div>
        <div class="corner-fun" v-show="type==1" :style="{'color':corner_color}" @click="returnFun">{{right_btn}}</div>
        <div class="corner-fun2" v-show="type==2" @click="returnFun">
        </div>
    </div>
</template>
<script>
    export default {
        name:"publicHeader",
        props:{
            title:{
                type:String,
                default:"标题"
            },
            bg_color:{
                type:String,
                default:"#ffffff"
            },
            text_color:{
                type:String,
                default:"#333333"
            },
            right_btn:{
                type:String,
            },
            type:{
                type:Number,
                default:1
            },
            corner_color:{
                type:String,
                default:"#333333"
            },
            returnFun:{
                type:Function,
                default:()=>{
                    return false;
                }
            }
        },
        mounted(){
            this._this = this;
        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped lang="scss">
    .public-header{
        height:44px;
        width:100%;
        background:#fff;
        font-size: 17px;
        text-align: center;
        line-height: 44px;
        border-bottom:1px solid #EDEDED;
        position: fixed;
        top:0;left:0;
        z-index:2;
        display: flex;
        color:#656b79;
        font-size:14px;
    }
    .goback-btn{
        width:44px;
        height:44px;
        background:url('../../assets/suiliao/goback.png') no-repeat center;
        background-size:15px;
    }
    .corner-fun{
        width:44px;
        height:44px;
        padding-right: 10px;
    }
    .main-text{
        flex: 1; 
    }
    .corner-fun2{
        width:40px;
        // background:url("../../assets/shaixuan.png") no-repeat center;
        background-size: 20px;
    }
</style>