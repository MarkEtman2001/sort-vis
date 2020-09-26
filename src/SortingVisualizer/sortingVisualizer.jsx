import React from './../../node_modules/react';
import './sortingVisualizer.css';
import  * as sortingAlgos from '../sortingAlgos/sortingAlgos.js';


export default class SortingVisualiser extends React.Component {
    // min/max value for an element in the array
    MIN_ARR_VAL = 10;
    MAX_ARR_VAL = 200;

    // If true, disables rendering until false
    // cannot be part of state as it would require rendering to update 
    disabled = false;

    constructor(props) {
        super(props);

        this.state = {
            // Main array 
            array: [],
            // Animation speed of sorts
            animationSpeed: 40,
            // Main array length
            arrayLength: 51,
        };
    }

    // Generate array when first loading site
    componentDidMount() {
        this.makeArray();
    }

    componentDidUpdate(prevProps, prevState) {
        // eslint-disable-next-line
        if (this.disabled == false) {
            // If the array length slider has been moved, update 
            // eslint-disable-next-line
            if (prevState.arrayLength != document.getElementById("arrayLength").value) {
                this.setState({arrayLength: document.getElementById("arrayLength").value})
                // only make array once state is updated  
                // eslint-disable-next-line
                if (this.state.arrayLength == document.getElementById("arrayLength").value) {
                    this.makeArray();
                }
            }
            // eslint-disable-next-line
            if (prevState.animationSpeed != document.getElementById("animationSpeed").value) {
                this.setState({animationSpeed: document.getElementById("animationSpeed").value})
            }
        }
    }


    // Generates a random number between two ranges 
    getRangedRandNum() {
        return Math.floor(Math.random() * (this.MAX_ARR_VAL - this.MIN_ARR_VAL) + this.MIN_ARR_VAL);
    }

    makeArray() {
        if (this.disabled !== true) {
            // Creates an array which is used to update the state
            const arr = [];

            // Fills the array according to parameters
            for (let i = 0; i < this.state.arrayLength; i++) {
                arr.push(this.getRangedRandNum());
            }
            // Updates the state of the component with the new array
            // {} used as 'arr' is an object 
            this.setState({array: arr});
        }
        
    }

