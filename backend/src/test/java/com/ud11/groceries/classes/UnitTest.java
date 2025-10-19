package com.ud11.groceries.classes;


import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UnitTest {
    public static final double DELTA = 1e-3;

    @Test
    public void testConversion() {
        double grams = 1000.0;
        double kilograms = Unit.convert(grams, Unit.GRAM, Unit.KILOGRAM);
        assertEquals(kilograms, 1.0, DELTA);

        double ounces = Unit.convert(grams, Unit.GRAM, Unit.OUNCE);
        assertEquals(ounces, 35.274, DELTA);

        double pounds = Unit.convert(grams, Unit.GRAM, Unit.POUND);
        assertEquals(pounds, 2.20462, DELTA);

        double milliliters = 1000.0;
        double liters = Unit.convert(milliliters, Unit.MILLILITER, Unit.LITER);
        assertEquals(liters, 1.0, DELTA);

        double cups = Unit.convert(milliliters, Unit.MILLILITER, Unit.CUP);
        assertEquals(cups, 4.22675, DELTA);

        double tablespoons = Unit.convert(milliliters, Unit.MILLILITER, Unit.TABLESPOON);
        assertEquals(tablespoons, 67.628, DELTA);

        double teaspoons = Unit.convert(milliliters, Unit.MILLILITER, Unit.TEASPOON);
        assertEquals(teaspoons, 202.884, DELTA);
    }

    @Test
    public void testInverseConversions() {
        double testAmount = 15.65;
        Unit[] weightUnits = {Unit.GRAM, Unit.KILOGRAM, Unit.OUNCE, Unit.POUND};

        for (Unit from : weightUnits) {
            for (Unit to : weightUnits) {
                double converted = Unit.convert(testAmount, from, to);
                double backConverted = Unit.convert(converted, to, from);
                assertEquals(testAmount, backConverted, DELTA, "Failed conversion from " + from + " to " + to);
            }
        }

        Unit[] volumeUnits = {Unit.MILLILITER, Unit.LITER, Unit.CUP, Unit.TABLESPOON, Unit.TEASPOON};

        for (Unit from : volumeUnits) {
            for (Unit to : volumeUnits) {
                double converted = Unit.convert(testAmount, from, to);
                double backConverted = Unit.convert(converted, to, from);
                assertEquals(testAmount, backConverted, DELTA, "Failed conversion from " + from + " to " + to);
            }
        }

    }
    @Test
    public void testSameUnitConversion() {
        double amount = 500.0;
        for (Unit unit : Unit.values()) {
            double converted = Unit.convert(amount, unit, unit);
            assertEquals(amount, converted, DELTA, "Conversion failed for same unit: " + unit);
        }
    }

    @Test
    public void testInvalidConversion() {
        assertEquals(Unit.convert(100.0, Unit.GRAM, Unit.LITER), -1);
    }
}
