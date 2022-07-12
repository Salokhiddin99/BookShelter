"use strict"

const API_KEY = 'AIzaSyD5sf1x0AMZG4UgGTCZ6XsKL_wRPwoNfm0'


const token = window.localStorage.getItem('token');


const elLogOutBtn = document.querySelector('.log-out');
const elForm = document.querySelector('.form-search');
const elSearch = document.querySelector('.search-input');
const elOrderNew = document.querySelector('.results__order');
const elList = document.querySelector('.main-card');
const elModal = document.querySelector('.info__modal');
const elOverlay = document.querySelector('.info__overlay');
const elCard = document.querySelector('.main-left__table');
const elPrevBtn=document.querySelector('.prev');
const elNextBtn=document.querySelector('.next')
const elNumbers=document.querySelectorAll('.numbers .numbers__link');
const elResults=document.querySelector('.results__num');
const elPagination=document.querySelector('.numbers');
const elError=document.querySelector('.error');




let orderName='relevance';
let bookName='frontend'
let parsedData=JSON.parse(window.localStorage.getItem('bookmarks'));
let fullArr = [];
let bookmarkArr=parsedData||[];
let page=0;




const renderCards = (dataArr, htmlElement) => {
    
    
    let txt = "";


    dataArr.forEach(element => {
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








const renderBookmark = (bookArr, htmlElement) => {
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



let pages;

let renderPage=(data)=>{
    pages=0;
    let txt='';
    pages=(Number(data)%10===0)?Math.floor(data/10):Math.floor(data/10)+1

    for(let item=0;item<pages;item++){
        let page=`
        <li class="number"><a href="#" class="numbers__link" data-pageid=${item}>${item+1}</a></li>
        `
        txt+=page;
    }


    elPagination.innerHTML=txt;
}

const closeModal = () => {
    elModal.classList.remove('modal-active');
    elOverlay.classList.remove('overlay-active')
}

const openModal = () => {
    elModal.classList.add('modal-active');
    elOverlay.classList.add('overlay-active')
}


const renderInfoModal = (item, htmlElement) => {
    htmlElement.innerHTML=""



    const infoDiv=document.createElement('div')
    const infoTitle=document.createElement('h4')
    const infoXmark=document.createElement('img');
    const infoImg=document.createElement('img');
    const infoDesc=document.createElement('p');
    const infoAuthors=document.createElement('p');
    const infoPublished=document.createElement('p');
    const infoPublishers=document.createElement('p');
    const infoCategories=document.createElement('p');
    const infoPage=document.createElement('p');
    const infoBtnBox=document.createElement('div');
    const infoBtn=document.createElement('a');
    const infoPublishedBox=document.createElement('span')
    const infoPublishersBox=document.createElement('span')
    const infoPageBox=document.createElement('span');
    



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





const renderError=()=>{
    elResults.textContent=0;
    elError.classList.add('error-active');
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
    elError.classList.remove('error-active');
    bookName = elSearch.value;
    orderName='relevance'
    elSearch.value = null;
    page=0;
    closeNextBtn();
    fullData();
})



elOrderNew.addEventListener('click',()=>{
    orderName='newest';
    elError.classList.remove('error-active');
    fullData();
})


elList.addEventListener('click', evt => {

    if (evt.target.matches('.main-card__info')) {
        let InfoBtnId = evt.target.dataset.more;
        let resetElement = fullArr.find(item => item.id === InfoBtnId);
        openModal();
        renderInfoModal(resetElement, elModal)

    } else if (evt.target.matches('.main-card__bookmark')) {
        let bookmarkId = evt.target.dataset.bookmark;
        let resetElement = fullArr.find(item => item.id === bookmarkId);
        if (!bookmarkArr.includes(resetElement)) bookmarkArr.push(resetElement);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        renderBookmark(bookmarkArr, elCard);
    }
})

elCard.addEventListener('click',evt => {

    if(evt.target.matches('.bookmark-delete')){
        let DeleteBtnId=evt.target.dataset.delete;
        let findDeletedBtnIndex=bookmarkArr.findIndex(item => item.id === DeleteBtnId);
        bookmarkArr.splice(findDeletedBtnIndex,1);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));

        if(bookmarkArr.length===0){
            window.localStorage.removeItem('bookmarks');
        }
        renderBookmark(bookmarkArr,elCard);
    }
})



elModal.addEventListener('click',(evt) => {

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



elPagination.addEventListener('click',evt => {

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


const openPrevBtn=()=>{
    elPrevBtn.classList.add('prev--active');
    elPrevBtn.disabled=true;
}


const closePrevBtn=()=>{
    elPrevBtn.classList.remove('prev--active')
    elPrevBtn.disabled=false;
}

const closeNextBtn=()=>{
    elNextBtn.classList.remove('prev--active');
    elNextBtn.disabled=false;
}


const openNextBtn=()=>{
    elNextBtn.classList.add('prev--active');
    elNextBtn.disabled=true;
}


const closeBtn=()=>{
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
renderBookmark(bookmarkArr,elCard);
fullData();