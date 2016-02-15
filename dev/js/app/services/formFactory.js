angular.module('App.services')

.factory('FormFactory', function FormFactory() {
    'use strict';

    var cardboardGradeRefObj = {
        'A': {
            'text': 'A Grade',
            'price': 20
        },
        'B': {
            'text': 'B Grade',
            'price': 10
        },
        'C': {
            'text': 'C Grade',
            'price': 5
        }
    },

    printQualityRefObj = {
        '3-color': {
            'text': '3 colours',
            'price': 20
        },
        '2-color': {
            'text': '2 colours',
            'price': 10
        },
        'black-only': {
            'text': 'Black only',
            'price': 5
        },
        'no-printing': {
            'text': 'No printing',
            'price': 0
        
        },
        'FantasticBoxCo-branding': {
            'text': 'FantasticBoxCo branding',
            'price': 0
        }
    },

    extrasRefObj = {
        'handles': {
            'text': 'Handles',
            'price': 10
        },
        'reinforcedBottom': {
            'text': 'Reinforced bottom',
            'price': 5
        }
    },

    calculateSurfaceArea = function (dimensions) {
        if (dimensions.width === 0 || dimensions.height === 0 || dimensions.length === 0) {
            return 0;
        } else {
            var sides = (dimensions.width * dimensions.height) * 2,
                ends = (dimensions.height * dimensions.length) * 2,
                topBottom = (dimensions.length * dimensions.width) * 2,
                surfaceArea = sides + ends + topBottom;
            return Math.ceil(surfaceArea * 1e2) / 1e2;
        }
    },

    calculatePricePerBox = function (surfaceArea, cardboardGrade, printQuality, extras) {
        var pricePerBoxInPence;

        // Basic box cost
        pricePerBoxInPence = surfaceArea * cardboardGradeRefObj[cardboardGrade].price;

        // Add printing costs
        pricePerBoxInPence = pricePerBoxInPence + (surfaceArea * printQualityRefObj[printQuality].price);        

        // Add handles
        if (extras && extras.handles) {
            pricePerBoxInPence = pricePerBoxInPence  + extrasRefObj.handles.price;
        } 

        // Add reinforcedBottom
        if (extras && extras.reinforcedBottom) {
            pricePerBoxInPence = pricePerBoxInPence + extrasRefObj.reinforcedBottom.price;           
        }

        return pricePerBoxInPence;
    },

    calculateTotal = function (quantity, box) {
        var total = 0;
        if (quantity > 0 && box.dimensions.width > 0 && box.dimensions.height > 0 && box.dimensions.length > 0 && box.cardboardGrade !== '' && box.printQuality !== '') {
            total = quantity * calculatePricePerBox(calculateSurfaceArea(box.dimensions), box.cardboardGrade, box.printQuality, box.extras);
            if (box.printQuality === 'FantasticBoxCo-branding') {
                // Add 5% discount to total
                total = total * 0.95;
            }
        }
        return total / 100;
    };

    return {
        calculateSurfaceArea: calculateSurfaceArea,
        calculatePricePerBox: calculatePricePerBox,
        calculateTotal: calculateTotal,
        cardboardGradeRefObj: cardboardGradeRefObj,
        printQualityRefObj: printQualityRefObj,
        extrasRefObj : extrasRefObj
    };

});
