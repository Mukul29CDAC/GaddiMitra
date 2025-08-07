package com.cdac.gaaddimitra.servicesimpl;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.gaaddimitra.entities.Customer;
import com.cdac.gaaddimitra.entities.Dealer;
import com.cdac.gaaddimitra.entities.ServiceCenter;
import com.cdac.gaaddimitra.entities.Users;
import com.cdac.gaaddimitra.entitiesDTO.AuthRequest;
import com.cdac.gaaddimitra.entitiesDTO.AuthResponse;
import com.cdac.gaaddimitra.entitiesDTO.UserDto;
import com.cdac.gaaddimitra.repository.CustomerRepo;
import com.cdac.gaaddimitra.repository.DealerRepo;
import com.cdac.gaaddimitra.repository.ServiceCenterRepo;
import com.cdac.gaaddimitra.repository.UserRepository;
import com.cdac.gaaddimitra.security.MyUserDetailsService;
import com.cdac.gaaddimitra.utility.JwtTokenUtil;

@Service
public class UserServiceImpl {

    @Autowired
    private UserRepository repoUser;

    @Autowired
    private ServiceCenterRepo repoService;

    @Autowired
    private CustomerRepo repoCustomer;

    @Autowired
    private DealerRepo repoDealer;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ LOGIN
    public AuthResponse login(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
            Users user = userDetailsService.loadUserDetails(authRequest.getEmail());
            String jwt = jwtUtil.generateToken(userDetails);

            return new AuthResponse(jwt, user.getRole(), user.getEmail(), user.getName(), user.getUserid());

        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid credentials for email: " + authRequest.getEmail());
        } catch (Exception e) {
            throw new RuntimeException("Login failed due to: " + e.getMessage());
        }
    }

    // ✅ REGISTER
    public void register(UserDto obj) {
        Users user = new Users();
        BeanUtils.copyProperties(obj, user);
        user.setPassword(passwordEncoder.encode(obj.getPassword())); // Secure password encoding

        switch (obj.getRole().toLowerCase()) {
            case "servicecenter":
                ServiceCenter serviceCenter = new ServiceCenter();
                BeanUtils.copyProperties(obj, serviceCenter);
                serviceCenter.setPassword(user.getPassword());
                repoService.save(serviceCenter);
                break;

            case "customer":
                Customer customer = new Customer();
                BeanUtils.copyProperties(obj, customer);
                customer.setPassword(user.getPassword());
                repoCustomer.save(customer);
                break;

            case "dealer":
                Dealer dealer = new Dealer();
                BeanUtils.copyProperties(obj, dealer);
                dealer.setPassword(user.getPassword());
                repoDealer.save(dealer);
                break;

            default:
                repoUser.save(user); // Fallback in case role doesn't match
                break;
        }
    }
}
