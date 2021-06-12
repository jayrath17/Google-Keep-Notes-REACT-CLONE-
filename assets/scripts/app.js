const mytodoList=[]
const addModel=document.getElementById('add-modal')
const topaddBtn=document.querySelector('header button')
const backdrop=document.getElementById('backdrop')
const modalcancelbtn=document.getElementById('modalcancelBtn')
const modaladdbtn=document.getElementById('modaladdBtn')
const lisst=document.querySelector('.class-todo-list')

//--------------------------------------------------------
//https://jsonplaceholder.typicode.com/posts  https://todoco.herokuapp.com/alltask  
const apiUrl='https://todoco.herokuapp.com/alltask'
//const apiUrl='https://jsonplaceholder.typicode.com/posts'

async function getApiData(){
    const response=await fetch(apiUrl)
    const dataJson=await response.json()
    console.log(dataJson.tasks)
    for(item of dataJson.tasks){
        console.log(item._id)
        newtodo={
            string:item.task,
            id:item._id
        }
        mytodoList.push(newtodo)
        renderTodoList(item.task,item._id)
    }
    if (mytodoList.length>0){
        document.getElementById('entry-text').style.visibility='hidden'
    }
    else{document.getElementById('entry-text').style.visibility='visible'}
}
getApiData()
//--------------------------------------------------------
console.log(topaddBtn)

function changeBackdropVisbility(){
    backdrop.classList.toggle('visible')
}
function changeModalVisbility(){
    addModel.classList.toggle('visible')
    document.getElementById('userInput').focus()
    if (mytodoList.length>0){
        document.getElementById('entry-text').style.visibility='hidden'
    }
    else{document.getElementById('entry-text').style.visibility='visible'}
    //document.getElementById('entry-text').style.visibility='hidden'
    changeBackdropVisbility()
}
function addBtnTasker(){
    const string=document.getElementById('userInput')
    console.log(string.value)
    if (string.value.trim()===''){
        alert('Please Enter Some Input:)')
        return
    }
    
    //------------------------------------------------------------------
    const _data={
        "task" : `${string.value}`
    }
    // https://todoco.herokuapp.com/addtask
    async function postApiData(){
        const idd=await fetch('https://todoco.herokuapp.com/addtask',{
                method:"POST",
                body: JSON.stringify(_data),
                headers: {"Content-type": "application/json"}
            })
        const dataid=await idd.json()
        console.log(dataid,"aa")
        const newid=dataid.id
        const newtodo={
            string:string.value,
            id: newid
        }
        mytodoList.push(newtodo)
        renderTodoList(string.value,newid)
        string.value=''
        console.log(mytodoList)
        changeModalVisbility()
    }
    postApiData(_data)
     
    //------------------------------------------------------------------
    
    
}

function renderTodoList(string,newid){
    const newlistEle=document.createElement('li')
    newlistEle.className='list-element'
    newlistEle.id=newid
    newlistEle.innerHTML=`
        <div class='list-element__info' id='${newid}'>
            <h2>${string}</h2>
            <input class='list-element_done' type='checkbox' id=${newid}0>
            <button class='list-element_cancel' id=${newid}>Cancel</button>
        </div>
    `
    const webpageList=document.getElementById('todo-list')
    webpageList.append(newlistEle)
}

function deleteItem(i,idd){
    const onPageList=document.getElementById('todo-list')
    console.log(i)
    onPageList.children[i].remove()
    if (mytodoList.length>0){
        document.getElementById('entry-text').style.visibility='hidden'
    }
    else{document.getElementById('entry-text').style.visibility='visible'}
    //api-----------------------------------------------------------------
    async function delApiData(_id){
        const _dat={
            "id" : `${_id}`
        }
        console.log("b",_id)
        const del=await fetch('https://todoco.herokuapp.com/deletetask',{
                method:"POST",
                body: JSON.stringify(_dat),
                headers: {"Content-type": "application/json"}
            })
        const dataid=await del.json()
        console.log(dataid)
        }
    console.log("b1",idd)
    delApiData(idd)
    //--------------------------------------------------------------------
}
topaddBtn.addEventListener('click', changeModalVisbility)
backdrop.addEventListener('click',changeModalVisbility)
modalcancelbtn.addEventListener('click',changeModalVisbility)
modaladdbtn.addEventListener('click',addBtnTasker)

lisst.addEventListener('click', function(event) {
    if (event.target.classList.contains('list-element_done')) {
        console.log(event.target.getAttribute('id'))
      }
  
    if (event.target.classList.contains('list-element_cancel')) {
      
      const idd=event.target.getAttribute('id')
      //api--------------------------------------------------
      //-----------------------------------------------------
      for (let i=0;i<mytodoList.length;i++){
        console.log(idd,mytodoList[i]['id'],i)
        if (idd==mytodoList[i]['id']){
            console.log(idd,mytodoList[i]['id'],i)
            mytodoList.splice(i,1)
            deleteItem(i,idd)
            break
          }

      }
      //console.log(event.target.getAttribute('id'))
      //deleteItem(event.target.getAttribute('id'))
    }
  });