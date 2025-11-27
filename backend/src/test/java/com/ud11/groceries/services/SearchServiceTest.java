/*package com.ud11.groceries.services;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SearchServiceTest {

    @Test
    public void testPatternFound() {
        SearchRetriever service = new SearchRetriever();

        String text = "chocolate chip cookies";
        String pattern = "chip";

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        assertEquals(10, index, "Expected 'chip' to start at index 10");
    }

    @Test
    public void testPatternNotFound() {
        SearchRetriever service = new SearchRetriever();

        String text = "banana bread";
        String pattern = "orange";

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        assertEquals(-1, index, "Expected pattern not to be found");
    }

    @Test
    public void testExactMatch() {
        SearchRetriever service = new SearchRetriever();

        String text = "pancakes";
        String pattern = "pancakes";

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        assertEquals(0, index, "Pattern should match the entire string");
    }

    @Test
    public void testMatchAtBeginning() {
        SearchRetriever service = new SearchRetriever();

        String text = "apple pie";
        String pattern = "apple";

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        assertEquals(0, index, "Pattern 'apple' should start at index 0");
    }

    @Test
    public void testMatchAtEnd() {
        SearchRetriever service = new SearchRetriever();

        String text = "bread pudding";
        String pattern = "pudding";

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        assertEquals(6, index, "Pattern 'pudding' should start at index 6");
    }

    @Test
    public void testCaseSensitive() {
        SearchRetriever service = new SearchRetriever();

        String text = "Chocolate Chip Cookies";
        String pattern = "chip"; // lowercase, should not match

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        assertEquals(-1, index, "Search should be case-sensitive");
    }

    /*@Test
    public void testEmptyPattern() {
        SearchService service = new SearchService();

        String text = "test text";
        String pattern = "";

        int index = service.RabinKarpMethod(pattern.toCharArray(), text.toCharArray());
        // Depending on your design, could be -1 or 0; Rabin-Karp above would likely break, but let's check gracefully
        assertEquals(-1, index, "Empty pattern should not be found");
    }
}
*/