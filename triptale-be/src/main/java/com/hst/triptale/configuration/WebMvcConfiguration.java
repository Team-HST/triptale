//package com.hst.triptale.configuration;
//
//import com.hst.triptale.configuration.props.ApplicationProps;
//import com.hst.triptale.configuration.props.ProfileProps;
//import com.hst.triptale.security.interceptor.ProfileInteceptor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@RequiredArgsConstructor
//@Configuration
////@EnableWebMvc
//public class WebMvcConfiguration implements WebMvcConfigurer {
//
//    private final ProfileProps profileProps;
//    private final ApplicationProps applicationProps;
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new ProfileInteceptor(profileProps))
//                .excludePathPatterns(applicationProps.getSecurity().getPublicPaths());
//    }
//}
