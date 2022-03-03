$(() => {
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

  // Looping through database, passing and appending createTweetElement to HTML
  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      // $(createTweetElement(tweet)).appendTo('.tweets');
      $('.tweets').append(createTweetElement(tweet));
    }
  };

  // Call back for RenderTweet to make Dynamic Data
  const createTweetElement = (data) => {
    let $tweet = `  
    <article id="tweet-card">
      <header>
        <div class="header">
          <div>
            <img src="${data.user.avatars}" />
            <span class="user-identity">
              <label id="display-name">${data.user.name}</label>
              <label class="grayed-out">${data.user.handle}</label>
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

  renderTweets(data);

  // Ajax POST request from form to DB
  $('.form-class').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
    })
      .then(function () {
        console.log('it worked');
      })
      .catch(function (error) {
        console.log(`There was an error`, error);
      });
  });
});
