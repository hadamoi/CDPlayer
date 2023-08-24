let contentWrap;
let prevButton, nextButton;
let sectionNum = 0;
let totalSections = 0;
let album;
let pointButtonAll;
let pointWrap;
let diskInner;

let bgArray = new Array();
bgArray[0] = ['#F9A5A5', '#EFF8A5'];
bgArray[1] = ['#151646', '#F9B94B'];
bgArray[2] = ['#A8D1F1', '#838174'];
bgArray[3] = ['#CBA195', '#05779B'];
bgArray[4] = ['#EA6046', '#4F9A3B'];
bgArray[5] = ['#471E0C', '#F8552C'];
bgArray[6] = ['#6AA5C7', '#2B2117'];

prevButton = document.querySelectorAll('button')[0];
nextButton = document.querySelectorAll('button')[1];
pointWrap = document.querySelector('.pointWrap');

album = document.querySelectorAll('.album');
totalSections = album.length;

contentWrap = document.querySelector('.contentWrap');
diskInner = document.querySelectorAll('.disk_inner');


// CREATE POINT FOR EVERY SECTION
const createPoint = () => {
  for(let i=0; i<=album.length -1; i++){
    pointWrap.innerHTML += `<li></li>`;
  }
}

createPoint();

pointButtonAll = document.querySelectorAll('.pointWrap li');

const albumChange = () => {

  contentWrap.style.background = `linear-gradient(120deg, ${bgArray[sectionNum][0]}, ${bgArray[sectionNum][1]} )`

  for(let i=0; i<totalSections; i++){

    if(sectionNum == i) {
      album[i].classList.add('active');
      pointButtonAll[i].classList.add('active');
    } else {
      album[i].classList.remove('active');
      pointButtonAll[i].classList.remove('active');
    }
  }

  diskInner[sectionNum].style.background = bgArray[sectionNum][1];
}

const pagePrev = () => {
  if(sectionNum > 0) {
    sectionNum--;
  } else {
    sectionNum = totalSections - 1;
  }
}

const pageNext = () => {
  if(sectionNum < totalSections - 1) {
    sectionNum++;
  } else {
    sectionNum = 0;
  }
}

// CLICK POINT BUTTON
for(let i=0; i<pointButtonAll.length; i++){
  (function(index) {
    pointButtonAll[index].onclick = () => {
      sectionNum = index;
      albumChange();
    }
  })(i);
}

prevButton.addEventListener('click', () => {
  pagePrev();
  albumChange();
})

nextButton.addEventListener('click', () => {
  pageNext();
  albumChange();
})

// MOBILE CHECK
function mobileChk() {
  let mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
  for (let info in mobileKeyWords) {
      if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
          return true;
      }
  }
  return false;
}

// TOUCH FUNCTION
let start_X = 0;
let end_X = 0;

const touchFunction = (e) => {
  let type = null;
  let touch = null;

  switch(e.type) {
    case 'touchstart':
      type = 'mousedown';
      touch = e.changedTouches[0];
      start_X = touch.clientX;
      end_X = 0;
      break;

    case 'touchend':
      type ='mouseup';
      touch = e.changedTouches[0];
      end_X = touch.clientX;
      let chkNum = start_X - end_X;
      let chkNumAbs = Math.abs(chkNum);

      if(chkNumAbs > 100) {
        if(chkNum < 0) {
          pagePrev();
        } else {
          pageNext();
        }
        albumChange();
      }
    break;
  }
}

if(mobileChk()) {
  contentWrap.addEventListener('touchstart', touchFunction, false);
  contentWrap.addEventListener('touchend', touchFunction, false);
}

albumChange();