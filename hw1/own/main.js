var img_urls = ['https://i.imgur.com/bszWLbR.jpg','https://i.imgur.com/VQXYMbc.jpg','https://i.imgur.com/XiX3p0l.jpg','https://tinyurl.com/y46trfov','https://tinyurl.com/y4l3euxx','https://tinyurl.com/y2f7vd8s','https://tinyurl.com/y3xpy5gm','https://tinyurl.com/y4n2eglo','https://tinyurl.com/y3ulbdqw','https://tinyurl.com/y525hqgy','https://tinyurl.com/y3xtzn8n','https://tinyurl.com/y2k7krk8','https://tinyurl.com/yyo8r7lg']
var cnt = 0

let loading = new Image();
loading.src = './images/loading.gif'

window.onload = function (){
    let target = document.getElementById("display");
    target.src = loading.src
    target.src = img_urls[0]
    document.getElementById("source").innerHTML = img_urls[0]
    document.getElementById("source").href = img_urls[0]
}

function load(cnt){
    let target = document.getElementById("display");
    target.src = loading.src
    target.src = img_urls[cnt]
    document.getElementById("source").innerHTML = img_urls[cnt]
    document.getElementById("source").href = img_urls[cnt]
}

function select(nxt){
    
    if(nxt===true){
        if(cnt!==(img_urls.length-1)){
            cnt+=1
            load(cnt)
            
            document.getElementById("prevImg").classList.remove("disabled");
            if(cnt===(img_urls.length-1)){
                document.getElementById("nextImg").classList.add("disabled");
            }
            else{
                document.getElementById("nextImg").classList.remove("disabled");
            }
        }
        else{
            alert("Join NTUEE+ for a memoriable university life!")
        }
    }
    else{
        if(cnt!==0){
            cnt-=1
            load(cnt)

            document.getElementById("nextImg").classList.remove("disabled");
            if(cnt===0){
                document.getElementById("prevImg").classList.add("disabled");
            }
            else{
                document.getElementById("prevImg").classList.remove("disabled");
            }
        }
        else{
            alert("Join NTUEE+ for a memoriable university life!")
        }
    }
}