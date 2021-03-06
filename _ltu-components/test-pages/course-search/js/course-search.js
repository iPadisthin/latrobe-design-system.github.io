/*** 
 * THIS IS NOT PRODUCTION CODE
 * 
 * This script is purely for UI demonstrations purposes!
 * 
 ***/

// filter behaviour
$(document).ready(function() {
    
    const numResults = $('#course-search-results-count').text();
    var query = ''; // store search query
    var atarDefaultValue = $('#atar').attr('value'); // default atar value
    var atarValue = atarDefaultValue;

    /* for UX testing - demo modal student type picker

    var studentType = '';
    
    // handlers for modal student type selection
    $('body').on('click', '#studentTypeSelect button', function(){
        studentType = $(this).val(); 
        localStorage.setItem('studentType', studentType);
        if(studentType == 'D') {
            $('#dom-toggle').prop('checked', true);
            $('#int-toggle').prop('checked', false);
        } else {
            $('#dom-toggle').prop('checked', false);
            $('#int-toggle').prop('checked', true);
        }
        closeModal();
    });

    // Check if Student type is set otherwise show modal
    if (localStorage.getItem('studentType') === null) {
        content = '<div class="ds-modal-content" id="studentTypeSelect"><h3>We would like to know who you are</h3> <div class="ds-column-layout"> <div class="ds-column-layout__column"> <p>I am a: <br><button class="ds-btn-primary ds-icon-australia-nz ds-icon--before" value="D">Domestic student</button></p> <div> <p><strong>Domestic student means:</strong></br> La Trobe considers you a ‘domestic’ student if you are a citizen or permanent resident of Australia; a citizen of New Zealand; or a permanent humanitarian visa holder.</p> </div> </div> <div class="ds-column-layout__column"> <p>I am an: <br><button class="ds-btn-primary ds-icon-globe ds-icon--before" value="I">International student</button></p> <div> <p><strong>International student means</strong></br> La Trobe considers you an ‘International’ student if you are <strong>not</strong> a citizen or a permanent resident of Australia; <strong>not</strong> a citizen of New Zealand; or <strong>not</strong> a permanent humanitarian visa holder.</p> </div> </div> </div> </div>';
        openModal('h1', content, undefined,'yes');
    } else {
        studentType = localStorage.getItem('studentType');
        if(studentType == 'D') {
            $('#dom-toggle').prop('checked', true);
            $('#int-toggle').prop('checked', false);
        } else {
            $('#dom-toggle').prop('checked', false);
            $('#int-toggle').prop('checked', true);
        }
    }

    // handler for student type toggles
    $('label[for="dom-toggle"], label[for="int-toggle]').on('click', function(){
        if($(this).val() == 'dom') {
            $('#dom-toggle').prop('checked', true);
            $('#int-toggle').prop('checked', false);
            localStorage.setItem('studentType', 'D');
        } else {
            $('#dom-toggle').prop('checked', false);
            $('#int-toggle').prop('checked', true);
            localStorage.setItem('studentType', 'I');
        }
    });

    */
    
    
    $('.ds-filter-group__filter').each(function(){
        $('#filter-tags').append('<span id="'+$(this).attr('id')+'-tags"></span>');
    });
    
    /* 
     * reset tags
     * this function is to refershes the filter tag list after filter change
     */
    function resetTags(){
        
        var filterTagsWrapper;
        var filterTags = '';
        
        $('#filter-tags span').empty();
        // add tags for checkboxes
        $('.ds-filter-group__filter:not(#ATAR-filter)').each(function(){
            var filterName = $(this).attr('id');
            filterTagsWrapperId = filterName+'-tags';
            $(this).find('.ds-input-checkbox').each(function(){
                
                // check not top level all control by checking that it doesn't have attr data-all-parent 
                var attrCheck = $(this).attr('data-all-parent');
                if (typeof attrCheck !== typeof undefined && attrCheck !== false) {
                    // if checked add a tag 
                    if ($(this).prop("checked") == true) {
                        var thisID = $(this).attr('id');
                        var thisVal = $(this).val();
                        var label = $('label[for='+thisID+']').text();
                        filterTag = '<button class="ds-tag ds-tag--green" title="remove filter" data-filter-id="'+thisID+'" data-filter-value="'+thisVal+'">'+label+'</button>\n';
                        $('#'+filterTagsWrapperId).append(filterTag);
                    }
                }
            });
        }).promise().done(function(){
            
            
            // add tag for ATAR if not original value
            if(atarValue != atarDefaultValue) {
                $('#ATAR-filter-tags ').append('<button class="ds-tag ds-tag--green" title="remove filter" data-filter-id="atar" data-filter-value="'+atarValue+'">ATAR: '+atarValue+'</button>');
            }
            
            refreshResults();
            
        });
        
    }
    
    function refreshNumResults(numResults) {
        $('#course-search-results-count').replaceWith('<span id="course-search-results-count">'+numResults+'</span>');
    }
    
    function refreshResults() {
        
        //simulate results change
        $('#course-search-results .ds-course-card').fadeOut();
        
        // if no filters    
        if($('#filter-tags .ds-tag').length == 0) {
            if(query == ''){
                // no filter tags no query fade in all course cards
                $('#course-search-results .ds-course-card').fadeIn();
                refreshNumResults(numResults);
            } else {
                // no filter but query
                $('#course-search-results .ds-course-card').each(function() {
                    if($(this).text().includes(query)) {
                        $(this).fadeIn();
                    }
                }).promise().done(function(){
                    var newNumResults = $('#course-search-results .ds-course-card:visible').length;
                    refreshNumResults(newNumResults);
                });
            }
        } 
        // else if fliters
        else {
            $('#filter-tags .ds-tag').each(function(){
                var filterTagWrapperId = $(this).parent().attr('id');

                switch (filterTagWrapperId) {
                    case 'level-filter-tags':
                        filterAttribute = 'data-filter-level';
                        break;
                    case 'discipline-filter-tags':
                        filterAttribute = 'data-filter-discipline';
                        break;
                    case 'campus-filter-tags':
                        filterAttribute = 'data-filter-campus';
                        break;
                    case 'mode-filter-tags':
                        filterAttribute = 'data-filter-mode';
                        break;
                    case 'ATAR-filter-tags':
                        filterAttribute = 'data-filter-atar';
                        break;
                        
                }
                    
                var filterValue = $(this).attr('data-filter-value');
                $('#course-search-results .ds-course-card['+filterAttribute+'~="'+filterValue+'"]').each(function() {
                    if(query != ''){
                        // filters and query
                        if($(this).text().includes(query)) {
                            $(this).fadeIn();
                        }
                    } else {
                        // filter no query
                        $(this).fadeIn();
                    }
                }).promise().done(function(){
                    var newNumResults = $('#course-search-results .ds-course-card:visible').length;
                    refreshNumResults(newNumResults);
                });
            });
        }
        
    }
    

    // handler for checkbox filter all change
    $('.ds-input-checkbox[data-all-control]').on('change', function(){

        // disable all filter tabs (until apply button clicked)
        $('.ds-filter-group__nav__tab').attr('disabled', 'disabled');

        if($(this).prop("checked") == true) {
            // check all control
            var allControlName = $(this).attr('data-all-control');
            
            $('[data-all-parent="'+allControlName+'"]').each(function(){
                // uncheck all children
                $(this).prop( "checked", false );
                // if child is also an all control parent
                if($(this).attr('data-all-control')) {
                    //uncheck all its children
                    var allControlName = $(this).attr('data-all-control');
                    $('[data-all-parent="'+allControlName+'"]').prop( "checked", false );
                }
                
            });
        }
    });

    // handler for checkbox filter change
    $('.ds-input-checkbox[data-all-parent]').on('change', function(){

        // disable all filter tabs (until apply button clicked)
        $('.ds-filter-group__nav__tab').attr('disabled', 'disabled');

        var allParentName = $(this).attr('data-all-parent');

        // if checked
        if($(this).prop("checked") == true) {

            // if all children in group are now checked
            if($('.ds-input-checkbox[data-all-parent="'+allParentName+'"]:checked').length == $('.ds-input-checkbox[data-all-parent="'+allParentName+'"]').length) {
                // uncheck all children
                $('.ds-input-checkbox[data-all-parent="'+allParentName+'"]').prop( "checked", false );
                // check all parent
                $('[data-all-control="'+allParentName+'"]').prop( "checked", true );
            } 
            else {
                // uncheck all parent
                $('[data-all-control="'+allParentName+'"]').prop( "checked", false );
                // if parent is also child uncheck its all parent
                var parentsAllParent = $('[data-all-control="'+allParentName+'"]').attr( 'data-all-parent' );
                if (parentsAllParent.length != 0) {
                    $('[data-all-control="'+parentsAllParent+'"]').prop( "checked", false );
                }
            }
        } 
        // else all children unchecked
        else if($(this).closest('.ds-filter-group__filter').find('.ds-input-checkbox[data-all-parent]:checked').length == 0) {
            // check if parent has parent
            var attrCheck = $('[data-all-control='+allParentName+']').attr('data-all-parent');
            if (typeof attrCheck !== typeof undefined && attrCheck !== false) {
                // if parents parent direct childre are all unchecked then check parents parent
                if($('[data-all-control="'+attrCheck+'"] [data-all-parent="'+attrCheck+'"]:checked').length == 0) {
                    $('[data-all-control="'+attrCheck+'"]').prop( "checked", true );
                } 
            } else {
                // if parent has no parent the check it
                $('[data-all-control='+allParentName+']').prop( "checked", true );
            }
        }
        
        
    });

    
    // handler for check box filter
    $('#level-filter, #discipline-filter, #location-filter, #mode-filter').on('submit', function(event){
        
        event.preventDefault();
        
        var filterTriggerButtonId = $(this).closest('.ds-filter-group__content__tab').attr('aria-labelledby'); // get tab button id
        
        // if the all checkbox is selected
        if ($(this).find('[data-all-control]').prop("checked") == true) {
            // remove selected class from filter drop down button 
            $('#'+filterTriggerButtonId).removeClass('ds-filter-group__nav__tab--selected');
        } else {
            // add selected class to filter drop down button
            $('#'+filterTriggerButtonId).addClass('ds-filter-group__nav__tab--selected');
        }

        // enable filter tabs
        $('.ds-filter-group__nav__tab').removeAttr('disabled');

        // close filter
        if($('#'+filterTriggerButtonId).attr('aria-expanded') == "true") {
            $('#'+filterTriggerButtonId).trigger('click');
        }
        
        // reset filter taglist
        resetTags();
        
    });
    
    // handler for ATAR filter change
    $('#atar').on('change', function(){

        // disable all filter tabs (until apply button clicked)
        $('.ds-filter-group__nav__tab').attr('disabled', 'disabled');

    });
    
    // handler for ATAR filter
    $('#ATAR-filter').on('submit', function(event){
        
        event.preventDefault();
        
        var filterTriggerButtonId = $(this).closest('.ds-filter-group__content__tab').attr('aria-labelledby'); // get tab button id
        atarValue = $('#atar').val(); // get set atarValue filter value


        // if atar is reset
        if(atarValue == atarDefaultValue) {
            // remove selected class from filter drop down button 
            $('#'+filterTriggerButtonId).removeClass('ds-filter-group__nav__tab--selected');
        } else {
            // add selected class to filter drop down button
            $('#'+filterTriggerButtonId).addClass('ds-filter-group__nav__tab--selected');
        }
        
        // enable filter tabs
        $('.ds-filter-group__nav__tab').removeAttr('disabled');

        // close filter
        if($('#'+filterTriggerButtonId).attr('aria-expanded') == "true") {
            $('#'+filterTriggerButtonId).trigger('click');
        }
        
        // reset filter taglist
        resetTags();
        
    });
        
    
    //handle tag click
    $('#filter-tags').on('click', '.ds-tag', function(){
        // get correspoding filter id from button attribute data-filter-id
        var filterId = $(this).attr('data-filter-id');

        if ($(this).attr('data-filter-id') != 'atar') { // if checkbox filter
            // trigger correspoding filter click
            $('#'+filterId).prop("checked",false).trigger("change").promise().done(function(){
                // trigger correspoding filters parent form submit
                $(this).closest('.ds-filter-group__filter').trigger('submit');
            });
        } else {
            $('#atar-value-clear').trigger('click').promise().done(function(){
                // trigger correspoding filters parent form submit
                $(this).closest('.ds-filter-group__filter').trigger('submit');
            });
        }

    });


    // handler for course search
    $('#course-search').on('submit', function(event){

        event.preventDefault();

        // simulate search
        query = $('#query_courses').val();
        $('#query_courses').val('');
        
        $(this).find('#query-tag-container').empty();
        if (query != '') {
            $(this).find('#query-tag-container').append('<button type="button" class="ds-tag" title="remove filter" id="query-tag">'+query+'</button>');
        }
        
        // turn on releveance filter and switch it on
        $('#sort-releveance').removeAttr('disabled').prop('checked', true);
        
        refreshResults();
        
    });

    // handler for query-tag

    $('#query-tag-container').on('click', '#query-tag', function(){
        $(this).remove();
        query = '';
        // disable relevance filter
        $('#sort-releveance').addAttr('disabled');
        // switch to a-z filter
        $('#sort-a-z').prop('checked', true);
        refreshResults();
    });

});