    animate(animations, ANIMATION_SPEED) {
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, animations.length * ANIMATION_SPEED)
        // creates an array of insides of all divs with array-bar tag
        const arrayBars = document.getElementsByClassName('array-bar'); 
        // Step through animations
        for (let i = 0; i < animations.length; i++) {
            const {comparison, swap, sorted} = animations[i];

            
            if (sorted !== undefined) {
                for (let j = 0; j < arrayBars.length; j++) {
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = 'green';
                    }, (i+j) * ANIMATION_SPEED)
                }
                break;
            }
            

            // highlight elements being compared in red
            setTimeout(() => {
                arrayBars[comparison[1]].style.backgroundColor = 'red';
                arrayBars[comparison[0]].style.backgroundColor = 'red';              
            }, i * ANIMATION_SPEED)

            // If there is a swap, swap the height of the two bars
            if (swap !== undefined) {
                setTimeout(() => {
                    const temp = arrayBars[swap[0]].style.height;
                    arrayBars[swap[0]].style.height = arrayBars[swap[1]].style.height;
                    arrayBars[swap[1]].style.height = temp;
                }, i * ANIMATION_SPEED)
            }
            // Once the comparison has been made, return the elements' colour to blue
            setTimeout(() => {   
                arrayBars[comparison[1]].style.backgroundColor = 'blue';
                arrayBars[comparison[0]].style.backgroundColor = 'blue';
            }, (i+1) * ANIMATION_SPEED)   
        } 
    }

    // Animate the bubble sort method
    bubbleSort() {
        // eslint-disable-next-line
        if (this.disabled == false) this.animate(sortingAlgos.bubbleSort(this.state.array), this.state.animationSpeed);
        
    }

    cocktailSort() {
        // eslint-disable-next-line
        if (this.disabled == false) this.animate(sortingAlgos.cocktailSort(this.state.array), this.state.animationSpeed);
    }

    // Animate the insertion sort method
    insertionSort() {
        // eslint-disable-next-line
        if (this.disabled == false) this.animate(sortingAlgos.insertionSort(this.state.array), this.state.animationSpeed);

    }

    // Animate the quick sort method 
    quickSort() {
        const ANIMATION_SPEED = this.state.animationSpeed;
        const animations = sortingAlgos.quickSort(this.state.array);
        // creates an array of insides of all divs with array-bar tag
        const arrayBars = document.getElementsByClassName('array-bar'); 
        
        // Step through animations
        for (let i = 0; i < animations.length; i++) {
            const {comparison, swap, secondCompare} = animations[i];

            // check for undefined animation (every animation with a swap must have a comparison)
            if (comparison === undefined) {
                continue;
            }

            // highlight elements being compared in red
            setTimeout(() => {
                arrayBars[comparison[1]].style.backgroundColor = 'green';
                arrayBars[comparison[0]].style.backgroundColor = 'red';
                if (secondCompare !== undefined) {
                    arrayBars[secondCompare].style.backgroundColor = 'red';
                }
                
            }, i * ANIMATION_SPEED)

            // If there is a swap, swap the height of the two bars
            if (swap !== undefined) {
                setTimeout(() => {
                    const temp = arrayBars[swap[0]].style.height;
                    arrayBars[swap[0]].style.height = arrayBars[swap[1]].style.height;
                    arrayBars[swap[1]].style.height = temp;
                }, i * ANIMATION_SPEED)
            }
            // Once the comparison has been made, return the elements' colour to blue
            setTimeout(() => {   
                arrayBars[comparison[1]].style.backgroundColor = 'blue';
                arrayBars[comparison[0]].style.backgroundColor = 'blue';
                if (secondCompare !== undefined) {
                    arrayBars[secondCompare].style.backgroundColor = 'blue';
                }
            }, (i+1) * ANIMATION_SPEED)     
        }
        // this.animate(sortingAlgos.quickSort(this.state.array, 0, this.state.array.length-1), 50);
    }

    mergeSort() {
        // eslint-disable-next-line
        if (this.disabled == false) this.animate(sortingAlgos.mergeSort(this.state.array), this.state.animationSpeed);
    }

    heapSort() {
        // eslint-disable-next-line
        if (this.disabled == false) this.animate(sortingAlgos.heapSort(this.state.array), this.state.animationSpeed);
    }


    /*
    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    test() {
        var bool = true
        for (let i = 0; i < 1000; i++) {
            setTimeout(() => {
                this.makeArray()
                const test = sortingAlgos.heapSort(this.state.array)
                const sorted = this.state.array.sort(function(a, b){return a-b});
                bool = bool && this.arraysEqual(test, sorted);
            }, i * 2)
        }
        setTimeout (() => {
            console.log(bool)
        }, 2000)
    }
    */

    refresh() {
        // eslint-disable-next-line
        if (this.disabled == false) this.setState({})
    }
    

    render() {

        // Get the array & array length from the state 
        const {array, arrayLength} = this.state;

        // Get the dimensions of the current window
        // Allows for image resizing 
        let imgHeight = window.innerHeight;
        let imgWidth = window.innerWidth;

        // used to generate ‘short non-sequential url-friendly unique id(s)’ for array-bar keys 
        // https://www.npmjs.com/package/shortid
        const shortid = require('shortid')

        return (
            // Store array-bars in array-container
                // Style each array-bar, using: - value for relative height
                //                              - imgHeight for the height range of the bars 
                //                              - imgWidth for bar width
            <div className="border">
                
                <div className="array-container"> 
                    {array.map((value) => (
                        <div className="array-bar"
                            // need a unique key - using index may display wrong data when animating and 'value' is not necessarily unique
                            // https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
                            key = {shortid.generate()}
                            style = {{
                                height: `${value*((0.7 * imgHeight)/this.MAX_ARR_VAL)}px`, // account for other ui taking window space
                                width: `${((0.8*imgWidth-2*(arrayLength-1)-300)/arrayLength)}px`, // account for margins 
                                backgroundColor: 'blue'
                            }}                                             
                        ></div>
                    ))}
                </div>

                <div className="buttonContainer">
                    <body style={{color: "white", fontSize: "12px"}}>Sorting Methods:</body>
                    <button className="btn" onClick={() => this.bubbleSort()}>Bubble</button>
                    <button className="btn" onClick={() => this.cocktailSort()}>Cocktail</button>
                    <button className="btn" onClick={() => this.insertionSort()}>Insertion</button>
                    <button className="btn" onClick={() => this.quickSort()}>Quick</button>
                    <button className="btn" onClick={() => this.mergeSort()}>Merge</button>
                    <button className="btn" onClick={() => this.heapSort()}>Heap</button>
                </div>
                
                <div className="leftButtonContainer">
                <button className="btn" onClick={() => this.makeArray()}>Generate</button>
                </div>

                <div className="rightSlideContainer">
                    <body style={{color: "white", fontSize: "12px"}}>Animation Speed</body>
                    <input type="range" min="1" max="100" className="slider" id="animationSpeed" onChange={() => this.refresh()}/>
                </div>

                <div className="midSlideContainer">
                    <body style={{color: "white", fontSize: "12px"}}>Array Length: {this.state.arrayLength}</body>
                    <input type="range" min="1" max="200" className="slider" id="arrayLength" onChange={() => this.refresh()}/>
                </div>
            </div>
        );
    }

    
    
    
}
