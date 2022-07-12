"use strict"

const API_KEY = 'AIzaSyD5sf1x0AMZG4UgGTCZ6XsKL_wRPwoNfm0'
const token = window.localStorage.getItem('token');
let elLogOutBtn = document.querySelector('.log-out');
let elForm = document.querySelector('.form-search');
let elSearch = document.querySelector('.search-input');
let elOrderByNew = document.querySelector('.results__order');
let elList = document.querySelector('.main-card');
let elModal = document.querySelector('.info__modal');
let elOverlay = document.querySelector('.info__overlay');
let elTable = document.querySelector('.main-left__table');
let elPrevBtn=document.querySelector('.prev');
let elNextBtn=document.querySelector('.next')
let elNumbers=document.querySelectorAll('.numbers .numbers__link');
let elResults=document.querySelector('.results__num');
let elPagination=document.querySelector('.numbers');
let elErrorMessage=document.querySelector('.error');
let orderName='relevance';
let bookName='frontend'
let parsedData=JSON.parse(window.localStorage.getItem('bookmarks'));
let fullArr = [];
let bookmarkArr=parsedData||[];
let page=0;




let renderCards = (fullArr, htmlElement) => {
    let txt = "";
    fullArr.forEach(element => {
        let item = `
    <li class="main-card__item">
    <div class="main-card__img">
        <img src="${element.volumeInfo.imageLinks?.thumbnail}" width="200" height="200" alt="an image">
    </div>
    <div class="card-body">
        <h4 class="main-card__title">
        ${element.volumeInfo?.title}
        </h4>
        <p class="main-card__text">
            ${element.volumeInfo?.authors}
        </p>
        <span class="main-card__year">${element.volumeInfo?.publishedDate}</span>
        <div class="main-card__btns">
            <button class=" main-card__bookmark" data-bookmark=${element?.id}>
                Bookmark
            </button>
            <button class=" main-card__info" data-more=${element?.id}>
                More Info
            </button>
            <a href='${element.volumeInfo?.previewLink}' class="main-card__read"
                data-read=${element?.id}>
                Read
            </a>
        </div>
    </div>
</li>
        `
        txt += item;
    });
    htmlElement.innerHTML = txt;
}









let renderBookmark = (bookArr, htmlElement) => {
    let txt = '';
    bookArr.forEach(item => {
        let element = `
        <div class="main-left__table-row">
                        <div class="main-left__table-data">
                            <h4 class="book-title">
                                ${item.volumeInfo?.title}
                            </h4>
                            <p class="book-text">${item.volumeInfo?.authors}</p>
                        </div>
                        <div class="main-left__table-icons">
                            <a href="${item.volumeInfo?.previewLink}">
                            <img src="./images/book-open.svg" class="bookmark-read" alt="book open" width="24" height="24" data-read='${item?.id}'>
                            </a>
                            <img src="./images/delete.svg" class=" bookmark-delete" alt='delete icon' width="24"
                                height="24" data-delete='${item?.id}'>
                        </div>
                    </div>
        `
        txt += element;
    })
    htmlElement.innerHTML = txt;
}



let res;
let renderPage=(data)=>{
    res=0;
    let txt='';
    res=(Number(data)%10===0)?Math.floor(data/10):Math.floor(data/10)+1
    for(let item=0;item<res;item++){
        let page=`
        <li class="number"><a href="#" class="numbers__link" data-pageid=${item}>${item+1}</a></li>
        `
        txt+=page;
    }
    elPagination.innerHTML=txt;
}

let closeModal = () => {
    elModal.classList.remove('modal-active');
    elOverlay.classList.remove('overlay-active')
}

let openModal = () => {
    elModal.classList.add('modal-active');
    elOverlay.classList.add('overlay-active')
}


let renderInfoModal = (item, htmlElement) => {
    htmlElement.innerHTML=""

    let infoDiv=document.createElement('div')
    let infoTitle=document.createElement('h4')
    let infoXmark=document.createElement('img');
    let infoImg=document.createElement('img');
    let infoDesc=document.createElement('p');
    let infoAuthors=document.createElement('p');
    let infoPublished=document.createElement('p');
    let infoPublishers=document.createElement('p');
    let infoCategories=document.createElement('p');
    let infoPage=document.createElement('p');
    let infoBtnBox=document.createElement('div');
    let infoBtn=document.createElement('a');
    let infoPublishedBox=document.createElement('span')
    let infoPublishersBox=document.createElement('span')
    let infoPageBox=document.createElement('span');
    
    infoDiv.setAttribute('class','more-flex');
    infoTitle.setAttribute('class','more-title');
    infoXmark.setAttribute('class','x-mark')
    infoXmark.setAttribute('src','./images/x-mark.svg');
    infoImg.setAttribute('src',item.volumeInfo.imageLinks?.thumbnail)
    infoImg.setAttribute('class','more-info__img')
    infoImg.setAttribute('alt','something went wrong')
    infoDesc.setAttribute('class','more-info__text')
    infoAuthors.setAttribute('class','more__author')
    infoPublished.setAttribute('class','more__author');
    infoPublishers.setAttribute('class','more__author');
    infoCategories.setAttribute('class','more__author');
    infoPage.setAttribute('class','more__author');
    infoBtn.setAttribute('class','more-info__btn')
    infoBtn.setAttribute('href',item.volumeInfo.previewLink)
    infoBtnBox.setAttribute('class','more-btn__wrapper')

    infoTitle.textContent=item.volumeInfo?.title;
    infoDesc.textContent=item.volumeInfo?.description;

    infoAuthors.textContent="Authors :";
    infoPublished.textContent="Published :";
    infoPublishers.textContent="Publishers :";
    infoCategories.textContent="Categories :";
    infoPage.textContent="Pages Count :"
    infoBtn.textContent="Read"
    item.volumeInfo.authors?.forEach(element=>{
        let name=document.createElement('span');
        name.setAttribute('class','more-name')
        name.textContent=element;
        infoAuthors.appendChild(name)
    })
    
    item.volumeInfo.categories?.forEach(element=>{
        let name=document.createElement('span');
        name.setAttribute('class','more-name')
        name.textContent=element;
        infoCategories.appendChild(name)
    })
    infoPublishedBox.setAttribute('class','more-name')
    infoPublishedBox.textContent=item.volumeInfo?.publishedDate;
    infoPublished.appendChild(infoPublishedBox)

    infoPublishersBox.setAttribute('class','more-name')
    infoPublishersBox.textContent=item.volumeInfo?.publisher;
    infoPublishers.appendChild(infoPublishersBox);

    infoPageBox.setAttribute('class','more-name');
    infoPageBox.textContent=item.volumeInfo?.pageCount;
    infoPage.appendChild(infoPageBox)

    htmlElement.appendChild(infoDiv);
    infoDiv.append(infoTitle)
    infoDiv.append(infoXmark);
    htmlElement.appendChild(infoImg);
    htmlElement.appendChild(infoDesc);
    htmlElement.appendChild(infoAuthors);
    htmlElement.appendChild(infoPublished);
    htmlElement.appendChild(infoPublishers);
    htmlElement.appendChild(infoCategories);
    htmlElement.appendChild(infoPage);
    htmlElement.appendChild(infoBtnBox)
    infoBtnBox.appendChild(infoBtn)
}

