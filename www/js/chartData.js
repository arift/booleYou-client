 
  var $scope = angular.element($("#dataVisual")).scope();
  var chartWidth = $("#dataVisual").width() - 40;
  var chartHeight = $('ion-content').height() - 120;
   $('.popup').css('width',400);
   $('.popup').css('height',600);

  console.log(chartWidth);
  var pie = new d3pie("pie", {
    "header": {
      "title": {
        "text": "#" + $scope.hashtag.hashtag,
        "fontSize": 24,
        "font": "open sans"
      },
      "titleSubtitlePadding": 5
    },
    "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
    },
    "size": {
      "canvasHeight":300,
      "canvasWidth": 350,
      "pieInnerRadius": "20%",
      "pieOuterRadius": "90%"
    },
    "data": {
      "sortOrder": "label-desc",
      "content": [
      {
        "label": "1",
        "value": $scope.hashtag.ones,
        "color": "#a577b7"
      },
      {
        "label": "0",
        "value": $scope.hashtag.zeros,
        "color": "#9177b4"
      }
      ]
    },
    "labels": {
      "outer": {
        "pieDistance": 17
      },
      "inner": {
        "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
        "color": "#524a53",
        "fontSize": 20
      },
      "percentage": {
        "color": "#ffffff",
        "decimalPlaces": 0,
        fontSize: 20
      },
      "value": {
        "color": "#adadad",
        "fontSize": 11
      },
      "lines": {
        "enabled": true
      }
    },
    "footer": {
      "text": "booleOuts: " + $scope.hashtag.totalbits,
      "color": "#999999",
      "fontSize": 18,
      "font": "open sans",
      "location": "bottom-center"
    },
    "effects": {
      "pullOutSegmentOnClick": {
        "effect": "back",
        "speed": 400,
        "size": 8
      }
    },
    "misc": {
      "gradient": {
        "enabled": true,
        "percentage": 100
      }
    },
    "callbacks": {
      "onMouseoutSegment": null,
      "onClickSegment": null
    }
  });