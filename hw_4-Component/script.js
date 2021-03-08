
async function getApi (){
    try{
        let response = await fetch('./data.json');
        let data = await response.json();
        createContent(data)
        console.log(data)
    } catch(err){
        console.log(err)
    }finally{
        console.log('Hy')
    }
};
getApi()


function createContent(data){
    let count 
    if(localStorage.getItem('notificationId') !==null){
        count = localStorage.getItem('notificationId')
    }
    else{
        count = 0
    }
    let content = document.createElement('div');
    content.innerHTML = `
        <div class="notification">
        <div class="block-content">
            <div class="content" id="${data[count].id}">
                <h3 class="contentTitle">${data[count].title}</h3>
                <p class="content-discription">${data[count].phrase}</p>
            </div>
            <img class="close" tabindex="1" src="https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/close-512.png">
        </div>
        <div class="choosing">
            <img class="button-left" tabindex="3" src="https://icon-library.com/images/previous-next-icon/previous-next-icon-18.jpg">
            ${data.map(el=>`<input class="breakPoint" type="radio" name="choosingNotification" id="${el.id}" checked="${count -1}">`).join(' ')}
            <img class="button-right" tabindex="4" src="https://icon-library.com/images/next-icon-png/next-icon-png-20.jpg">
        </div>
        <div class="block-checkbox">       
                <input class="check" type="checkbox" tabindex="2">
            </div>
        </div> `
    
    document.body.append(content)
    createNotification(data,count)
}

function notification(count,data){
    let content = document.querySelector('.content')
    let contentTitle = document.querySelector('.contentTitle');
    let contentDiscription = document.querySelector('.content-discription');
    let breakPoint = document.querySelectorAll('.breakPoint');
        content.id = data[count].id
        contentTitle.textContent = `${data[count].title}`
        contentDiscription.textContent = data[count].phrase
        breakPoint[count].checked = true;
}



function createNotification(data,count){
    let notificationBlock = document.querySelector('.notification')
    let btnRight = document.querySelector('.button-right');
    let btnLeft = document.querySelector('.button-left');
    let checkNotification = document.querySelector('.check');
    let close = document.querySelector('.close');
    let breakPoint = document.querySelectorAll('.breakPoint');
    breakPoint[count].checked = true;
   
    btnLeft.addEventListener('click',()=>{
        if(count > 0){
        count--
        notification(count,data)
        }
    })

    btnLeft.addEventListener('keydown',(event)=>{
        if(event.keyCode === 13){
            if(count > 0){
                count--
                notification(count,data)
                }
        }
    })

    btnRight.addEventListener('click',()=>{
        if(count < data.length -1 ){
            count++
            notification(count,data) 
        }
    })

    btnRight.addEventListener('keydown',(event)=>{
        if(event.keyCode === 13){
            if(count < data.length -1 ){
                count++
                notification(count,data) 
            } 
        }
    })

    checkNotification.addEventListener('change',function(){
        if(this.checked){
            localStorage.setItem('notificationId',count)
            console.log('checked')
        }
    })

    checkNotification.addEventListener('keydown',function(event){
        if(event.keyCode === 13){
            this.checked = true
            if(this.checked){
                localStorage.setItem('notificationId',count)
            }
        }
    })

    close.addEventListener('click',()=>{
        notificationBlock.remove()
    })

    close.addEventListener('keydown',(event)=>{
        if(event.keyCode === 13){
            notificationBlock.remove()
        }
    })
}



