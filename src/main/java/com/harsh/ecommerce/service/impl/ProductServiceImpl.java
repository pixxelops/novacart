package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.dto.request.ProductRequest;
import com.harsh.ecommerce.dto.response.PageResponse;
import com.harsh.ecommerce.dto.response.ProductResponse;
import com.harsh.ecommerce.entity.Category;
import com.harsh.ecommerce.entity.Product;
import com.harsh.ecommerce.exception.ResourceNotFoundException;
import com.harsh.ecommerce.mapper.ProductMapper;
import com.harsh.ecommerce.repository.CategoryRepository;
import com.harsh.ecommerce.repository.ProductRepository;
import com.harsh.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        Product product = ProductMapper.toEntity(request);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        return ProductMapper.toResponse(savedProduct);

    }

    @Override
    public PageResponse<ProductResponse> getAllProducts(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page,size,sort);

        Page<Product> productPage = productRepository.findAll(pageable);

        List<ProductResponse>products = productPage.getContent()
                .stream()
                .map(ProductMapper::toResponse)
                .toList();


        return PageResponse.<ProductResponse>builder()
                .content(products)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();

    }


    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return ProductMapper.toResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));


        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setBrand(request.getBrand());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setDiscountPercentage(request.getDiscountPercentage());
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);

        return ProductMapper.toResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);

    }

    @Override
    public PageResponse<ProductResponse> searchProducts(
            String keyword,
            int page,
            int size) {
        Pageable pageable = PageRequest.of(page,size);

        Page<Product>productPage = productRepository
                .findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
                        keyword,
                        keyword,
                        pageable
                );

        List<ProductResponse>products = productPage.getContent()
                .stream()
                .map(ProductMapper::toResponse)
                .toList();

        return PageResponse.<ProductResponse>builder()
                .content(products)
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();

    }
}
