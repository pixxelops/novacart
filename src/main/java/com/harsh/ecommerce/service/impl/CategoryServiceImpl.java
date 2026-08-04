package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.dto.request.CategoryRequest;
import com.harsh.ecommerce.dto.response.CategoryResponse;
import com.harsh.ecommerce.entity.Category;
import com.harsh.ecommerce.exception.ResourceAlreadyExistsException;
import com.harsh.ecommerce.exception.ResourceNotFoundException;
import com.harsh.ecommerce.mapper.CategoryMapper;
import com.harsh.ecommerce.repository.CategoryRepository;
import com.harsh.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        if(categoryRepository.existsByName(request.getName())){
            throw new ResourceAlreadyExistsException("Category already exists");
        }
        Category category = CategoryMapper.toEntity(request);

        Category savedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(savedCategory);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("Category not found"));
        return CategoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse updateCategory(long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("Category not found"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(updatedCategory);
    }

    @Override
    public void deleteCategoryById(Long id) {
Category category = categoryRepository.findById(id)
        .orElseThrow(()->new ResourceNotFoundException("Category not found"));

categoryRepository.delete(category);
    }


}
