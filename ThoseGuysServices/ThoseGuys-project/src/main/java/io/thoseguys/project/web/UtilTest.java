package io.thoseguys.project.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UtilTest {

    @GetMapping("/hello")
    public String getMessage(){
        return "hello";
    }
}
