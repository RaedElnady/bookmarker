var siteNameInput=document.getElementById('siteName');
var siteUrlInput=document.getElementById('siteUrl');
var addSite=document.getElementById('addSite');
var sites=[];
currentIndex=0;

if(JSON.parse(localStorage.getItem('siteList'))!=null)
{
    sites=JSON.parse(localStorage.getItem('siteList'));
    displayData();
}

addSite.onclick=function(){
    if(addSite.innerHTML=='Add'){
        addNewSite();
    }
    else{
        updateSite();
    }
    displayData();
    clearForm();
}

function addNewSite() {
    var site=
    {
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    sites.push(site);
    localStorage.setItem('siteList',JSON.stringify(sites));
    
};
function clearForm(){
    siteNameInput.value=''
    siteUrlInput.value=''
    siteNameInput.classList.remove('is-valid');
    siteUrlInput.classList.remove('is-valid');
}
function displayData() {
    var siteContainer=''
    for(var i=0;i<sites.length;i++){
        siteContainer+=
        `
        <tr>
            <td>${i+1}</td>
            <td class='fs-1 fw-bold'>${sites[i].name}</td>
            <td>
            
            <a href='https://${sites[i].url}' target="_blank" class="btn btn-primary me-3">
            <i class="fa-solid fa-eye fs-2"></i></a>

            <button onclick='getSiteInfo(${i})' class="btn btn-warning me-3">
            <i class="fa-solid fa-pencil fs-2"></i></button>

            <button onclick='deleteSite(${i})' class="btn btn-danger">
            <i class="fa-solid fa-trash-can fs-2"></i></button>
            
            </td>

        </tr>
        `;
    }
    document.getElementById('tableBody').innerHTML=siteContainer;
};

function deleteSite(index) {
    sites.splice(index,1);
    displayData();
    localStorage.setItem('siteList',JSON.stringify(sites));
}

function getSiteInfo(index){
    currentIndex=index;
    var currentSite=sites[index];
    siteNameInput.value=currentSite.name;
    siteUrlInput.value=currentSite.url;
    addSite.innerHTML='Update'
}

function updateSite(){
    var site=
    {
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    sites[currentIndex]=site;
    localStorage.setItem('siteList',JSON.stringify(sites));
    addSite.innerHTML='Add'
}

function search(searchText){
    var siteContainer=''
    for(var i=0;i<sites.length;i++){
        if(sites[i].name.toLowerCase().includes(searchText.toLowerCase())){
            siteContainer+=
            `
            <tr>
                <td>${i+1}</td>
                <td class='fs-1 fw-bold'>${sites[i].name}</td>
                <td>
                
                <a href='https://${sites[i].url}' target="_blank" class="btn btn-primary me-3">
                <i class="fa-solid fa-eye fs-2"></i></a>
    
                <button onclick='getSiteInfo(${i})' class="btn btn-warning me-3">
                <i class="fa-solid fa-pencil fs-2"></i></button>
    
                <button onclick='deleteSite(${i})' class="btn btn-danger">
                <i class="fa-solid fa-trash-can fs-2"></i></button>
                
                </td>
    
            </tr>
            `;
        }
        document.getElementById('tableBody').innerHTML=siteContainer;
        }
        
}

// validation process

var nameVidation=0
var urlValidation=0

var nameAlert=document.getElementById('nameAlert');
siteNameInput.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,12}$/;
    if(nameRejex.test(siteNameInput.value))
    {
        addSite.removeAttribute('disabled');
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
        nameVidation=1
    }
    else
    {
        addSite.disabled='true';
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
        nameVidation=0
    }
    checkValidations();
}

var urlAlert=document.getElementById('urlAlert');
siteUrlInput.onkeyup=function(){
    var urlRejex=/^(www.)[a-zA-Z0-9_.-]*$/;
    if(urlRejex.test(siteUrlInput.value))
    {
        
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        urlAlert.classList.add('d-none');
        urlValidation=1

    }
    else
    {
        
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        urlAlert.classList.remove('d-none');
        urlValidation=0
    }
    checkValidations();
}
function checkValidations(){
    if(nameVidation==1 && urlValidation==1){
        addSite.removeAttribute('disabled');
    }
    else{
        addSite.disabled='true';
    }
}

