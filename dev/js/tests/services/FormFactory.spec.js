describe('Factory: FormFactory', function () {
    'use strict';

    var FormFactory;

    beforeEach(module('App'));
    beforeEach(module('App.services'));

    beforeEach(inject(function (_FormFactory_) {
        FormFactory = _FormFactory_;
    }));

    it('should exist', function () {
        expect(FormFactory).toBeDefined();
    });

    it('should have a method called "calculateSurfaceArea"', function () {
        expect(FormFactory.calculateSurfaceArea).toBeDefined();
        expect(typeof FormFactory.calculateSurfaceArea).toBe('function');
    });

    describe('Factory: FormFactory.calculateSurfaceArea(dimensions)', function () {

        it('should return a number', function () {
            var dimensions1x1x1 = {
                'width': 1,
                'height': 1,
                'length': 1
            };
            expect(typeof FormFactory.calculateSurfaceArea(dimensions1x1x1)).toBe('number');
        });

        it('should calculate the outside surface area of a box in cm', function () {
            var dimensions1x1x1 = {
                'width': 1,
                'height': 1,
                'length': 1
            },
            dimensions10x10x1 = {
                'width': 10,
                'height': 10,
                'length': 1
            };
            expect(FormFactory.calculateSurfaceArea(dimensions1x1x1)).toEqual(6);
            expect(FormFactory.calculateSurfaceArea(dimensions10x10x1)).toEqual(240);
        });

        it('should calculate the outside surface area of a small box in cm', function () {
            var dimensions = {
                'width': 0.1,
                'height': 0.1,
                'length': 0.1
            };
            expect(FormFactory.calculateSurfaceArea(dimensions)).toEqual(0.07);
        });

        it('should round up small numbers', function () {
            var dimensions = {
                'width': 0.01,
                'height': 0.01,
                'length': 0.01
            };
            expect(FormFactory.calculateSurfaceArea(dimensions)).toEqual(0.01);
        });

    });

    it('should have a method called "calculatePricePerBox"', function () {
        expect(FormFactory.calculatePricePerBox).toBeDefined();
        expect(typeof FormFactory.calculatePricePerBox).toBe('function');
    });

    describe('Factory: FormFactory.calculatePricePerBox(surfaceArea, cardboardGrade, printQuality, extras)', function () {

        it('should calculate the base price per box in pence', function () {
            expect(FormFactory.calculatePricePerBox(10, 'A', 'no-printing')).toBe(200);
            expect(FormFactory.calculatePricePerBox(10, 'B', 'no-printing')).toBe(100);
            expect(FormFactory.calculatePricePerBox(10, 'C', 'no-printing')).toBe(50);
        });

        it('should add printing cost based on surfaceArea', function () {
            expect(FormFactory.calculatePricePerBox(10, 'A', '3-color')).toBe(400);
            expect(FormFactory.calculatePricePerBox(10, 'B', '3-color')).toBe(300);
            expect(FormFactory.calculatePricePerBox(10, 'C', '3-color')).toBe(250);
            expect(FormFactory.calculatePricePerBox(10, 'A', '2-color')).toBe(300);
            expect(FormFactory.calculatePricePerBox(10, 'B', '2-color')).toBe(200);
            expect(FormFactory.calculatePricePerBox(10, 'C', '2-color')).toBe(150);
        });

        it('should add ten pence for handles', function () {
            expect(FormFactory.calculatePricePerBox(10, 'C', '2-color', {'handles': true})).toBe(160);
            expect(FormFactory.calculatePricePerBox(10, 'A', '3-color', {'handles': true})).toBe(410);
        });

        it('should add five pence for reinforced bottom', function () {
            expect(FormFactory.calculatePricePerBox(10, 'C', '2-color', {'reinforcedBottom': true})).toBe(155);
            expect(FormFactory.calculatePricePerBox(10, 'A', '3-color', {'reinforcedBottom': true})).toBe(405);
        });

        it('should add fifteen pence for reinforced bottom an handles', function () {
            expect(FormFactory.calculatePricePerBox(10, 'C', '2-color', {'handles': true, 'reinforcedBottom': true})).toBe(165);
            expect(FormFactory.calculatePricePerBox(10, 'A', '3-color', {'handles': true, 'reinforcedBottom': true})).toBe(415);
        });

    });

    describe('Factory: FormFactory.calculateTotal(quantity, box)', function () {

        var box;

        beforeEach(function () {
            box = {
                'dimensions': {
                    'width': 1,
                    'height': 1,
                    'length': 1
                },
                'cardboardGrade': 'A',
                'printQuality': 'no-printing',
                'extras': null
            };
        });

        it('should calculate the total price in pounds', function () {
            expect(FormFactory.calculateTotal(1, box)).toEqual(1.2);
            expect(FormFactory.calculateTotal(2, box)).toEqual(2.4);
            expect(FormFactory.calculateTotal(30, box)).toEqual(36);
        });

        it('should apply a 5% discount for FantasticBoxCo branding', function () {
            box.printQuality = 'FantasticBoxCo-branding';
            expect(FormFactory.calculateTotal(1, box)).toEqual(1.14);
            expect(FormFactory.calculateTotal(2, box)).toEqual(2.28);
            expect(FormFactory.calculateTotal(30, box)).toEqual(34.2);
        });

    });

});
