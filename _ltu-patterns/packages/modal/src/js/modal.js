---
javascript: true
---
/**
 *  Modal
 *  @param: target - element clicked to open modal.
 *  @param: content - content to show in modal
 *  @param: maxWidth - sets a max width for the modal
 */
function openModal(target, content, maxWidth='1280px'){
    // add an attribute to the clicked link to enable return of focus on overlay close
    $(target).attr('data-returnfocus', 'yes');
    // create overlay
    var dialog = '<div role="dialog" aria-modal="true" class="overlay"><button id="overlay-close" class="ds-btn--round-light icon-x">Close</button><div class="ds-modal">'+content+'</div></div>';
    // append overlay to page and add overlay-open class to body to stop scroll
    $('body').append(dialog).addClass('overlay-open');
    // set max width of modal
    $('.ds-modal').css('max-width', maxWidth);
    // fade in overlay change focus to overlay close button
    $('.overlay[role="dialog"]').fadeIn(function(){
        $('#overlay-close').focus();
    });
}
// handler for modal close button
$('body').on('click keydown', '#overlay-close, .overlay[role="dialog"]', function(event) {
    // find clicked play link
    var returnFocusLink = '[data-returnfocus="yes"]';
    if (event.keyCode === undefined || event.keyCode == 13 || event.keyCode == 27) {
        // undefined for click, 13 for enter key, 27 for esc key
        event.preventDefault();
        $('.overlay[role="dialog"]').fadeOut(function(){
            // delete video iframe to stop playing
            $('.overlay[role="dialog"]').remove();
            // return focus to clicked play link and remove identifying attribute
            $(returnFocusLink).focus().removeAttr('data-returnfocus');
            // return scroll to body
            $('body').removeClass('overlay-open');
        });
    }
});

/**
 *  Click handler for standard modal
 */
$('body').on('click', '[data-modal-content]', function(e) {
    e.preventDefault();
    var target = e.target;
    // get the modal content id from the clicked button
    var modalContentId = $(target).attr('data-modal-content');
    var modalContent = $('<div/>').append($('#'+modalContentId).clone()).html();
    openModal(target, modalContent, '800px');
});
