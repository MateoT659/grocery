package com.ud11.groceries.classes;

import lombok.Getter;

import java.util.Map;

@Getter
public enum Unit {
    //common units of measurement and their shorthand display names.
    GRAM("g", Type.WEIGHT),
    KILOGRAM("kg", Type.WEIGHT),

    OUNCE("oz", Type.WEIGHT),
    POUND("lb", Type.WEIGHT),

    MILLILITER("mL", Type.VOLUME),
    LITER("L", Type.VOLUME),

    TEASPOON("tsp", Type.VOLUME),
    TABLESPOON("tbsp", Type.VOLUME),
    CUP("cup", Type.VOLUME);

    public enum Type {
        WEIGHT,
        VOLUME
    }

    private Unit(String displayUnit, Type type) {
        this.type = type;
        this.displayUnit = displayUnit;
    }

    private final String displayUnit;
    private final Type type;

    public static Map<Unit, Map<Unit, Float>> conversionFactors = Map.of(
        GRAM, Map.of(KILOGRAM, 0.001f, OUNCE, 0.035274f, POUND, 0.00220462f),
        KILOGRAM, Map.of(GRAM, 1000f, OUNCE, 35.274f, POUND, 2.20462f),
        OUNCE, Map.of(GRAM, 28.3495f, KILOGRAM, 0.0283495f, POUND, 0.0625f),
        POUND, Map.of(GRAM, 453.593f, KILOGRAM, 0.453593f, OUNCE, 16f),
        MILLILITER, Map.of(LITER, 0.001f, CUP, 0.00422676f, TABLESPOON, 0.067628f, TEASPOON, 0.202884f),
        LITER, Map.of(MILLILITER, 1000f, CUP, 4.22675f, TABLESPOON, 67.628f, TEASPOON, 202.884f),
        TEASPOON, Map.of(TABLESPOON, 0.333333f, CUP, 0.0208333f, MILLILITER, 4.92892f, LITER, 0.00492892f),
        TABLESPOON, Map.of(TEASPOON, 3f, CUP, 0.0625f, MILLILITER, 14.7868f, LITER, 0.0147868f),
        CUP, Map.of(TEASPOON, 48f, TABLESPOON, 16f, MILLILITER, 236.588f, LITER, 0.236588f)
    );

    //conversion function for converting from one unit to another
    public static double convert(double amount, Unit from, Unit to) {;
        if (from == to) {
            // no conversion needed
            return amount;
        }
        if (from.type != to.type) {
            // cannot convert between volume and weight
            return -1;
        }
        //convert using map
        float factor = conversionFactors.get(from).get(to);
        return amount * factor;
    }

    public static double convert(double amount, Unit from, Unit to, double density) {
        //density is in grams per milliliter (g/mL)

        if (from.type == to.type) {
            return convert(amount, from, to);
        }

        if(density <= 0) {
            return -1; // invalid density
        }

        if (from.type == Type.WEIGHT && to.type == Type.VOLUME) {
            // weight to volume: [from] -> g -> mL -> [to]
            double volumeInMl = convert(amount, from, Unit.GRAM) / density; // in mL
            return convert(volumeInMl, Unit.MILLILITER, to);
        } else if (from.type == Type.VOLUME && to.type == Type.WEIGHT) {
            // volume to weight: [from] -> mL -> g -> [to]
            double volumeInGrams = convert(amount, from, Unit.MILLILITER) * density; // in mL
            return convert(volumeInGrams, Unit.GRAM, to);
        } else {
            return -1; // invalid conversion
        }
    }

}
