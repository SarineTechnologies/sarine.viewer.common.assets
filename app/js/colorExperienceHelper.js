/**
 * Created by Eran.niv on 23/11/2017.
 */
(function (window, document, $) {

    var colorGradeMaps = {
        "D": 1,
        "E" :2,
        "F" :3,
        "G" :4,
        "H" :5,
        "I" :6,
        "J" :7,
        "K" :8,
        "L" :9,
        "M" :10,
        "N" :11,
        "OP":12,
        "QR":13,
        "ST":14,
        "UV":15,
        "WX":16,
        "YZ":17
    }
    var colorExperienceHelper = {

        initColorView : initColorView,
        colorArrowsEvent : colorArrowsEvent
    }
    function resetColorByIndex(index){

        if(index ==0  || index > Object.keys(colorGradeMaps).length )
            return ;
        $('.owl-carousel').trigger('to.owl.carousel',index-1)
    }
    function resetColorSlider($element){

        var index =  $element.attr('index');

        resetColorByIndex(index);

    }
    function addColorClick(){

        $('.owl-carousel').on('click', '.item', function () {
            console.log('in click of active element in carousel...');
            var $this = $(this);
            var color = $this.children().first()[0].innerText;
            if(color.indexOf('-')>0)
            {
                var splited = color.split('-');
                color = splited[0] + splited[1];
            }
            var index = colorGradeMaps[color];
            resetColorByIndex(index);


        });


    }
    function initColorView(pageCodes,colorProperty){

        var stone= null;
        if(window.stones && window.stones[0])
            stone = window.stones[0];
        if(!stone)
            return ;
        var color =  (colorProperty =='srnColor') ? stone.stoneProperties.srnColor : stone.stoneProperties.color;

        var selector = $('.color-container img');//.children('img');
        if(selector.length> 0 ){
            var experience =  configuration.experiences.filter(function (e) {
                return (e.atom === pageCodes.colorExperience);
            });
            if(experience.length>0)
                experience = experience[0];
            var imageWithLetter = experience.ImagePatternLetter || "sprite-with-letters_*.png";
            var filePrefix = imageWithLetter.replace(/\*.[^/.]+$/,'');
            var fileExt    = "."+imageWithLetter.split('.').pop();
            if(!colorGradeMaps.hasOwnProperty(color))
                return false;
            var imageIndex = colorGradeMaps[color];
            var filePath = document.viewersList[pageCodes.colorExperience];
            var imagePath = filePath + filePrefix +imageIndex  + fileExt ;
            selector.attr('src', imagePath);
            selector.attr('index',imageIndex);
            selector.attr('style' ,'cursor:pointer');

            selector.on('click', function(e){ // ' .color-image'

                var $el = $(this);
                resetColorSlider($el);
                e.stopPropagation();

            });
            return true;
        }
    }
    function getCurrentColorIndex(){

        var color = $('.owl-item.active.center').children().children().first()[0].innerText;
        var index = colorGradeMaps[color];
        return index;
    }
    function colorArrowsEvent(){

        addColorClick();
    }


    window.colorExperienceHelper = colorExperienceHelper;

})(window, window.document, window.jQuery);