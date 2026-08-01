package com.harsh.ecommerce.service;

import com.harsh.ecommerce.entity.Role;

import java.util.List;

public interface Roleservice {
    Role createRole(Role role);
    List<Role> getAllRoles();
}
