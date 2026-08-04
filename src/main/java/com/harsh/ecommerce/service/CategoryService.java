package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.request.CategoryRequest;
import com.harsh.ecommerce.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse updateCategory(long id, CategoryRequest request);

    void deleteCategoryById(Long id);
}
