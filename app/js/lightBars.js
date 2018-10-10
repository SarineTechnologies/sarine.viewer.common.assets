(function (window, document, $)
{
    'use strict';

    window.showLightBars = function(elementID, grades, yAxisLabels, startColor, endColor, borderColor, thickness)
    {
        //using http://www.chartjs.org/

        var labelsToUse = [];

        grades.forEach(function(element) {
            labelsToUse.push(""); //empty since the labels are displayed by the HTML
        });

        var ctx = document.getElementById(elementID).getContext('2d');

        var gradientStroke = ctx.createLinearGradient(0, 50, 0, 150);
        gradientStroke.addColorStop(0, startColor);
        gradientStroke.addColorStop(1, endColor);

        var barsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelsToUse,
                datasets: [{
                    data: grades,
                    backgroundColor: gradientStroke,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false,
                    /*labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }*/
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        gridLines : {
                            display: false,
                        },
                        barThickness: thickness,
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,

                            max: 5,
                            
                            //define labels
                            callback: function(value, index, values)
                            {
                                switch(value)
                                {
                                    case 0:
                                        return "";
                                    case 1:
                                        return yAxisLabels[0];
                                    case 2:
                                        return yAxisLabels[1];
                                    case 3:
                                        return yAxisLabels[2];
                                    case 4:
                                        return yAxisLabels[3];
                                    case 5:
                                        return yAxisLabels[4];
                                }
                            }
                        }
                    }]
                }
            }
        });
    }
})(window, window.document, window.jQuery);
