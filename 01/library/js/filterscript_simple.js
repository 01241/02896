/*
 * Simple Filter
 * filterscript_simple.js
 * @author Markus Steiger <steiger.01241@gmail.com> / <http://01241.com>
 * @copyright 2017 Markus Steiger
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */


$(document).ready(function () {

    // FILTER -------------

    var $filterCheckboxes = $('#main-category button');

    $filterCheckboxes.on('click', function() {

        $('#main-category').find('.is-checked').removeClass('is-checked');      // CATEGORIES "AND"  comment out this line
        $(this).addClass('is-checked');                                         // CATEGORIES "AND"  change this line to        $(this).toggleClass('is-checked');
        $('#main-show-all').removeClass('is-checked');
        var selectedFilters = {};

        $filterCheckboxes.filter('.is-checked').each(function() {
            if (!selectedFilters.hasOwnProperty(this.name)) {
            selectedFilters[this.name] = [];
            }
            selectedFilters[this.name].push(this.value);
        });

        var $filteredResults = $('.item');

        $.each(selectedFilters, function(name, filterValues) {
            $filteredResults = $filteredResults.filter(function() {
            var matched = false,
            currentFilterValues = $(this).data('category').split(' ');
                $.each(currentFilterValues, function(_, currentFilterValue) {
                    if ($.inArray(currentFilterValue, filterValues) != -1) {
                      matched = true;
                      return false;
                    }
                });
                return matched;
            });
        });

        $('.item').hide().filter($filteredResults).show();

        // COUNTER ----------
        var nss = $filteredResults.not('.display-none').length;
        if (nss === 0) {
            $( "#message-wrap" ).html( "<div class='error-message'>No items were found matching this set of categories. Please change your search using the options in the filter above.</div>");
                } else {
            $( "#message-wrap" ).html( "<div class='counter'><span>" + nss + "</span> Items found.</div>");
        };

        // SHOW ALL BUTTON ----------
        $('#main-show-all').click(function (e) {
            $('.item').removeClass('display-none');
            $('.item').show();
            $('#main-category').find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
            $( "#message-wrap" ).html( "<div class='counter'><span>" + $('.item').length + "</span> Items found.</div>");
        });

    });


    // SORT ------------------------------------------------------------------

    $(function(datesort) {
        $(document).on('click', '#sortdate', function(event){

            var that = $(this);
            var menuText = $(this).attr('data-val');
            var $wrapper = $('#list-wrap'),
                $items = $wrapper.find('.item');
            [].sort.call($items, function(b,a) {
                return + $(a).attr('data-date') - + $(b).attr('data-date');
            });
            $items.each(function(){
                $wrapper.append(this);
            });
            $('.sub-menu li').removeClass('is-checked');
            that.addClass('is-checked');

            $('.dropdown-opener .button-text').text(menuText);
            $('.dropdown-opener').attr('data-val', menuText).removeClass('clicked');
            $('.sub-menu').slideUp('fast').attr('aria-expanded', false);

        });
    });

    $(function(titlesort) {
        $(document).on('click', '#sorttitel', function(event){

            var that = $(this);
            var menuText = $(this).attr('data-val');
            var $wrapper = $('#list-wrap'),
                $items = $wrapper.find('.item');
            [].sort.call($items, function(a,b) {
                return ($(b).attr('data-id')) < ($(a).attr('data-id')) ? 1 : -1;
            });
            $items.each(function(){
                $wrapper.append(this);
            });
            $('.sub-menu li').removeClass('is-checked');
            that.addClass('is-checked');

            $('.dropdown-opener .button-text').text(menuText);
            $('.dropdown-opener').attr('data-val', menuText).removeClass('clicked');
            $('.sub-menu').slideUp('fast').attr('aria-expanded', false);

        });
    });

    // SET COUNTER ON LOAD ----------------
    $( "#message-wrap" ).html( "<div class='counter'><span>" + $('.item').length + "</span> Items found.</div>");


    // SORT DROPDOWN ----------------
    var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart" : "click";

    $('.dropdown-opener').bind(event, function(event){

        if($(this).hasClass('clicked')){
            $('.dropdown-opener').removeClass('clicked');
            $('.sub-menu').slideUp('fast').attr('aria-expanded', false);
        } else {
                $('.dropdown-opener').removeClass('clicked');
                $('.sub-menu').slideUp('fast').attr('aria-expanded', false);
                $(this).addClass('clicked');
                $(this).next('.sub-menu').slideDown('fast').attr('aria-expanded', true).focus();
        }
          event.preventDefault();
          return false;

      });

      $("body").bind(event, function(event) {
          if(!$(event.target).hasClass('sub-menu') && !$(event.target).parents('.sub-menu').hasClass('sub-menu')){
                 if ( $('.sub-menu').prev().hasClass('clicked')) {
                      $('.sub-menu').slideUp('fast').attr('aria-expanded', false);
                      $('.dropdown-opener').removeClass('clicked');
                }
          }
      });

});