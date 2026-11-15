package com.harsh.ecommerce.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor

public class ProductImageServiceImpl implements ProductImageService {
private final ProductRepository productRepository;
private final ProductImageRepository productImageRepository;
private final FileStorageService fileStorageService;
private final Cloudinary cloudinary;

    @Override
    public void uploadImages(Long productId, List<MultipartFile> files) {
        Product product = productRepository.findById(productId).
                orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id: " + productId));


        for(MultipartFile file : files){

            try{
                Map<?,?> uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap(
                                "folder","novacart/products",
                                "resource_type","image"
                        )

                );
                String imageUrl = uploadResult.get("secure_url")
                        .toString();

                ProductImage image = ProductImage.builder()
                        .imageName(file.getOriginalFilename())
                        .imageType(file.getContentType())
                        .imageUrl(imageUrl)
                        .product(product)
                        .build();
                productImageRepository.save(image);

            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image to Cloudinary" + e.getMessage());
            }
        }
        }



}
