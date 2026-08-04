package com.harsh.ecommerce.mapper;


import com.harsh.ecommerce.dto.request.CategoryRequest;
import com.harsh.ecommerce.dto.response.CategoryResponse;
import com.harsh.ecommerce.entity.Category;

public class CategoryMapper {
    private CategoryMapper() {
    }

    public static Category toEntity(CategoryRequest request){
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    public static CategoryResponse toResponse(Category category){

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .build();
    }

}
