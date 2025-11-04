package com.ud11.groceries.services;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Random;

/* RabinKarpMethod uses hashing to find a patter in a text.
 * A hash of patters is calculated.
 * Time complexity in worst-case scenario: O(m(n-m+1)) & on average: O(n+m)
 * I do not know how effective it will be*/


@Service
public class SearchService {
    public  int RabinKarpMethod(char[] pattern, char[] text) {
        //length of the arrays
        int patternSize = pattern.length;
        int textSize = text.length;

        //using prime number for fewer hash collision
        long prime = getBiggerPrime(patternSize);

        //precompute r=> later used to remove the left most char from the current window hash
        long r = 1;
        for (int i = 0; i < patternSize - 1; i++) {
            r *= 2;
            r = r % prime;
        }
        //create hash arrays
        long[] t = new long[textSize];
        t[0] = 0;

        long pfinger = 0;   //pattern's hash

        //build the first window hash and pattern hash
        for (int j = 0; j < patternSize; j++) {
            t[0] = (2 * t[0] + text[j]) % prime;
            pfinger = (2 * pfinger + pattern[j]) % prime;
        }

        int i = 0;
        boolean passed = false;

        int diff = textSize - patternSize;
        for (i = 0; i <= diff; i++) {
            // If fingerprints match, do a real character check
            if (t[i] == pfinger) {
                passed = true;
                for (int k = 0; k < patternSize; k++) {
                    if (text[i + k] != pattern[k]) {
                        passed = false;
                        break;
                    }
                }

                if (passed) { //found the match
                    return i;
                }
            }
            //Prepare the hash for the next window (rolling hash)
            if (i < diff) {
                long value = 2 * (t[i] - r * text[i]) + text[i + patternSize];
                t[i + 1] = ((value % prime) + prime) % prime;
            }
        }
        return -1; //not found match

    }

    //choose a prime with bits+1 length
    private long getBiggerPrime(int m) {
        BigInteger prime = BigInteger.probablePrime(getNumberOfBits(m) + 1, new Random());
        return prime.longValue();
    }

    private int getNumberOfBits(int number) {
        return Integer.SIZE - Integer.numberOfLeadingZeros(number);
    }
}