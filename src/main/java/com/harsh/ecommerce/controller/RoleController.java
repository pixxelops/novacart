package com.harsh.ecommerce.controller;


import com.harsh.ecommerce.entity.Role;
import com.harsh.ecommerce.service.Roleservice;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
    private final Roleservice roleService;

    @PostMapping
    public Role createRole(@RequestBody Role role){
        return roleService.createRole(role);
    }

    @GetMapping
    public List<Role> getAllRoles(){
        return roleService.getAllRoles();
    }


}
