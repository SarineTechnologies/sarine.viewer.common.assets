(function (window, document, $) {

    var gradeScalesUtils = {
        iterateGradeScales : iterateGradeScales,
        setBasicGradeScalesOnElement : setBasicGradeScalesOnElement,
        getTotalGrade : getTotalGrade
    }

    function iterateGradeScales(handler,stone) {
        if (typeof handler !== 'function') {
            return;
        }

        var gradeScales = ['fire', 'brilliance', 'sparkle', 'symmetry'];
        gradeScales.forEach(function(item) {
            handler(item,null,stone);
        });
    }

    function setBasicGradeScalesOnElement(currentGrade, percents,stone) {

        if (currentGrade === 'sparkle') {
            currentGrade = 'scintillation';
        }

        var scaleElement = document.getElementById(currentGrade+'Id');
        if (!scaleElement) return;

        var grade = stone && stone.lightGrades && stone.lightGrades[currentGrade];
        if (!grade) {
            console.error('No information for ' + currentGrade + ' in %O', stone.lightGrades);
            return;
        }

        var percentage = grade && grade.percentage;
        if (!percentage) return;

        var value = 100 - percentage * 100;

        scaleElement.innerText = grade.name;
    }
//should return object like this {"totalGrade" : "val" , "stars" :val" }
    function getTotalGrade(stone,cb) {

        var result =  {"totalGrade" : "","stars":""};
        var name = stone && stone.lightGrades && stone.lightGrades.totalGrade && stone.lightGrades.totalGrade.name,
            gradeScales = window.gradeScales || {},
            totalGradeScales = gradeScales.totalGrade,

            displayVal;

        if (name && totalGradeScales) {
            totalGradeScales.some(function (item) {
                if (item.name === name) {
                    displayVal = item['default-display'];
                    var Splitted = displayVal.split(' ');
                    Splitted.pop();
                    result.totalGrade = Splitted.join(' ');
                    var numToCheck = displayVal[displayVal.length - 1];
                    if(!isNaN(numToCheck)) {
                        result.stars = new Array(parseInt(numToCheck) + 1).join('★');
                        return cb(result);
                    }
                }

            });
            return cb(null);
        }
    }
    window.gradeScalesUtils = gradeScalesUtils;
})(window, window.document, window.jQuery);
