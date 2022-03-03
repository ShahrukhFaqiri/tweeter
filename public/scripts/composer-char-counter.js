$(() => {
  const $tweetText = $('#tweet-text');
  $tweetText.on('input', function () {
    //this.value.length could also work
    let input = $tweetText.val().length;
    let letCount = 140 - input;
    const $counter = $(this).siblings().children().last();
    //Adds or Remove based on if let count is below 0
    letCount < 0
      ? $counter.addClass('exeeded-char-limit')
      : $counter.removeClass('exeeded-char-limit');
    //Adds class based on if the character limit is exceeded or not
    letCount < 0 ? $('#error').removeClass('hidden') : $('#error').addClass('hidden');

    $counter.text(letCount);
  });
});
