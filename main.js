let container = document.getElementById("line-container");
let start = document.getElementById("start")
let selectdElement = document.getElementById('heuristic');
let refresh = document.getElementById("refresh")
let nobars = document.getElementById('nobars');
let delay = document.getElementById('delay');

let screenWidth = window.innerWidth;

let columnWidth = screenWidth / 50;
let numColumns = Math.floor(screenWidth / columnWidth);
let randomValues = [];

let sleepDuaration = 0;

//---colors---//
let barcolor = "#001C30"
let sortedcolor = "#176B87"
let endcolor = "#64CCC5"
let curcolor = "#CCEEBC"

let bars;
let barArr;
initBars(container, numColumns);


//--------Frequancy sort--------//
async function frequancySort(arr){
    for (let i = 0; i < arr.length; i++) {
        barArr[i].style.backgroundColor = curcolor;
        await sleep(sleepDuaration)
        barArr[i].style.backgroundColor = barcolor;
    }
    arr.sort();
    await resizebars(barArr, arr)
    await animationEnd(barArr)
}

//--------selection sort--------//
async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
      const partitionIndex = await partition(arr, left, right);

      await quickSort(arr, left, partitionIndex - 1);
      barArr[right].style.backgroundColor = sortedcolor;
      await quickSort(arr, partitionIndex + 1, right);
      await setBarColors(left, right, sortedcolor)
      barArr[right].style.backgroundColor = sortedcolor;
    }
    if (left == 0 && right == arr.length - 1)
        animationEnd(barArr)
  }
  
  async function partition(arr, left, right) {
    const pivot = arr[right];
    barArr[right].style.backgroundColor = curcolor;
    await setBarColors(left, right, sortedcolor)
    await setBarColors(left, right, barcolor)

    let i = left - 1;
    
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++; 
        swap(arr, i, j);
      }
      await sleep(sleepDuaration)
    }
    
    swap(arr, i + 1, right);
    return i + 1;
  }

//--------Bubble sort--------//
async function bubbleSort(arr) {
  let flag = 1
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
        	barArr[j].style.backgroundColor = curcolor;
        	barArr[j + 1].style.backgroundColor = curcolor;
        	swap(arr, j, j + 1);
        	await sleep(sleepDuaration);
        	barArr[j].style.backgroundColor = barcolor;
        	barArr[j + 1].style.backgroundColor = barcolor;
          flag = 0
        }
    }
    if (flag)
      return
    barArr[arr.length - 1 - i].style.backgroundColor = sortedcolor;
  }
  await animationEnd(barArr);
}

//--------Selection sort--------//
async function selectionSort(arr) {
    const length = arr.length;
  
    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;
      barArr[i].style.backgroundColor = curcolor;
  
      for (let j = i + 1; j < length; j++) {
        barArr[j].style.backgroundColor = curcolor;
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        await sleep(sleepDuaration);
        barArr[j].style.backgroundColor = barcolor;
      }
  
      if (minIndex !== i) {
        swap(arr, i, minIndex);
      }
      barArr[i].style.backgroundColor = sortedcolor;
    }
    barArr[length - 1].style.backgroundColor = sortedcolor;
    await animationEnd(barArr);
  }

//--------Insertion sort--------//
async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let j = i;
      insertionSetBarColors(0, i, sortedcolor);
  
      while (j > 0 && arr[j] < arr[j - 1]) {
        sleep(sleepDuaration)
        insertionSetBarColors(0, j, curcolor);
        swap(arr, j, j - 1);
        barArr[j].style.backgroundColor = sortedcolor;
        j--;
        insertionSetBarColors(0, j, sortedcolor);
        await sleep(sleepDuaration);
      }
      insertionSetBarColors(0, i, sortedcolor);
      
    }
     animationEnd(barArr);
  }
//--------Odd even sort--------//
async function oddEvenSort(arr){
    let sorted = 0
    while(!sorted){
      sorted = 1
      for (let i = 0; i < arr.length; i+=2) {
        if (arr[i] > arr[i+1]){
          barArr[i].style.backgroundColor = curcolor;
        	barArr[i + 1].style.backgroundColor = curcolor;
          await sleep(sleepDuaration)
          swap(arr, i, i+1)
          barArr[i].style.backgroundColor = barcolor;
        	barArr[i + 1].style.backgroundColor = barcolor;
          sorted = 0
        }
      }
      for (let i = 1; i < arr.length; i+=2) {
        if (arr[i] > arr[i+1]){
          barArr[i].style.backgroundColor = curcolor;
        	barArr[i + 1].style.backgroundColor = curcolor;
          await sleep(sleepDuaration)
          swap(arr, i, i+1)
          barArr[i].style.backgroundColor = barcolor;
        	barArr[i + 1].style.backgroundColor = barcolor;
          sorted = 0
        }
      }
    }
    await animationEnd(barArr)
  }

