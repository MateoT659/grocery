package controllers.User;
import com.ud11.groceries.classes.ExampleUser;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;

public record GetUserClassDto(
    String firstName,
    String lastName,
    String username,
    String password,
    ArrayList allergiesList,
    ArrayList dietsList
) {}