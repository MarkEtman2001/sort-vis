export function bubbleSort(array) {
    const animations = [];
    var i = 0;
    while (true) {
        var swapped = false;
        // compare adjacent cells
        for (let j = 0; j < array.length - 1 - i; j++) {
            const animation = {};
            animation.comparison = [j, j+1];
            if (array[j] > array[j+1]) {
                animation.swap = [j, j+1]
                swap(array, j, j+1);
                swapped = true;
            }
            animations.push(animation);
        }
        // no swaps -> sorted 
        if (!swapped) {
            break;
        } 
        i++;
   
    }
    const animation = {};
    animation.sorted = 1;
    animations.push(animation);
    return animations;
     
}

export function cocktailSort(array) {
    const animations = [];
    var i = 0;
    while (true) {
        var swapped = false;
        // compare adjacent cells
        var j = i-1;
        while (j++ < array.length - 2 - i) {
            const animation = {};
            animation.comparison = [j, j+1];
            if (array[j] > array[j+1]) {
                animation.swap = [j, j+1]
                swap(array, j, j+1);
                swapped = true;
            }
            animations.push(animation);
        }
        while (j-- > 1 + i) {
            const animation = {};
            animation.comparison = [j, j-1];
            if (array[j] < array[j-1]) {
                animation.swap = [j, j-1]
                swap(array, j, j-1);
                swapped = true;
            }
            animations.push(animation);
        }
        // no swaps -> sorted 
        if (!swapped) {
            break;
        } 
        i++;
    }
    const animation = {};
    animation.sorted = 1;
    animations.push(animation);
    return animations;
}

export function insertionSort(array) {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
        var current = array[i];
        var j = i - 1;

        // scan down the array until an insertion position is found for index, shifting each element > index up 1 position
        while (array[j] > current && j >= 0) { 
            const animation = {};
            animation.comparison = [j, j+1];
            animation.swap = [j, j+1];
            animations.push(animation);
            array[j+1] = array[j--];
            
        }
        // note no animation here 
        // animation suggests that each element is swapped with index until insertion, thus this last step in superfluous
        // in reality, each element overrides the next until insertion, thus the index needs to be placed 
        // this is more efficient as only one element has to be accessed to override, as opposed to two needed for swapping
        array[j+1] = current;
    }
    const animation = {};
    animation.sorted = 1;
    animations.push(animation);
    return animations;
}


export function quickSort(array) {
    const animations = [];
    quickSortHelper(animations, array, 0, array.length-1);
    return animations;
}

function quickSortHelper(animations, array, start, end) {
    // one or less element -> no need to partition
    if (start < end) {
        const index = partition(animations, array, start, end);
        // sort smaller subarray first to minimize nested calls
        if (index < (start+end)/2) {
            quickSortHelper(animations, array, start, index-1);
            quickSortHelper(animations, array, index+1, end);
        }
        else {
            quickSortHelper(animations, array, index+1, end);
            quickSortHelper(animations, array, start, index-1);
        } 
        
    }

}

function partition(animations, array, low, high) {
    // use last element as pivot
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        const animation = {};
        animation.comparison = [j, high];
        if (array[j] < pivot) {
            swap(array, ++i, j);
            animation.secondCompare = i;
            animation.swap = [i, j];
        }
        animations.push(animation);
    }
    animatedSwap(animations, array, i+1, high);
    return i+1;
}


export function mergeSort(array) {
    const animations = [];
    mergeSortHelper(animations, array, 0, array.length-1);
    const animation = {};
    animation.sorted = 1;
    animations.push(animation);
    return animations;
}



function mergeSortHelper(animations, array, low, high) {
    if (low < high) {
        const mid = Math.round((low+high)/2);
        mergeSortHelper(animations, array, low, mid-1);
        mergeSortHelper(animations, array, mid, high);
        merge(animations, array, low, mid, high);
    }
}

// merging low -> mid-1 and mid -> high sub-arrays
function merge(animations, array, low, mid, high) {

    // tracks the current index (position[i]) of an element with starting index i
    const position = []

    var i = low
    var next = low
    var j = mid

    // fill position array with starting indicies (0, 1, 2...)
    for (var k = low; k < mid; k++) {
        position[k] = k;
    }

    while ((i < mid) && (next < high)) {
        if ((j > high) || (array[position[i]] <= array[j])) {
            if (next !== position[i]) {
                animatedSwap(animations, array, next, position[i]);
                // record swap indicies in position array 
                position[position[i]] = position[next];
                position[position[next]] = position[i];
            }
            i++; 
            next++;
        }
        else {
            animatedSwap(animations, array, next, j);
            // record swap indicies in position array
            var temp = position[next];
            position[position[next++]] = j;
            position[j++] = temp;
        }
    }
}

export function heapSort(array) {
    const animations = [];
    // Reform array into a heap 
    for (let i = 0; i < array.length; i++) {
        // Upheap i
         while (i > 0) {
            var parent = Math.floor((i-1)/2);
            const animation = {};
            animation.comparison = [i, parent];
            if (array[i] > array[parent]) {
                swap(array, i, parent);
                animation.swap = [i, parent];
                animations.push(animation);
                i = parent;
            }
            else {
                animations.push(animation);
                break;
            }
        }
    }

    // Iteratively place the smallest ID at the 'back' of the array, 
    // where the 'end' of the unsorted array is defined by j
    for (let j = array.length-1; j > 0; j--) {
        // Replace root with last node
        animatedSwap(animations, array, 0, j);
        var current = 0;
        // Downheap from root (current)
        while (true) {
            let left = (current*2) + 1;
            let right = left + 1;
            // No left child -> leaf + leaf
            if (left >= j) { 
                break;
            }
            // No right child -> left child + leaf
            else if (right >= j) {
                const animation = {};
                animation.comparison = [current, left]
                if (array[current] < array[left]) {
                    swap(array, current, left);
                    animation.swap = [current, left];
                }
                animations.push(animation);
                break;     
            }
            // Current has both children
            else if (array[current] < array[left] || array[current] < array[right]) {
                // left > right
                if (array[left] > array[right]) { 
                    animatedSwap(animations, array, current, left);
                    current = left;
                }
                // right >= left
                else { 
                    animatedSwap(animations, array, current, right);
                    current = right;
                }     
            }
            // Both children >= current -> sorted
            else { 
                break;
            }
        }
    }
    const animation = {};
    animation.sorted = 1;
    animations.push(animation);
    return animations;
}


function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function animatedSwap(animations, array, i, j) {
    // perform swap
    swap(array,i,j);

    // record swap in animations 
    const animation = {};
    animation.comparison = [i, j];
    animation.swap = [i, j];
    animations.push(animation);
}


