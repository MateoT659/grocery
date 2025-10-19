package com.ud11.groceries.controllers.Example;

import io.swagger.v3.oas.annotations.media.Schema;

public record PutResponseExampleClassDto(
        @Schema(required=true)
        boolean success,
        String message //note message is NOT required, and can be null
) {}
