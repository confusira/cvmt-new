<template>
    <div class="container">

        <button class="help" @click="gotohelp()">?</button>

        <h1 class="heading">Let's make something</h1>
        <h2 class="head"> great together.</h2>

        <h3 class="vice">Click the button to start AI video/power point production</h3>

        <h4 class="but">
            <button class="video" @click="gotovideo()">video</button>

            <button class="ppt" @click="gotoppt()">ppt</button>
        </h4>

        <h5 class="body">
            <span class="name">网站名字</span>
        </h5>

    </div>
</template>

<script>
export default{
    name:"main",
    methods:{
        gotohelp(){
            this.$router.push({path:'/introduction'});
        },
        gotovideo(){
            this.$router.push({path: '/video'});
        },
        gotoppt(){
            this.$router.push({path: '/ppt'})
        }
    }
};
</script>

<style scoped>
.container{
    height: 100%;
    background-image: linear-gradient(to top,black,firebrick);
}

.help{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: transparent;
    border-color: white;
    color:white;
    position:relative;
    top:50px;
    left:90%;
}

.heading{
    color: floralwhite;
    text-align: center;
    font-size:70px;
    font-weight:normal;
    position: relative;
    top:120px;
}

.head{
    color: floralwhite;
    text-align: center;
    font-size:70px;
    font-weight:normal;
    position: relative;
    top:50px;
}

.vice{
    color: grey;
    text-align: center;
    position: relative;
    top:20px;
    font-weight: lighter;

}

.but{
    position: relative;
    top: 30px;

}

.video{
    position: relative;
    left: 40%;
    height: 70px;
    width: 70px;
    border-radius:50%;
    background: transparent;
    border-color: white;
    color:white;
}

.ppt{
    position: relative;
    left: 47%;
    height: 70px;
    width: 70px;
    border-radius:50%;
    background: transparent;
    border-color: white;
    color:white;
}

.body{
    border:1px solid grey;
    border-left: none;
    border-right: none;
    border-bottom: none;
    position: relative;
    top:150px;
    padding-left: 100px;
    width: 70%;
    left:13%;

}

.name{
    color: white;
    font-size: 30px;
    position: relative;
    right:80px;
    top:10px;

    
}
</style>
