const API_KEY = 'AIzaSyD5sf1x0AMZG4UgGTCZ6XsKL_wRPwoNfm0'
const token = window.localStorage.getItem('token');
let elLogOutBtn = document.querySelector('.log-out');
let elForm = document.querySelector('.form-search');
let elSearchInput = document.querySelector('.search-input');
let elOrderByNew = document.querySelector('.results__order');
let elList = document.querySelector('.main-card');
let elModal = document.querySelector('.more-info__modal');
let elOverlay = document.querySelector('.more-info__overlay');
let elTable = document.querySelector('.main-left__table');
let elPrevBtn=document.querySelector('.prev');
let elNextBtn=document.querySelector('.next')
let elNumbers=document.querySelectorAll('.numbers .numbers__link');
let elResultsNum=document.querySelector('.results__num');
let elPagination=document.querySelector('.numbers');
let elErrorMessage=document.querySelector('.error');
let orderName='relevance';
let bookName='python'
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

let closeModal = () => {
    elModal.classList.remove('more-info__modal--active');
    elOverlay.classList.remove('more-info__overlay--active')
}

let openModal = () => {
    elModal.classList.add('more-info__modal--active');
    elOverlay.classList.add('more-info__overlay--active')
}

let openPrevDisabledBtn=()=>{
    elPrevBtn.classList.add('prev--active');
    elPrevBtn.disabled=true;
}

let closePrevDisabledBtn=()=>{
    elPrevBtn.classList.remove('prev--active')
    elPrevBtn.disabled=false;
}

let closeNextDisabledBtn=()=>{
    elNextBtn.classList.remove('prev--active');
    elNextBtn.disabled=false;
}


let openNextDisabledBtn=()=>{
    elNextBtn.classList.add('prev--active');
    elNextBtn.disabled=true;
}


let closeDisabledBtn=()=>{
    closeNextDisabledBtn()
    closePrevDisabledBtn()
}

let renderMoreInfoModal = (item, htmlElement) => {
    htmlElement.innerHTML=""

    let moreInfoFlex=document.createElement('div')
    let moreInfoTitle=document.createElement('h4')
    let moreInfoXmark=document.createElement('img');
    let moreInfoImg=document.createElement('img');
    let moreInfoDesc=document.createElement('p');
    let moreInfoAuthors=document.createElement('p');
    let moreInfoPublished=document.createElement('p');
    let moreInfoPublishers=document.createElement('p');
    let moreInfoCategories=document.createElement('p');
    let moreInfoPage=document.createElement('p');
    let moreInfoBtnWrapper=document.createElement('div');
    let moreInfoBtn=document.createElement('a');
    let moreInfoPublishedWrapper=document.createElement('span')
    let moreInfoPublishersWrapper=document.createElement('span')
    let moreInfoPageWrapper=document.createElement('span');
    
    moreInfoFlex.setAttribute('class','more-info__flex');
    moreInfoTitle.setAttribute('class','more-info__title');
    moreInfoXmark.setAttribute('class','x-mark')
    moreInfoXmark.setAttribute('src','./images/x-mark.svg');
    moreInfoImg.setAttribute('src',item.volumeInfo.imageLinks?.thumbnail)
    moreInfoImg.setAttribute('class','more-info__img')
    moreInfoImg.setAttribute('alt','something went wrong')
    moreInfoDesc.setAttribute('class','more-info__text')
    moreInfoAuthors.setAttribute('class','more-info__author')
    moreInfoPublished.setAttribute('class','more-info__author');
    moreInfoPublishers.setAttribute('class','more-info__author');
    moreInfoCategories.setAttribute('class','more-info__author');
    moreInfoPage.setAttribute('class','more-info__author');
    moreInfoBtn.setAttribute('class','more-info__btn')
    moreInfoBtn.setAttribute('href',item.volumeInfo.previewLink)
    moreInfoBtnWrapper.setAttribute('class','more-info__btn-wrapper')

    moreInfoTitle.textContent=item.volumeInfo?.title;
    moreInfoDesc.textContent=item.volumeInfo?.description;

    moreInfoAuthors.textContent="Authors :";
    moreInfoPublished.textContent="Published :";
    moreInfoPublishers.textContent="Publishers :";
    moreInfoCategories.textContent="Categories :";
    moreInfoPage.textContent="Pages Count :"
    moreInfoBtn.textContent="Read"
    item.volumeInfo.authors?.forEach(element=>{
        let name=document.createElement('span');
        name.setAttribute('class','more-info__author-name')
        name.textContent=element;
        moreInfoAuthors.appendChild(name)
    })
    
    item.volumeInfo.categories?.forEach(element=>{
        let name=document.createElement('span');
        name.setAttribute('class','more-info__author-name')
        name.textContent=element;
        moreInfoCategories.appendChild(name)
    })
    moreInfoPublishedWrapper.setAttribute('class','more-info__author-name')
    moreInfoPublishedWrapper.textContent=item.volumeInfo?.publishedDate;
    moreInfoPublished.appendChild(moreInfoPublishedWrapper)

    moreInfoPublishersWrapper.setAttribute('class','more-info__author-name')
    moreInfoPublishersWrapper.textContent=item.volumeInfo?.publisher;
    moreInfoPublishers.appendChild(moreInfoPublishersWrapper);

    moreInfoPageWrapper.setAttribute('class','more-info__author-name');
    moreInfoPageWrapper.textContent=item.volumeInfo?.pageCount;
    moreInfoPage.appendChild(moreInfoPageWrapper)

    htmlElement.appendChild(moreInfoFlex);
    moreInfoFlex.append(moreInfoTitle)
    moreInfoFlex.append(moreInfoXmark);
    htmlElement.appendChild(moreInfoImg);
    htmlElement.appendChild(moreInfoDesc);
    htmlElement.appendChild(moreInfoAuthors);
    htmlElement.appendChild(moreInfoPublished);
    htmlElement.appendChild(moreInfoPublishers);
    htmlElement.appendChild(moreInfoCategories);
    htmlElement.appendChild(moreInfoPage);
    htmlElement.appendChild(moreInfoBtnWrapper)
    moreInfoBtnWrapper.appendChild(moreInfoBtn)
}

