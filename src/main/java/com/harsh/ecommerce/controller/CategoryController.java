package com.harsh.ecommerce.controller;

import com.harsh.ecommerce.dto.request.CategoryRequest;
import com.harsh.ecommerce.dto.response.CategoryResponse;
import com.harsh.ecommerce.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;


    @PostMapping
    public CategoryResponse createCategory(
            @Valid @RequestBody CategoryRequest categoryRequest
    ) {
        return categoryService.createCategory(categoryRequest);
    }

    @GetMapping
    public List<CategoryResponse>getAllCategories() {
        return categoryService.getAllCategories();
    }
    @GetMapping("/{id}")
    public CategoryResponse getCategoryById(
            @PathVariable Long id) {

        return categoryService.getCategoryById(id);
    }


    @PutMapping("/{id}")
    public CategoryResponse updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest categoryRequest
    ){
        return categoryService.updateCategory(id,categoryRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(
            @PathVariable Long id
    ){
        categoryService.deleteCategoryById(id);
    }
}
