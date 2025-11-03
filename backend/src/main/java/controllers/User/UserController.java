package controllers.User;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/example-api")
@CrossOrigin(origins = "http://localhost:8081") // react native host
public class UserController {
    @Autowired
    private ObjectMapper objectMapper;

    private static String EXAMPLE_JSON_PATH = "src/main/java/com/ud11/groceries/data/Example/UserClass.json";


}
