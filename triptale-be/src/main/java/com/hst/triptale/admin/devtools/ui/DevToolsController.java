package com.hst.triptale.admin.devtools.ui;

import com.hst.triptale.configuration.ApplicationConstants;
import com.hst.triptale.security.token.JwtAuthenticationTokenProvider;
import com.hst.triptale.security.token.model.UserAuthenticationToken;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * @author lyoupyo@gmail.com
 */
@Tag(name = "개발자 편의 기능 API", description = "개발자 편의용 기능 API")
@RequiredArgsConstructor
@RestController
@RequestMapping(ApplicationConstants.APIGroups.ADMIN_API + "/devtools")
public class DevToolsController {

    private final JwtAuthenticationTokenProvider jwtAuthenticationTokenProvider;

    @Operation(
            summary = "관리자용 토큰 발급",
            parameters = {
                    @Parameter(name = "no", description = "사용자 번호", in = ParameterIn.PATH)
            }
    )
    @GetMapping("/issueToken/{no}")
    public UserAuthenticationToken issueUserToken(@PathVariable Long no) {
        return jwtAuthenticationTokenProvider.issue(no);
    }

}
