//package io.thoseguys.project.web;
//
//import io.thoseguys.project.payload.JWTLoginSucessReponse;
//import io.thoseguys.project.payload.LoginRequest;
//import io.thoseguys.project.security.JwtTokenProvider;
//import io.thoseguys.project.security.SecurityConstants;
//import io.thoseguys.project.services.AdminLoginService;
//import io.thoseguys.project.services.MapValidationErrorService;
//import io.thoseguys.project.services.UserService;
//import io.thoseguys.project.validator.UserValidator;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//
//@RestController
//@RequestMapping("/admin-login")
//@CrossOrigin
//public class AdminLoginController {
//
//    @Autowired
//    private MapValidationErrorService mapValidationErrorService;
//
//    @Autowired
//    private AdminLoginService adminLoginService;
//
//    @Autowired
//    private JwtTokenProvider tokenProvider;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
//
//        boolean isTrue = adminLoginService.findUsername(loginRequest);
//
//        if(!isTrue){
//            return ResponseEntity.status(401).body("incorrect username or password");
//        }
//
//        return ResponseEntity.ok(loginRequest.getUsername());
//    }
//}
