/*
 * Client-side JS logic goes here
 * jQuery is already loaded <span>${timeago.format(data.created_at)}</span>
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

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

  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      console.log(tweet)
      // $(createTweetElement(tweet)).appendTo('.tweets');
      $('.tweets').append(createTweetElement(tweet))
    }
  };

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

  // const $tweet = createTweetElement(tweetData);
  renderTweets(data);
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
