<template>
    <div class="container">

        <button class="ret" @click="gotohome()">返回</button>
        
        <!-- 创作页面 -->

        <h1 class="aside">
            <span class="header">ppt生成</span>
            
            <ul class="work">
                <p class="uploadvideo">
                    <button class="vibut" @click="selectvideo">
                        <span>上传视频</span>
                        <input type="file" ref="videoInput" @change="loadvideo" style="display: none" accept="video/*" />
                    </button>  

                    <span class="vides">{{text1}}</span>
                </p>

                <p class="uploadaudio">
                    <button class="aubut" @click="selectvoice">
                        <span>上传音频</span>
                        <input type="file" ref="audioInput" @change="loadvoice" style="display: none" accept="audio/*" />    
                    </button>  

                    <span class="audes">{{text2}}</span>
                    <span class="gr1">{{text4}}</span>
                    <span class="gr2">{{text5}}</span>
                </p>

                <p class="uploadppt">
                    <button class="pptbut" @click="selectppt">
                        <span>上传ppt</span>
                        <input type="file" ref="pptInput" @change="loadppt" style="display: none" accept="ppt/*" />
                    </button>  

                    <span class="pptdes">{{text3}}</span>
                </p>

                <textarea v-model="content" class="input-text" rows=6 placeholder="请在此处输入目标视频中的文案..."></textarea>

                <button class="crbut" @click="submitFile">开始生成</button>
            </ul>
        </h1>

        <h2 class="body">
            <span class="bodytext">生成的结果将在这里呈现</span>

            <button class="savebut" @click="download()">保存到本地</button>

            <!-- 等待页面 -->

            <p class="videoarea" v-if="isSubmit">
                <button class="canbut" @click="Cancel">取消加载</button>

                <el-table class="load" v-loading="loading" element-loading-text="Loading..."></el-table>
            </p>

            <video class="show" v-if="issus" controls>
                <source :src="generateVideo" type="video/mp4" />
            </video>
        </h2>
    </div>
</template>

<script>
import { ref } from 'vue'

