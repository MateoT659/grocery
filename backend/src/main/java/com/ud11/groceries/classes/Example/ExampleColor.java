package com.ud11.groceries.classes.Example;

import io.swagger.v3.oas.annotations.media.Schema;

public record ExampleColor (
        @Schema(required=true)
        int red,
        @Schema(required=true)
        int green,
        @Schema(required=true)
        int blue
){}




