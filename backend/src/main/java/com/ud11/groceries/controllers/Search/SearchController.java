package com.ud11.groceries.controllers.Services;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import com.ud11.groceries.services.SearchService;

/* I created this controller for the search function. Not sure how effective I did it. needs more work.*/

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @GetMapping("/find")
    public int findPattern(@RequestParam String text, @RequestParam String pattern) {
        // Ask the SearchService to do the work
        return searchService.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
    }
}
