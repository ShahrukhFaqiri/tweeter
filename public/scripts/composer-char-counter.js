$(() => {
  const $tweetText = $('#tweet-text');
  $tweetText.on('input', function() {
    let input = $tweetText.val().length;
    let letCount = 140 - input;
    const $counter = $(this).siblings().children().last();
    letCount < 0 ? $counter.addClass('exeeded-char-limit') : $counter.removeClass('exeeded-char-limit');
    $counter.text(letCount);
  });
});