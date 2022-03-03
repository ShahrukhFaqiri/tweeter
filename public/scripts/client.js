$(() => {
  loadTweets();
  
  // Ajax POST request from form to DB
  $('.form-class').on('submit', function (event) {
    event.preventDefault();
    let formData = $(this).serialize();
    let letCount = formData.slice(5).length;

    if (letCount > 140 || letCount === 0) {
      return alert('Invalid Input', letCount);
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
    })
      .then(function () {
        console.log('Ajax Post Successful.');
        $('.form-class').trigger('reset');
        loadTweets();
      })
      .catch(function (error) {
        console.log(`There was an error`, error);
      });
  });
});

  //Loading Tweets DB
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

 // Call back for RenderTweet to make Dynamic Data
 const createTweetElement = (data) => {
  let info = data.user;
  let $tweet = `  
  <article id="tweet-card">
    <header>
      <div class="header">
        <div>
          <img src="${info.avatars}" />
          <span class="user-identity">
            <label id="display-name">${info.name}</label>
            <label class="grayed-out">${info.handle}</label>
          </span>
      </div>
    </header>
    <div class="user-tweet">
      <p>${data.content.text}</p>
    </div>
    <footer>
      <div class="footer">
        <span>${timeago.format(data.created_at)}</span>
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


/* 

   ///////////////
  // Test Data //
 ///////////////


const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];
*/
