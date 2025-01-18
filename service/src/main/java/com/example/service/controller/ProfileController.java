package com.example.service.controller;
import com.example.service.service.ProfileServices;
import com.example.service.service.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")

public class ProfileController {
    private final ProfileServices profileServices;

    @GetMapping("/{idOrMe}")
    public ResponseEntity<UserProfileResponse> getProfile(@PathVariable String idOrMe) {
        var id = getId(idOrMe);

        var profile = profileServices.getUserProfile(id);
        return ResponseEntity.ok().body(profile);
    }

    private Long getId(String idOrMe) {
        if (idOrMe.equals("me")) {
            return SecurityUtils.getCurrentUserId();
        }
        return Long.parseLong(idOrMe);

    }
    @PostMapping("/add")
    public ResponseEntity<ExpendAddResponse> addExpend(@RequestBody @Valid ExpendAddRequest expendAddRequest) {
        var reponse = profileServices.addExpend(expendAddRequest);
        return ResponseEntity.ok(reponse);
    }
    @DeleteMapping("/remove")
    public ResponseEntity<ExpendRemoveResponse> removeExpend(@RequestBody @Valid ExpendRemoveRequest expendRemoveRequest) {
        var reponse = profileServices.removeExpend(expendRemoveRequest);
        return ResponseEntity.ok(reponse);
    }
    /*@PostMapping("/favorite")
    public ResponseEntity<FavoriteResponse> addFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        var response = profileServices.addFavoriteBeats(favoriteRequest);
        return ResponseEntity.ok(response);
    }*/
    /*@DeleteMapping("/removeFavorite")
    public ResponseEntity<FavoriteResponse> removeFavorite(@RequestBody FavoriteRequest favoriteRequest) {
        var response = profileServices.removeFavoriteBeat(favoriteRequest);
        return ResponseEntity.ok(response);
    }*/
    /*@GetMapping("/favorite/all")
    public ResponseEntity<List<UserProfileResponse>> getFavorite() {
        var profile = profileServices.getFavorite();
        return ResponseEntity.ok().body(profile);
    }*/

    /*@PostMapping("/sendMessage")
    public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody MessageRequest messageRequest) {
        var response = profileServices.sendMessage(messageRequest);
        return ResponseEntity.ok(response);
    }*/
}