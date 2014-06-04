// Float element, becomes fixed when designated element moves off-screen
var floatEl = function(options){

  var self = this;
 
  defaults = {
    el : null,
    start_el : '', // when the top of this element goes off-screen, 'el' becomes fixed
    end_el : '',   // when bottom of 'el' reaches bottom of this element 'el' is no longer fixed
    fclass : 'is-fixed',
    offset : 0
  };
  options = jQuery.extend(defaults, options);

  self.init = function(){
    var $el = options.el;
    var $win = jQuery(window);
    var $startEl = jQuery(options.start_el);
    var $endEl = (options.end_el == '') ? jQuery(options.start_el) : jQuery(options.end_el); // if end_el not defined, use start_el
    var el_h = $el.innerHeight();
    var startEl_top = $startEl.offset().top;
    var endEl_top = $endEl.offset().top;
    var endEl_h = $endEl.innerHeight();

    var positionEl = function() {
      
      var win_top = $win.scrollTop();

      if (
        win_top > startEl_top - options.offset 
        &&
        win_top < endEl_top + endEl_h - el_h - options.offset
        ) {
        options.el.addClass(options.fclass);
      } else {
        options.el.removeClass(options.fclass);
      }
    }
    
    positionEl();
    $win.scroll(positionEl);
    
  };

  if (options.el !== null && options.start_el !== '') {
    self.init();
  }
  
};




jQuery(document).ready(function() {
  
  var standardsFloatEl = new floatEl({
    el : $article_nav,
    start_el : '#Body div.column-main',
    end_el : '#Body',
    offset : 50
  });

});