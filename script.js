// variables needed for the click effect of the generate button
var generate = document.getElementById("generate");
var title = document.getElementById("title");
var author = document.getElementById("author");
var text = document.getElementById("text");
var author = document.getElementById("author");
var fav = document.getElementById("fav");
var quotes = {};
var favourites = {};
var randomQuote;

// creating the close button element

var closebutton = document.createElement("button");
closebutton.className = "close";
var closeimage = document.createElement("img");
closeimage.id = "closei";
closeimage.setAttribute('alt','close');
closeimage.setAttribute('src','gclose.png');
closeimage.setAttribute('width','18px');
closeimage.setAttribute('height','18px');

closebutton.appendChild(closeimage);

fav.style.visibility = "hidden";

// reload variables
var reload = document.getElementById("reload");

// reload click effect 
reload.addEventListener("click", function(){
    title.textContent = '"Movie Quote Generator"';
    author.textContent = '-by manel';
    fav.style.visibility = "hidden";
    text.style.fontSize = "4rem";
    list.style.display = "none";
    if (clicked) {
        library.click();
    }
})

// storing my json file into an object so i can modify it easily
fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        quotes = data.quotes;
    })
    .catch(error => {
        console.log('Error:', error);
});


// star icon variables needed
// i'm putting them up here so i can use some of them in the generate button
    
var image = document.getElementById("favi");
var originalSrc = new Image()
originalSrc.src = image.src;
var filledI = new Image();
filledI.src = "starf.png";
var yellowS = new Image();
yellowS.src = "stary.png";

var isFilled = false;

// generate button

generate.addEventListener("click", function generateQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    randomQuote = quotes[randomIndex];

    if (clicked == true) {   // if we're looking at the list of favs we must go back and rechange frames
        library.click();
    }

    // we have to make sure the little star is yellow if the quote has already been added :)
    if ( randomQuote.added == true ){
        isFilled = true;
        image.src = yellowS.src;
    } else {
        isFilled = false;
        image.src = originalSrc.src;
    }

    fav.style.visibility = "visible";
    text.style.fontSize = "3em";
    title.textContent = '"' + randomQuote.quote + '"';
    author.textContent = '- ' + randomQuote.movie;
   
});

// list variables bc we need them for the click effect of the little star
var list = document.getElementById("list");
var quote = document.querySelector(".quote");
var movie = document.querySelector(".movie");
var noadded = document.querySelector(".noadded");

list.style.display = "none";


// hover effect of the little star 

fav.addEventListener("mouseover",function() {
    if(!isFilled){
        image.src = filledI.src;
    }
});

fav.addEventListener("mouseout",function() {
    if(!isFilled){
        image.src = originalSrc.src;
    }
});

// click effect of the little star

fav.addEventListener("click",function(){
    if(!isFilled){
        image.src = yellowS.src;
        isFilled = true;
        randomQuote.added = true;
        favourites[randomQuote.quote]={
            movie : randomQuote.movie
        }

        // we add it to the display list

        let newdiv = document.createElement("div");
        newdiv.className = "listElement";
        let div = document.createElement("div");
        let childQuote = '<div class="quote">"'+randomQuote.quote+'"</div>';
        let childMovie = '<div class="movie">-'+randomQuote.movie+'</div>';
        let hr = document.createElement("hr");

        div.innerHTML += childQuote;
        div.innerHTML += childMovie;
        newdiv.appendChild(div);
        newdiv.innerHTML += closebutton;
        list.appendChild(newdiv);
        list.appendChild(hr);

        //console.log(favourites);
    }else {
        image.src = filledI.src;
        isFilled = false;
        randomQuote.added = false;
        delete favourites[randomQuote.quote];

        // remove the quote form the display list

        let allQuotes = document.querySelectorAll(".quote");
        // let i = 0;
        // while ( allQuotes[i].textContent !== '"'+randomQuote.quote+'"' ){
        //     i++
        // }

        for ( let i = 0; i<allQuotes.length; i++ ){
            if (allQuotes[i].textContent === '"'+randomQuote.quote+'"'){
                allQuotes[i].parentNode.parentNode.nextSibling.remove(); // to remove the hr
                allQuotes[i].parentNode.parentNode.remove(); // to remove the listElement
            }
        }

        //console.log(favourites);
    }
});


// library icon variables needed ( its a saved icon but i named it library everywhere so anyway )

var library = document.getElementById("library");
var image1 = document.getElementById("libraryi");
var originalSrcl = new Image()
originalSrcl.src = image1.src;
var filledIL = new Image();
filledIL.src = "savef.png";
clicked = false;
var allListElements = document.querySelectorAll(".listElement");

// click effect of the saved icon

library.addEventListener("click",function() {
    if(!clicked){
        image1.src = filledIL.src;
        clicked = true;

        // we change frames
        text.style.display = "none";
        author.style.display = "none";
        fav.style.visibility = "hidden";
        list.style.display = "block";

        if ( Object.keys(favourites).length != 0) {
            noadded.style.display = "none";
        } else {
            noadded.style.display = "block";
        }


    } else {
        image1.src = originalSrcl.src;
        clicked = false;

        // we change frames 
        text.style.display = "flex";
        author.style.display = "block";
        list.style.display = "none";

        if ( title.textContent === '"Movie Quote Generator"') {
            fav.style.visibility = "hidden";
        } else {
            fav.style.visibility = "visible";
        }

    }
});


var greyc = new Image()
greyc.src = "gclose.png";
var whitec = new Image();
whitec.src = "close.png";


closebutton.addEventListener("mouseover",function(){
    closeimage.src = whitec.src;
})

