
// function Carousel 

const slides = document.getElementsByClassName('carousel_box ');
const  dot = document.getElementsByClassName('dot');
const nextBtn = document.getElementById('next_btn');
const prevBtn = document.getElementById('prev_btn');
console.log(slides);
let slideIndex = 1;

let interval = setInterval(autoShowslide,5000)


function autoShowslide(){
    slideIndex++;
    showSlides(slideIndex);
    resetInterval();
}

nextBtn.addEventListener('click',()=>{
    showSlides(slideIndex +=1);
    resetInterval();
})
prevBtn.addEventListener('click',()=>{
    showSlides(slideIndex -=1);
    resetInterval();
})


function showSlides(n) {
    if(n > slides.length){
        slideIndex = 1;
    }
    if (n < 1){
        slideIndex = slides.length;
    }
    for(let i =0; i<slides.length; i++){
        slides[i].style.display = 'none';
        slides[i].classList.remove('active');
    }

    for (i = 0; i <dot.length; i++) {
        dot[i].className = dot[i].className.replace(' active',"");
    }

slides[slideIndex-1].style.display = 'flex';
slides[slideIndex-1].classList.add('active');
dot[slideIndex-1].classList.add('active');
}

showSlides()

function resetInterval(){
    clearInterval(interval);
    interval = setInterval(autoShowslide,5000)
}

// end function carousel

