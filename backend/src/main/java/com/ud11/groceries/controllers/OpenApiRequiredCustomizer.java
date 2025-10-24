package com.ud11.groceries.controllers;

import io.swagger.v3.oas.models.OpenAPI;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiRequiredCustomizer {
    @Bean
    OpenApiCustomizer makePropertiesRequired(){
        return new OpenApiCustomizer() {
            @Override
            public void customise(OpenAPI openApi) {
                if(openApi.getComponents() == null || openApi.getComponents().getSchemas() == null){
                    return;
                }
                openApi.getComponents().getSchemas().forEach((name, schema) -> {
                    if(schema.getProperties() != null) {
                        schema.setRequired(schema.getProperties().keySet().stream().toList());
                    }
                });
            }
        };
    }
}
