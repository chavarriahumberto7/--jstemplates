
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const facebootBtn=document.getElementById('facebook');
const newQuoteBtn=document.getElementById('new-quote'); 
const loader=document.getElementById('loader'); 

//show loading option

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hidding loading option
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}

//Get quote from API

async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor===''){

            authorText.innerText='Unknown';
        }else{

            authorText.innerText=data.quoteAuthor;
        }
        //redice fpmt soze fpr ñpmg qiptes

        if(data.quoteText.length>50){
            quoteText.classList.add('long-quote');
        }
        quoteText.innerText=data.quoteText;

        //hiding loader and getting the right element displayed
        removeLoadingSpinner();

    } catch (error) {
        getQuote();
        console.log('whoops, no quote', error);
    }

}

function postQuote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const facebookUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(facebookUrl,'_blank');
}

//event Listeners
newQuoteBtn.addEventListener('click',getQuote);
facebootBtn.addEventListener('click',postQuote);


//On Load
getQuote();

