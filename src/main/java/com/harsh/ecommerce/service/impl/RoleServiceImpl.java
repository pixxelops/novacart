package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.entity.Role;
import com.harsh.ecommerce.repository.RoleRepository;
import com.harsh.ecommerce.service.Roleservice;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements Roleservice {

    private final RoleRepository roleRepository;

    @Override
    public Role createRole(Role role) {
       return roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
