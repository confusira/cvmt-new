<template>
<div class="bgimg">
    <button class="ret" @click="gotohome()">返回</button>

    <span class="heading">Intro</span>

    <div class="bg">

        <h1 class="descrip">
            <span class="dest">{{text1}}</span>
        </h1>

        <h2 class="step">
            <p class="stept">步骤</p>

            <p class="bz">
                <el-steps class="steper" :active="idx" finish-status="success" simple>
                    <el-step title="步骤一" />
                    <el-step title="步骤二" />
                    <el-step title="步骤三" />
                    <el-step title="步骤四" />
                </el-steps>

                <p v-if="idx==0"><span style="font-size:20px;padding-left:40px;">  上传视频</span></p>
                <p v-if="idx==1"><span style="font-size:20px;padding-left:40px;">  上传音频</span></p>
                <p v-if="idx==2"><span style="font-size:20px;padding-left:40px;">  撰写文案</span></p>
                <p v-if="idx==3"><span style="font-size:20px;padding-left:40px;">  发布</span></p>
                <p v-if="idx==4"><span style="font-size:20px;padding-left:40px;">  等待几秒后，弹出视频，发布成功</span></p>

            
                <img class="p1" v-if="idx==0" src="" alt="">
                <img class="p2" v-if="idx==1" src="" alt="">
                <img class="p3" v-if="idx==2" src="" alt="">
                <img class="p4" v-if="idx==3" src="" alt="">
                <img class="p5" v-if="idx==4" src="" alt="">
            </p>
        

            <button class="bu" @click="clickhandle()">下一步</button>

        </h2>
        
    </div>
</div>
    
</template>

<script>
export default{
    name:"introduction",
    data(){
        return{
            idx:0,
            text1:"我们推出的生成视频产品，利用最先进的AI技术，帮助用户轻松创建高质量视频内容。用户只需输入文字、图片或音频素材，系统便能自动生成与之匹配的视频，涵盖从简短广告到长篇故事片的各种需求。该产品支持多种风格和模板，能够根据目标受众的偏好定制视觉效果和音效，快速实现创意的可视化。无论是企业宣传、社交媒体内容，还是个人项目，都能在几分钟内完成高水准的视频制作，极大提升内容创作的效率和专业度。此外，生成的视频支持多种格式输出，便于用户在不同平台上分享和发布。通过这款产品，用户无需专业技能，也能轻松制作出引人入胜的视频内容，助力提升品牌影响力和内容传播效果。",
        }
    },

    methods:{
        clickhandle(){
            if(this.idx>=4){
                this.idx=0;
            }else{
                this.idx+=1;
            }
        },
        gotohome(){
            this.$router.back()
        }
    }
}   
</script>



<style scoped>
.ret{
    height: 30px;
    width: 50px;
    background-color: rgb(143, 141, 141);
    border:none;
    color: white;
    border-radius: 5px;
    position: relative;
    bottom: 5%;
    left: 2%;

}

.bgimg{
    height: 100%;
    background-image: linear-gradient(to top,black,rgb(94, 18, 18));
    background-repeat: repeat;
    background-attachment: scroll;
}

.bg{
    position:relative;
    top: 10%;
    left: 5%;
    width: 80%;
    height: 70%;
    padding-left: 5%;
    padding-right: 5%;
    border-top: 4px;
    background-color: rgba(109, 107, 107,0.5);
    border-radius: 15px;
}

.heading{
    font-size:80px;
    color: aliceblue;
    position: relative;
    top: 10%;
}



.subtit{
    position: relative;
    top:100px;
    font-size: 50px;
}

.bz{
    background-color: rgba(174, 173, 173,0.5);
    position: relative;
    height:400px;
    width: 90%;
    left: 5%;
    bottom: 5%;
    border-radius: 15px;
}

.steper{
    position:relative;
    left:50rpx;
    width: 84%;
    background-color: rgba(196, 194, 194, 0.5);
    color: white;
    border-radius: 15px;
}

.descrip{
    width: 40%;
    position: relative;
    background-color: rgba(143, 141, 141,0.5);
    top: 70px;
    
    padding: 15px;
    line-height: 30px;
    border-radius: 15px;
}

.dest{
    font-size:25px;
    color: white;
    font-weight: lighter;
}
    
.bu{
    height: 30px;
    width: 80px;
    background-color: rgb(143, 141, 141);
    border:none;
    color: white;
    border-radius: 5px;
    position: relative;
    bottom: 5%;
    left: 2%;

}

.p1{
    padding-left: 40px;
    height: 450px;;
}

.p2{
    padding-left: 40px;
    height: 450px;;
}


.p3{
    padding-left: 40px;
    height: 450px;;
}

.p4{
    padding-left: 40px;
    height: 450px;;
}

.p5{
    padding-left: 40px;
    height: 450px;;
}

.step{
    width: 50%;
    height: 80%;
    position: relative;
    background-color: rgba(143, 141, 141,0.5);
    left: 50%;
    bottom: 70%;
    padding: 15px;
    line-height: 30px;
    border-radius: 15px;


}
.stept{
    color: white;
    font-weight: lighter;
    position: relative;
    bottom: 5%;
    font-size: 30px;
}
</style>