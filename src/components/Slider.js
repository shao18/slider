import React, {Component} from 'react';

import slide1 from '../img/slide-1.png';
import slide2 from '../img/slide-2.png';
import slide3 from '../img/slide-3.png';
import slide4 from '../img/slide-4.png';

class Slider extends Component {

  constructor(props){
       super(props);
       let state = {
         slides: [
           {
              eachSlide: `url(${slide1})`
           },
           {
              eachSlide: `url(${slide2})`
           },
           {
              eachSlide: `url(${slide3})`
           },
           {
              eachSlide: `url(${slide4})`
           }

         ],
         autoplay: false,
         active: 0,
         max: 0
       }
       state.max = state.slides.length;
       this.state = state;

       this.intervalBetweenSlides = this.intervalBetweenSlides.bind(this);
       this.nextOne = this.nextOne.bind(this);
       this.prevOne = this.prevOne.bind(this);
       this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
  }

  componentDidMount(){
      this.interval = setInterval(()=>this.intervalBetweenSlides(), 3000);
  }

  componentWillUnmount(){
       clearInterval(this.interval);
  }

  intervalBetweenSlides(){
      
    if(this.state.autoplay === true){

      let active = (this.state.active === this.state.max -1 )?0: (this.state.active + 1);
      this.setState({active: active});
      
    }
  }

  toggleAutoPlay(){
       this.setState({autoplay: !this.state.autoplay});
  }

  nextOne() {
    this.setState({active: (this.state.active + 1) % this.state.max }, () => console.log(this.state));
  }

  prevOne(){
    this.setState({active: (this.state.max + this.state.active - 1) % this.state.max }, () => console.log(this.state));
  }

  dots(index, event) {

    this.setState({
      active: index
    })
  }

  isActive(value){
    return (this.state.active === value)?'active':'';
  }

  setSliderStyles(){
        const transition = this.state.active * (-100) / this.state.slides.length + '%';
        return {
           width: (this.state.slides.length * 100) + '%',
           transform: `translateX(${transition})`,
        }

  }

  renderSlides(){

    const transition = 100/ this.state.slides.length + '%';
    return this.state.slides.map( (item, index) =>  <div 
        className='each-slide'
        key = {index}
        style = {{backgroundImage:item.eachSlide, width: transition}}
      >
      </div>
    
    )
  }

  renderDots(){
       return this.state.slides.map((item,index) =>  <li 
          className={this.isActive(index)+' dots'}
          key = {index}
          ref="dots"
          onClick={this.dots.bind(this, index)}
        >
        <a >&#9679;</a>
        </li>
       )

  }
  renderPlayStop(){
       let playStop;
       if(this.state.autoplay){
          playStop = <svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24'>
    <path d='M0 0h24v24H0z' fill='none'/>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z'/>
</svg>;
       }else{
          playStop = <svg fill='#FFFFFF' height='24' viewBox='0 0 24 24' width='24'>
            <path d='M0 0h24v24H0z' fill='none'/>
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z'/>
          </svg>;
       }
       return playStop;

  }
  renderArrows(){

    return (
      <div>
      <button 
        type="button"
        className="arrows prev"
        onClick={this.prevOne}>
        <svg fill='#FFFFFF' width='50' height='50' viewBox='0 0 24 24'>
    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/>
    <path d='M0 0h24v24H0z' fill='none'/>
</svg>
      </button>
      <button 
        type="button"
        className="arrows next"
        onClick={this.nextOne}>
        <svg fill='#FFFFFF' height='50' viewBox='0 0 24 24' width='50'>
    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/>
    <path d='M0 0h24v24H0z' fill='none'/>
</svg>
      </button>
      ></div>)
  }

  render(){

    return (
      <div className="slider">
      <div 
      className="wrapper"
      style={this.setSliderStyles()}

      >
            {this.renderSlides()}
      </div>
      {this.renderArrows()}
      <ul className="dots-container">
        {this.renderDots()}
      </ul>
      <a 
      className="toggle-play"
      onClick={this.toggleAutoPlay}>
      {this.renderPlayStop()}
      </a>
      </div>)
  }
}
export default Slider;