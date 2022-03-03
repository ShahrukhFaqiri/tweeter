$(() => {
  //Loading Tweets DB
  loadTweets();

  // Ajax POST request from form to DB
  $('.form-class').on('submit', function (event) {
    event.preventDefault();
    let formData = $(this).find('textarea').val();
    console.log(`form data`, formData);
    let letCount = formData.length;
    console.log(`Outside:`, letCount);
    if(letCount > 140){
      return false;
    }
    if(letCount <= 0){
      $('#error-zero').removeClass('hidden-zero');
      return false;
    }
    let serializedData = $(this).find('textarea').serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData,
    })
      .then(function () {
        if (letCount <= 140) {
          console.log('Ajax Post Successful.');
          $('.form-class').trigger('reset');
          $('#counter').html("140");
          $('#error-zero').addClass('hidden-zero');
          loadTweets();
        }
      })
      .catch(function (err) {
        console.log(letCount, `Error was caught, user has been warned`, err)
      });
  });
});

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    data: $(this).serialize(),
  })
    .then((res) => {
      renderTweets(res);
    })
    .catch((err) => {
      console.log(`There was an error with your request`, err);
    });
};

// Looping through database, passing and appending createTweetElement to HTML
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    // $(createTweetElement(tweet)).appendTo('.tweets');
    $('.tweets').prepend(createTweetElement(tweet));
  }
};

//Security measure so users cant run scripts from form
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Call back for RenderTweet to make Dynamic Data
const createTweetElement = (data) => {
  let info = data.user;
  let $tweet = `  
  <article id="tweet-card">
    <header>
      <div class="header">
        <div>
          <img src="${escape(info.avatars)}" />
          <span class="user-identity">
            <label id="display-name">${escape(info.name)}</label>
            <label class="grayed-out">${escape(info.handle)}</label>
          </span>
      </div>
    </header>
    <div class="user-tweet">
      <p>${escape(data.content.text)}</p>
    </div>
    <footer>
      <div class="footer">
        <span>${escape(timeago.format(data.created_at))}</span>
        <div>
          <div class="icons">
            <i class="fa-solid fa-flag hover-icon"></i>
            <i class="fa-solid fa-retweet hover-icon"></i>
            <i class="fa-solid fa-heart hover-icon"></i>
          </div>
        </div>
      </div>
    </footer>
</article>`;
  return $tweet;
};
