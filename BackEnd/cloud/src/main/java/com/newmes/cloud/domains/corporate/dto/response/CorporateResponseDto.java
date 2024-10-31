package com.newmes.cloud.domains.corporate.dto.response;

import com.newmes.cloud.domains.corporate.domain.Corporate;
import com.newmes.cloud.domains.corporate.domain.Grade;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CorporateResponseDto {
    
    private Long id;
    private String comName;
    private Grade grade;
    private String key;
    private Long cxrCount = 0L;
    private Long capsuleCount = 0L;
    private Long medGuruCount = 0L;
    private Long totalCount = 0L;
    
    public static CorporateResponseDto from(Corporate corporate) {
        return CorporateResponseDto.builder()
                .id(corporate.getId())
                .comName(corporate.getComName())
                .grade(corporate.getGrade())
                .key(corporate.getKey())
                .cxrCount(corporate.getCxrCount())
                .capsuleCount(corporate.getCapsuleCount())
                .medGuruCount(corporate.getMedGuruCount())
                .totalCount(corporate.getTotalCount())
                .build();
    }
}
