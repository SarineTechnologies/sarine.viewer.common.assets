(function (window, document, $)
{
    'use strict';

    window.showLightBars = function(elementID, grades, color, borderColor, thickness)
    {
        //using http://www.chartjs.org/

        var ctx = document.getElementById(elementID).getContext('2d');
        var barsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['', '', '', ''], //empty since the labels are displayed by the HTML
                datasets: [{
                    data: grades,
                    backgroundColor: color,
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
                                        return "Minimum";
                                    case 2:
                                        return "Standard";
                                    case 3:
                                        return "High";
                                    case 4:
                                        return "Very High";
                                    case 5:
                                        return "Exceptional";
                                }
                            }
                        }
                    }]
                }
            }
        });
    }
})(window, window.document, window.jQuery);