//--------Shell sort--------//
async function shellSort(arr) {
    let gap = 1;
    while(gap * 3 + 1 < arr.length){
        gap  = gap * 3 + 1
    }
    while(gap > 0){
        for (let i = gap; i < arr.length; i++) {
          let j = i;
          while (j > 0 && arr[j] <= arr[j - gap]) {
            barArr[j].style.backgroundColor = curcolor;
            barArr[j - gap].style.backgroundColor = curcolor;
            await sleep(sleepDuaration);
            swap(arr, j, j - gap);
            barArr[j].style.backgroundColor = barcolor;
            barArr[j - gap].style.backgroundColor = barcolor;
            j-=gap;
          }
          
        }
        gap = Math.floor((gap - 1)/3)
    }
    animationEnd(barArr);
  }

  //--------Cocktail sort--------//
  async function cocktailSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = i
    for (; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
        	barArr[j].style.backgroundColor = curcolor;
        	barArr[j + 1].style.backgroundColor = curcolor;
        	swap(arr, j, j + 1);
        	await sleep(sleepDuaration);
        	barArr[j].style.backgroundColor = barcolor;
        	barArr[j + 1].style.backgroundColor = barcolor;
        }
    }
    barArr[arr.length - 1 - i].style.backgroundColor = sortedcolor;
    for (let k = j - 1; k > 0 ; k--) {
        if (arr[k] < arr[k - 1]) {
        	barArr[k].style.backgroundColor = curcolor;
        	barArr[k - 1].style.backgroundColor = curcolor;
        	swap(arr, k, k - 1);
        	await sleep(sleepDuaration);
        	barArr[k].style.backgroundColor = barcolor;
        	barArr[k - 1].style.backgroundColor = barcolor;
        }
    }
    barArr[i].style.backgroundColor = sortedcolor;
  }
  await animationEnd(barArr);
}

//--------helper functions--------//

function initBars(container, numColumns){
    randomValues = []
    container.innerHTML = '';
    for (let i = 0; i < numColumns; i++) {
      randomValues.push(Math.random());
    }
    
    //append the bars to the DOM based on the randomValues array
    for (let i = 0; i < numColumns; i++) {
      let bar = document.createElement("span");
      
      bar.style.position = "absolute";
      bar.style.left = (i * columnWidth) + "px";
      bar.style.bottom = "0";
      bar.style.width = columnWidth - 1 + "px";
      bar.style.height = (randomValues[i] * 90) + "%";
      bar.style.transition = "height 0.2s";
      bar.style.backgroundColor = barcolor;
    
      container.appendChild(bar);
    }
    bars = document.querySelectorAll('span');
    barArr = Array.from(bars);
}

async function setBarColors(start, end, color) {
    for (let index = start; index < end; index++) {
      barArr[index].style.backgroundColor = color;
      await sleep(sleepDuaration)
    }
}
function insertionSetBarColors(start, end, color) {
    for (let index = start; index < end; index++) {
      barArr[index].style.backgroundColor = color;
    }
}

async function animationEnd(barArr){
  for (let k = 0; k < barArr.length; k++) {
      barArr[k].style.backgroundColor = endcolor;
      await sleep(sleepDuaration)
  }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  
    let tempHeight = barArr[a].style.height;
    barArr[a].style.height = barArr[b].style.height;
    barArr[b].style.height = tempHeight;
}

async function resizebars(barArr, arr){
    for (let k = 0; k < barArr.length; k++) {
        barArr[k].style.height = (arr[k] * 90) + "%";
        barArr[k].style.backgroundColor = sortedcolor;
        await sleep(sleepDuaration)
    }
}
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
}
//---------buttons action-------------//
refresh.addEventListener('click', function(){
  if (nobars.value)
  {
    numColumns = nobars.value? parseInt(nobars.value): 50
    columnWidth = Math.floor(screenWidth / numColumns);
    numColumns = Math.floor(screenWidth / columnWidth);
    initBars(container, numColumns)
  }else{
    initBars(container, numColumns)
  }
})

algos = {
  "0": selectionSort,
  "1": bubbleSort,
  "2": oddEvenSort,
  "3": cocktailSort,
  "4": insertionSort,
  "5": shellSort,
  "6": quickSort,
  "7": frequancySort
}
start.addEventListener('click', async function(){
  if (nobars.value)
  {
    numColumns = nobars.value? parseInt(nobars.value): 50
    columnWidth = Math.floor(screenWidth / numColumns);
    numColumns = Math.floor(screenWidth / columnWidth);
    initBars(container, numColumns)
  }
  sleepDuaration = delay.value ? parseInt(delay.value):0
  start.disabled  = true
  refresh.disabled = true
  await algos[selectdElement.value](randomValues)
  start.disabled  = false
  refresh.disabled  = false
})
//-----------old ideas-----------//
// function swapDivs(span1, span2) {
//     let parent1 = span1.parentNode;
//     let sibling1 = span1.nextSibling === span2 ? span1 : span1.nextSibling;
    
//     span2.parentNode.insertBefore(span1, span2);
//     parent1.insertBefore(span2, sibling1);
// }

