    function fetchData(){
    //HTML5 Fetch
    fetch('https://randomuser.me/api?results=10')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //+ store stringified array of 10 profiles in localstorage
        localStorage.setItem('test', JSON.stringify(myJson));
        nextProfile();
      });
}

document.querySelector('.like').addEventListener('click', function(){
    ClassifyProfile('like');
});
document.querySelector('.dislike').addEventListener('click', function(){
    ClassifyProfile('dislike');
});

let index=0;
let currentProfile = '';

function nextProfile(){
    //De-stringify array from localStorage
    let array = JSON.parse(localStorage.getItem('test'));
    //store profile from array with current $index in $currentprofile
    currentProfile = array.results[index];
    displayProfile(currentProfile);
    //Update $index and re-execute fetchData() if>=9
    if(index>=9){
        index=0;
        fetchData();
    }else{
        index++;
    }
}

function displayProfile(hooman){
    //Generating elements
    document.querySelector('.data-container').innerHTML = '';
    document.querySelector('.data-container').innerHTML += '<h1>' + hooman.name.first + ' ' + hooman.name.last + '</h1>';
    document.querySelector('.data-container').innerHTML += '<div class="picture"></div>';
    document.querySelector('.picture').style.backgroundImage = 'url(' + hooman.picture.large + ')';
    document.querySelector('.data-container').innerHTML += '<h3>' + hooman.dob.age + '</h3>';
}

function ClassifyProfile(type){
    let likes = new Array();
    //De-stringifying liked profiles-array from localStorage except first like
    if(localStorage.getItem('likes') != null){
        console.log('Length of $likes after making it: ' + likes.length);
        likes = JSON.parse(localStorage.getItem('likes'));
        console.log('Displaying RAW LS:likes: ' + JSON.parse(localStorage.getItem('likes')));
        console.log('Length of $likes after fetching from localstorage: ' + likes.length);
    }
    likes.push('aids');
    localStorage.setItem('likes', JSON.stringify(likes));
    DisplayLikesDislikes();
    nextProfile();
}

function DisplayLikesDislikes(){
    let likes = JSON.parse(localStorage.getItem('likes'));
    for(i=0; i<likes.length;i++){
        document.querySelector('.likes-container').innerHTML += '<h1 class="switchlist" id="' + i + '">' + currentProfile.name.first + ' ' + currentProfile.name.last + '</h1>';
    }
}

fetchData();