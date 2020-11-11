package com.hst.triptale.security.interceptor;

import com.hst.triptale.configuration.props.ProfileProps;
import com.hst.triptale.security.EnableProfiles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

// @Component
public class ProfileInteceptor extends HandlerInterceptorAdapter {

    private static final Logger logger = LoggerFactory.getLogger(ProfileInteceptor.class);

    private final ProfileProps profileProps;

    public ProfileInteceptor(ProfileProps profileProps) {
        this.profileProps = profileProps;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        EnableProfiles annotation = ((HandlerMethod)handler).getMethodAnnotation(EnableProfiles.class);
        boolean preHandleFlag = true;
        /*
        if (annotation != null) {
            String[] profileActives = annotation.profileActives();

            // @spring.profiles.active 체크
            if (profileActives.length > 0) {
                if (request.getRequestURI().contains("/issueToken/")) {
                    preHandleFlag = Arrays.stream(profileActives).anyMatch(profileProps.getActive()::equals);
                }

            }
        }
        */

        return preHandleFlag;
    }
}