let renderBookmark = (arr, htmlElement) => {
    let txt = '';
    arr.forEach(item => {
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

let renderError=()=>{
    elResultsNum.textContent=0;
    elErrorMessage.classList.add('error-active');
    elList.innerHTML="";
    elPagination.innerHTML="";
    openNextDisabledBtn()
    openPrevDisabledBtn()
    page=0;
}
elResultsNum.textContent=fullArr.totalItems;

if (!token) {
    window.location.replace('index.html');
}
elLogOutBtn.addEventListener('click', () => {
    window.localStorage.removeItem('token');
    window.location.replace('index.html');
})

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    elErrorMessage.classList.remove('error-active');
    bookName = elSearchInput.value;
    orderName='relevance'
    elSearchInput.value = null;
    page=0;
    closeNextDisabledBtn();
    fullData();
})
elOrderByNew.addEventListener('click',()=>{
    orderName='newest';
    elErrorMessage.classList.remove('error-active');
    fullData();
})
elList.addEventListener('click', e => {
    if (e.target.matches('.main-card__info')) {
        let moreInfoBtnId = e.target.dataset.more;
        let findElement = fullArr.find(item => item.id === moreInfoBtnId);
        openModal();
        renderMoreInfoModal(findElement, elModal)
    } else if (e.target.matches('.main-card__bookmark')) {
        let bookmarkId = e.target.dataset.bookmark;
        let findElement = fullArr.find(item => item.id === bookmarkId);
        if (!bookmarkArr.includes(findElement)) bookmarkArr.push(findElement);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        renderBookmark(bookmarkArr, elTable);
    }
})

elTable.addEventListener('click',e=>{
    if(e.target.matches('.bookmark-delete')){
        let bookmarkDeleteId=e.target.dataset.delete;
        let findDeletedIndex=bookmarkArr.findIndex(item=>item.id===bookmarkDeleteId);
        bookmarkArr.splice(findDeletedIndex,1);
        window.localStorage.setItem('bookmarks',JSON.stringify(bookmarkArr));
        if(bookmarkArr.length===0){
            window.localStorage.removeItem('bookmarks');
        }
        renderBookmark(bookmarkArr,elTable);
    }
})
elModal.addEventListener('click',(e)=>{
    if(e.target.matches('.x-mark')){
        closeModal();
    }
})
elOverlay.addEventListener('click', closeModal)
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
})
elPagination.addEventListener('click',e=>{
    if(e.target.matches('.numbers__link')){
        let pageBtnId=e.target.dataset.pageid*1;
        page=pageBtnId*10;
        if(page>0){
            closeDisabledBtn();
        }
        else{
            openPrevDisabledBtn();
        }
        fullData();
    }
})
elPrevBtn.addEventListener('click',(e)=>{
    closeNextDisabledBtn()
    page>10?
    (page-=10,fullData())
    :( 
    page=0,
    openPrevDisabledBtn(),
    fullData()
    )
})
elNextBtn.addEventListener('click',()=>{
    closePrevDisabledBtn();
    page+=10;
    if(page===res*10){
        openNextDisabledBtn();
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
            elResultsNum.textContent=data.totalItems
            renderPage(data.totalItems);
            renderCards(data.items, elList)
        })
        .catch(err=>{
            renderError();
        })
}
renderBookmark(bookmarkArr,elTable);
fullData();