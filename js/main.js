$(document).on('pop-initialized', function(){
  $('#main-region .asset-type-text').live('initialize', function(e, asset){
    var el = e.currentTarget;
    $('#fancybox-outer').addClass('themed');
    if ($(el).height() > 440) {
      var inner = $(el).find('.asset-inner');
      inner.addClass('truncate');
      inner.height(440);
      $('<div class="show-overflow-text">READ MORE</div>').appendTo(inner).fancybox({
        autoDimensions: false,
        width: 500,
        content: '<div class="asset asset-type-text asset-size-fancybox"><div class="asset-inner"><h2>' + inner.find('h2').text() + '</h2><div class="content">' + inner.find('.content .body').html() + '</div></div></div>'
      });
    }
  });

  $('#main-region .asset-type-text').live('destroy', function(e, asset){
    var el = e.currentTarget;
    var inner = $(el).find('.asset-inner');
    inner.height('');
    inner.removeClass('truncate');
    inner.find('.show-overflow-text').remove();
  });

  $('.asset').live('initialize', function(e, asset){
    fixBaseline(e.currentTarget);
  });

  $('.asset').live('destroy', function(e, asset){
    fixBaseline(e.currentTarget);
  });

});

function fixBaseline(el) {
  var $el = $(el).find('.content');
  $el.imagesLoaded(function(images, proper, broken){
    var height = $el.height();
    var baseline = 20;
    var offset = (baseline - height % baseline) % baseline;
    $el.css('padding-bottom', offset + 'px');
  });
  $(document).imagesLoaded(function(){
    Populr.ThemeEngine.repack();
  });
}
