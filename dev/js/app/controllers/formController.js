angular.module('App.controllers')

.controller('FormController', ['FormFactory', function (FormFactory) {
    'use strict';

    var vm = this;
    vm.step = 0;
    vm.quantity = 0;
    vm.box = {
        'dimensions': {
            'width': 0,
            'height': 0,
            'length': 0
        },
        'cardboardGrade': '',
        'printQuality': '',
        'extras': null
    };
    vm.cardboardGradeRefObj = FormFactory.cardboardGradeRefObj;
    vm.printQualityRefObj = FormFactory.printQualityRefObj;
    vm.extrasRefObj = FormFactory.extrasRefObj;
    
    vm.surfaceArea = function (dimensions) {
        console.log('Surface Area = ' + FormFactory.calculateSurfaceArea(dimensions));
        return FormFactory.calculateSurfaceArea(dimensions);
    };

    vm.total = function (quantity, box) {
        return FormFactory.calculateTotal(quantity, box);
    };

    vm.next = function () {
        vm.step = vm.step + 1;
    };

    vm.prev = function () {
        vm.step = vm.step - 1;    
    };

    vm.go = function (step) {
        vm.step = step;
    };

    vm.validateDimensions = function () {
        if (vm.surfaceArea(vm.box.dimensions) > 2) {
            vm.tooLarge = true;
            if (vm.box.cardboardGrade === 'C') {
                vm.box.cardboardGrade = '';
            }
        } else {
            vm.tooLarge = false;
        }
    };

    vm.validateCardboardGrade = function () {
        if (vm.box.cardboardGrade !== 'A') {
            vm.unReinforcable = true;
            if (vm.box.extras.reinforcedBottom && vm.box.extras.reinforcedBottom === true) {
                vm.box.extras.reinforcedBottom = false;
            }
        } else {
            vm.unReinforcable = false;
        }
    };

    vm.validateExtras = function () {
        if (vm.box.extras) {
            if (vm.box.extras.handles === true || vm.box.extras.reinforcedBottom === true) {
                return true;
            } else {
                return false;
            }
        }
    };

}]);