export default{
    name:"video",

    data(){
        return{
            loading:ref(true),
            
            res:"",
            text1:"\n请上传5~8秒包含人物正脸的视频（MP4格式）",
            text2:"\n请上传说着“前路坦荡，只管大胆向\n",
            text3:"\n上传ppt格式的文件",
            text4:"前走，走的每步都算数。”的音频",
            text5:"\n（MP3或WAV格式）",
            content: '',
            video:'',
            videourl:'',
            voice:'',
            voiceurl:'',
            clone_voice:'',
            clone_voice_url:'',
            isSubmit:false,
            curToken:'',
            isCancel:false,
            issus:false,
            generateVideo:'',
        }
    },
    methods: {
        gotohome(){
            this.$router.back();
        },
      selectvideo() {
        this.$refs.videoInput.click();
      },
      selectvoice(){
        this.$refs.audioInput.click();
      },
      loadvideo(event) {
        const file = event.target.files[0];
        if (file) 
        {
          const reader = new FileReader();
          reader.onload = (e) => {
          this.video = file; // 直接保存文件对象
          alert("video");
          // this.imageDataUrl = e.target.result; // 保存生成的DataURL
          };
          reader.readAsDataURL(file);
        }
      },
      loadvoice(event) {
        const file = event.target.files[0];
        if (file) 
        {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.voice = file; // 直接保存文件对象
            // this.imageDataUrl = e.target.result; // 保存生成的DataURL
          };
          reader.readAsDataURL(file);
        }
      },
      // removeFile(index) {
      //   // 释放URL对象的内存
      //   URL.revokeObjectURL(this.files[index].url);
      //   this.files.splice(index, 1);
      // },
      getrand(){
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let randomCode = '';
          for (let i = 0; i < 32; i++) {
            randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return randomCode;
      },
      async submitFile() {
        this.isSubmit=true;
        this.isCancel=false;
        const thisToken = this.getrand();
        this.curToken=thisToken;
        if (this.video) 
        {
          const formData = new FormData();
          formData.append('file', this.video); // 直接传递单个 file 对象
          try {
            const response = await upload_video(formData);
            console.log("res",response);
            if (response.status_code=== 200) {
              this.videourl=response.data;
              alert("视频上传成功");//改成三秒自动消失弹窗
            } else {
              alert("视频上传失败，请重新上传");
            }
            this.isSubmit=false;
          } catch (error) {
              console.error("上传过程中出现错误:", error);
              alert("上传出现错误，请检查网络连接并重试");
              this.isSubmit=false;
          }
        }
        else
        {
          alert("缺少视频文件，请重新上传");
          return;
        }
        if (this.voice) 
        {
          const formData = new FormData();
          formData.append('file', this.voice); // 直接传递单个 file 对象
          try {
            const response = await upload_voice(formData);
            console.log("res",response);
            if (response.status_code=== 200) {
              this.voiceurl=response.data;
              alert("音频上传成功");//改成三秒自动消失弹窗
            } else {
              alert("文件上传失败，请重新上传");
            }
          } catch (error) {
              console.error("上传过程中出现错误:", error);
              alert("上传出现错误，请检查网络连接并重试");
          }
        }
        else
        {
          alert("缺少音频文件，请重新上传");
          return;
        }

        if(this.content)
        {
          const data={
            "text":"前路坦荡，只管大胆向前走，走的每步都算数。",
            "reference_audio":this.voiceurl,
            "reference_text":this.content
          }
          const response = await cosy_voice(data);
          if (response.status_code=== 200) {
              if(this.isCancel) return;
              if(this.curToken!=thisToken) return;
              this.clone_voice_url=response.data;
              alert("声音克隆成功");//改成三秒自动消失弹窗
            } else {
              alert("声音克隆失败");
              return;
            }
        }
        else
        {
          alert("缺少待合成文本，请重新上传");
          return;
        }
        const data={
          "voice_url":this.clone_voice_url,
          "video_path": this.videourl
        };
        const res = await generate_voice(data);
        if(this.isCancel) return;
        if(this.curToken!=thisToken) return;
        console.log("视频合成",res);
        if(res.status=="success") 
        {
         this.generateVideo=res.output; 
         this.issus=true;
        }
        else
        {
          alert("合成失败，请重试");
          return;
        }
      },
      Cancel(){
        this.isCancel=true;
        this.isSubmit=false;
      },

      download(){
        
      }
     
    }
}
</script>

<style scoped>

body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}

.container{
    height: 100%;
    background-image: linear-gradient(to top,black,rgb(94, 18, 18));
}

.ret{
    height: 30px;
    width: 50px;
    background-color: rgb(143, 141, 141);
    border:none;
    color: white;
    border-radius: 5px;
    position: relative;
    top:3%;
    left:7%;

}

.aside{
    position: relative;
    border: 1px solid black;
    left:7%;
    border-radius: 5px;
    width: 30%;
    top:5%;
    height:80%;
    border:none;
    background-color: rgba(109, 107, 107,0.5);
}

.body{
    position: relative;
    border: 1px solid black;
    left:40%;
    border-radius: 5px;
    bottom: 77.4%;
    width: 50%;
    background-color: rgba(109, 107, 107,0.5);
    height:80%;
    border: none;
}

.header{
    color: white;
    font-size: 20px;
    font-weight: lighter;
    position: relative;
    left: 2%;
}

.work{
    border: 1px solid rgb(168, 166, 166);
    border-left: none;
    border-right:none;
    border-bottom: none;
    position: relative;
    bottom: 2%;
}

.uploadvideo{
    border: 1px solid black;
    position: relative;
    right: 5%;
    height:200px;
    border-radius: 10px;
    background-color: rgba(143, 141, 141,0.5);
    border: none;
}

.vibut{
    text-align: center;
    width: 90%;
    position: relative;
    left: 5%;
    height: 100px;
    top: 10%;
    border-radius: 15px;
    color: white;
    background-color: rgba(174, 173, 173,0.5);
    font-size: 20px;
    border:1px solid white;
    white-space: pre-wrap;
}

