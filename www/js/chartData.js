  var $scope = angular.element("#test").scope();
  var pie = new d3pie("pie", {
    "header": {
      "title": {
        "text": "#" + $scope.booleOut,
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
      "canvasHeight": 400,
      "canvasWidth": 400,
      "pieInnerRadius": "20%",
      "pieOuterRadius": "90%"
    },
    "data": {
      "sortOrder": "label-desc",
      "content": [
      {
        "label": "1",
        "value": 36344,
        "color": "#a577b7"
      },
      {
        "label": "0",
        "value": 32170,
        "color": "#9177b4"
      },
      {
        "label": "",
        "value": null,
        "color": "#efefef"
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
      "text": "booleOuts: 154",
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