let renderError=()=>{
    elResults.textContent=0;
    elErrorMessage.classList.add('error-active');
    elList.innerHTML="";
    elPagination.innerHTML="";
    openNextBtn()
    openPrevBtn()
    page=0;
}

elResults.textContent=fullArr.totalItems;

if (!token) {
    window.location.replace('index.html');
}
elLogOutBtn.addEventListener('click', () => {
    window.localStorage.removeItem('token');
    window.location.replace('index.html');
})

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    elErrorMessage.classList.remove('error-active');
    bookName = elSearch.value;
    orderName='relevance'
    elSearch.value = null;
    page=0;
    closeNextBtn();
    fullData();
})
elOrderByNew.addEventListener('click',()=>{
    orderName='newest';
    elErrorMessage.classList.remove('error-active');
    fullData();
})
elList.addEventListener('click', evt => {
    if (evt.target.matches('.main-card__info')) {
        let moreInfoBtnId = evt.target.dataset.more;
        let findElement = fullArr.find(item => item.id === moreInfoBtnId);
        openModal();
        renderInfoModal(findElement, elModal)
    } else if (evt.target.matches('.main-card__bookmark')) {
        let bookmarkId = evt.target.dataset.bookmark;
        let findElement = fullArr.find(item => item.id === bookmarkId);
        if (!bookmarkArr.includes(findElement)) bookmarkArr.push(findElement);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        renderBookmark(bookmarkArr, elTable);
    }
})

elTable.addEventListener('click',evt=>{
    if(evt.target.matches('.bookmark-delete')){
        let bookmarkDeleteId=evt.target.dataset.delete;
        let findDeletedIndex=bookmarkArr.findIndex(item=>item.id===bookmarkDeleteId);
        bookmarkArr.splice(findDeletedIndex,1);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        if(bookmarkArr.length===0){
            window.localStorage.removeItem('bookmarks');
        }
        renderBookmark(bookmarkArr,elTable);
    }
})
elModal.addEventListener('click',(evt)=>{
    if(evt.target.matches('.x-mark')){
        closeModal();
    }
})
elOverlay.addEventListener('click', closeModal)
document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
        closeModal();
    }
})
elPagination.addEventListener('click',evt=>{
    if(evt.target.matches('.numbers__link')){
        let pageBtnId=evt.target.dataset.pageid*1;
        page=pageBtnId*10;
        if(page>0){
            closeBtn();
        }
        else{
            openPrevBtn();
        }
        fullData();
    }
})

let openPrevBtn=()=>{
    elPrevBtn.classList.add('prev--active');
    elPrevBtn.disabled=true;
}

let closePrevBtn=()=>{
    elPrevBtn.classList.remove('prev--active')
    elPrevBtn.disabled=false;
}

let closeNextBtn=()=>{
    elNextBtn.classList.remove('prev--active');
    elNextBtn.disabled=false;
}


let openNextBtn=()=>{
    elNextBtn.classList.add('prev--active');
    elNextBtn.disabled=true;
}


let closeBtn=()=>{
    closeNextBtn()
    closePrevBtn()
}

elPrevBtn.addEventListener('click',(evt)=>{
    closeNextBtn()
    page>10?
    (page-=10,fullData())
    :( 
    page=0,
    openPrevBtn(),
    fullData()
    )
})
elNextBtn.addEventListener('click',()=>{
    closePrevBtn();
    page+=10;
    if(page===res*10){
        openNextBtn();
        page=res;
    }
    fullData()
})
elNumbers.forEach(item=>{
    item.addEventListener('click',()=>{
        resetLinks();
        item.classList.add('active')
    })
})

const fullData = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&orderBy=${orderName}&startIndex=${page}`)
        .then(req => req.json())
        .then(data => {
            fullArr = data.items;
            elResults.textContent=data.totalItems
            renderPage(data.totalItems);
            renderCards(data.items, elList)
        })
        .catch(err=>{
            renderError();
        })
}
renderBookmark(bookmarkArr,elTable);
fullData();