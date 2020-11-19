package com.hst.triptale.system.devtools.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.security.token.AuthenticationTokenProvider;
import com.hst.triptale.security.token.model.UserAuthenticationToken;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * @author lyoupyo@gmail.com
 */
@Tag(name = "개발자 편의 기능 API", description = "개발자 편의용 기능 API")
@RequiredArgsConstructor
@RestController
@RequestMapping(ApplicationConstants.APIGroups.SYSTEM_API + "/devtools")
public class DevToolsController {

    private final AuthenticationTokenProvider authenticationTokenProvider;

    @Operation(summary = "관리자용 토큰 발급", parameters = {
        @Parameter(name = "userNo", description = "사용자 번호", in = ParameterIn.PATH)
    })
    @GetMapping("/issue-token/{userNo}")
    public UserAuthenticationToken issueToken(@PathVariable Long userNo) {
        return authenticationTokenProvider.issue(userNo);
    }

}
