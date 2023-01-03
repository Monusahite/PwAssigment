const sortedFiles = [];

function handleChange(){
    let file = document.getElementById('upload')
    const fileList = file.files;
    console.log(fileList)

    sortedFiles.push(...fileList)
    sortedFiles.sort((a, b) => a.name.localeCompare(b.name))
    sortedFiles.sort((a, b) => {
        let aExt = a.name.substring(a.name.indexOf('.')+1,a.name.length)
        let bExt = b.name.substring(b.name.indexOf('.')+1,b.name.length)
        return aExt.localeCompare(bExt)
    })
    
    document.querySelector('tbody').innerHTML="";
    for(let i = 0;i<sortedFiles.length;i++)
    showFiles(sortedFiles[i])
    
    info();
}

function showFiles(file){
    const tbody = document.querySelector('tbody');
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let td3btn = document.createElement('button')
    td3btn.classList.add('btn')
    td3btn.classList.add('btn-info')
    td3btn.innerText='Info'
    
    let fileName = extRemove(file.name);
    td1.innerText = fileName;
    td2.innerText = sizeUnits(file.size);
    
    td3.appendChild(td3btn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
    
}
function extRemove(name){
    return name.substring(0,name.indexOf('.'))
}
function showModal(file){
    const modal = document.getElementById('modal');
    modal.innerHTML=`<div class="card">
    <div class="card-header">
    FileName : ${extRemove(file.name)}
    </div>
    <div class="card-body">
    <p class="card-text">File Size : ${sizeUnits(file.size)}</p>
    <p class="card-text">File Type : ${file.type}</p>
    <p class="card-text">Last Modified : ${file.lastModifiedDate}</p>
    </div>
    </div>`
    modal.style.display='block';
}
function sizeUnits(bytes){

        if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1)           { bytes = bytes + " bytes"; }
        else if (bytes == 1)          { bytes = bytes + " byte"; }
        else                          { bytes = "0 bytes"; }
        
        return bytes;
}

function unshowModal(file){
    const modal = document.getElementById('modal');
          modal.style.display='none'
}

function info(){
    let infoBtns = document.querySelectorAll('button')
       
       for(let i = 0;i<infoBtns.length;i++){
               infoBtns[i].addEventListener('mouseover',()=>{
                      showModal(sortedFiles[i])
               })
               infoBtns[i].addEventListener('mouseout',()=>{
                      unshowModal(sortedFiles[i])
               })
       }
}