.vides{
    position: relative;
    top: 10%;
    left: 15%;
    color: white;
    font-size: 15px;
    white-space: pre-wrap;
    font-weight: lighter;
}

.uploadaudio{
    border: 1px solid black;
    position: relative;
    right: 5%;
    height:200px;
    width: 47%;
    border-radius: 10px;
    background-color: rgba(143, 141, 141,0.5);
    border: none;
}

.aubut{
    text-align: center;
    width: 90%;
    position: relative;
    left: 5%;
    height: 100px;
    top: 10%;
    border-radius: 15px;
    color: white;
    background-color: rgba(174, 173, 173,0.5);
    font-size: 20px;
    border:1px solid white;
    white-space: pre-wrap;
}

.audes{
    position: relative;
    top: 5%;
    left: 5%;
    color: white;
    font-size: 12px;
    white-space: pre-wrap;
    font-weight: lighter;
    line-height: 1px;
}

.uploadppt{
    border: 1px solid black;
    position: relative;
    bottom: 231px;
    left: 48%;
    height:200px;
    width: 47%;
    border-radius: 10px;
    background-color: rgba(143, 141, 141,0.5);
    border: none;
}

.pptbut{
    text-align: center;
    width: 90%;
    position: relative;
    left: 5%;
    height: 100px;
    top: 10%;
    border-radius: 15px;
    color: white;
    background-color: rgba(174, 173, 173,0.5);
    font-size: 20px;
    border:1px solid white;
    white-space: pre-wrap;
}

.pptdes{
    position: relative;
    top: 10%;
    left: 5%;
    color: white;
    font-size: 15px;
    white-space: pre-wrap;
    font-weight: lighter;
}

.gr{
    position: relative;
    left: 25%;
    color: white;
    font-size: 15px;
    font-weight: lighter;
}

.input-text{
    width: 94%;
    position: relative;
    bottom: 230px;
    right: 5%;
    height: 80px;
    background-color: rgba(143, 141, 141,0.5);
    color: white;
    resize: none;
    font-size: 15px;
    padding-left: 3%;
    padding-top: 3%;
    padding-right: 3%;
    padding-bottom: 3%;
    border-radius: 10px;
}

.input-text::-webkit-input-placeholder{
    color: white;
}

.crbut{
    height: 30px;
    width: 100px;
    background-color: rgb(143, 141, 141);
    border:none;
    color: white;
    border-radius: 5px;
    position: relative;
    left: 73.5%;
    bottom: 230px;
}

.bodytext{
    font-size: 15px;
    color: white;
    font-weight: lighter;
    position: relative;
    left: 40%;
    top: 50%;
}

.savebut{
    height: 30px;
    width: 100px;
    background-color: rgb(143, 141, 141);
    border:none;
    color: white;
    border-radius: 5px;
    position: relative;
    left: 60%;
    top: 90%;
}

.videoarea{
    height: 80%;
    width: 90%;
    background-color: rgb(143, 141, 141);
    position: relative;
    left: 5%;
    border-radius: 5px;
    
}

.load{
    width: 40%;
    height: 40%;
    position: relative;
    top: 30%;
    left: 30%;
    background-color: rgb(174, 173, 173);
    border-radius: 5px;
}

.show{
    height: 80%;
    width: 90%;
    position: relative;
    left: 5%;
}

.canbut{
    height: 30px;
    width: 100px;
    background-color: rgb(143, 141, 141);
    border:none;
    color: white;
    border-radius: 5px;
    position: relative;
}

.gr1{
    position: relative;
    bottom: 5%;
    left: 5%;
    color: white;
    font-size: 12px;
    white-space: pre-wrap;
    font-weight: lighter;
    line-height: 1px;
}

.gr2{
    position: relative;
    bottom: 15%;
    left:1%;
    color: white;
    font-size: 12px;
    white-space: pre-wrap;
    font-weight: lighter;
    line-height: 1px;
}
</style>
