package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.entity.Product;
import com.harsh.ecommerce.entity.ProductImage;
import com.harsh.ecommerce.exception.ResourceNotFoundException;
import com.harsh.ecommerce.repository.ProductImageRepository;
import com.harsh.ecommerce.repository.ProductRepository;
import com.harsh.ecommerce.service.ProductImageService;
import com.harsh.ecommerce.service.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
@RequiredArgsConstructor

public class ProductImageServiceImpl implements ProductImageService {
private final ProductRepository productRepository;
private final ProductImageRepository productImageRepository;
private final FileStorageService fileStorageService;

    @Override
    public void uploadImages(Long productId, List<MultipartFile> files) {
        Product product = productRepository.findById(productId).
                orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id: " + productId));


        for(MultipartFile file : files){
            String fileName = fileStorageService.uploadFile(file);

            ProductImage image = ProductImage.builder()
                    .imageName(fileName)
                    .imageType(file.getContentType())
                    .imageUrl("/uploads/" + fileName)
                    .product(product)
                    .build();

            productImageRepository.save(image);


        }



    }
}
