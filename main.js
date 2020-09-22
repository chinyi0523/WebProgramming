var img_urls = ['https://tinyurl.com/y46trfov','https://tinyurl.com/y4l3euxx','https://tinyurl.com/y2f7vd8s','https://tinyurl.com/y3xpy5gm','https://tinyurl.com/y4n2eglo','https://tinyurl.com/y3ulbdqw','https://tinyurl.com/y525hqgy','https://tinyurl.com/y3xtzn8n','https://tinyurl.com/y2k7krk8','https://tinyurl.com/yyo8r7lg']
var cnt = 0

let loading = new Image();
loading.src = './images/loading.gif'

function load(cnt){
    let target = document.getElementById("display");
    target.src = loading.src
    var timer = setInterval(function(){
                if (document.getElementById("display").complete){
                clearInterval(timer);
                target.src = img_urls[cnt]
                }
                }, 10);
    document.getElementById("source").innerHTML = "Source: "+img_urls[cnt]
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
    }
}