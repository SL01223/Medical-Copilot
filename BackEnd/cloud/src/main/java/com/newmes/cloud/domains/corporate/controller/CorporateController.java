package com.newmes.cloud.domains.corporate.controller;

import com.newmes.cloud.domains.corporate.dto.request.CorporateRequestDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateListResponseDto;
import com.newmes.cloud.domains.corporate.dto.response.CorporateResponseDto;
import com.newmes.cloud.domains.corporate.service.CorporateService;
import com.newmes.cloud.global.util.HttpResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/corporate")
@Slf4j
public class CorporateController {

    private final CorporateService corporateService;
    private final HttpResponseUtil httpResponseUtil;

    @PostMapping
    public ResponseEntity<?> registerCorporate(@RequestBody CorporateRequestDto corporate) {
        CorporateResponseDto createdCorporate = corporateService.registerCorporate(corporate);
        return httpResponseUtil.createSuccessResponse(createdCorporate, "Corporate registered successfully");
    }

    @PutMapping("{corporateKey}")
    public ResponseEntity<?> updateCorporate(
            @PathVariable("corporateKey") String key,
            @RequestBody CorporateRequestDto corporate) {
        CorporateResponseDto updatedCorporate = corporateService.updateCorporate(key, corporate);
        return httpResponseUtil.createResponse(updatedCorporate);
    }

    @GetMapping
    public ResponseEntity<?> getAllCorporates() {
        List<CorporateListResponseDto> corporates = corporateService.getAllCorporates();
        return httpResponseUtil.createResponse(corporates);
    }

    @GetMapping("/{corporateKey}/init")
    public ResponseEntity<?> initCorporate(@PathVariable("corporateKey") String key) {
        CorporateResponseDto corporate = corporateService.init(key);
        return httpResponseUtil.createSuccessResponse("success", corporate);
    }

    @PatchMapping("/{corporateKey}/limit")
    public ResponseEntity<?> suspendCorporateKey(@PathVariable("corporateKey") String key) {
        boolean response = corporateService.suspendCorporateKey(key);
        return httpResponseUtil.createSuccessResponse("success", response);
    }

    @PatchMapping("/{corporateKey}/reissue")
    public ResponseEntity<?> reissueCorporateKey(@PathVariable("corporateKey") String key) {
        if(key.equals("none")) httpResponseUtil.createSuccessResponse("fail", "none Key");
        String response = corporateService.reissueCorporateKey(key);
        return httpResponseUtil.createSuccessResponse("success", response);
    }

    @DeleteMapping("/{corporateKey}/deleteKey")
    public ResponseEntity<?> deleteCorporateKey(@PathVariable("corporateKey") String key) {
        corporateService.deleteCorporateKey(key);
        return httpResponseUtil.createSuccessResponse("success", "none");
    }


}
