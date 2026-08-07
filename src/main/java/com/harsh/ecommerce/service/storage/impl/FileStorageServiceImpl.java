package com.harsh.ecommerce.service.storage.impl;

import com.harsh.ecommerce.service.storage.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class FileStorageServiceImpl implements FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String uploadFile(MultipartFile file) {
        try{
            Path uploadPath = Paths.get(uploadDir);

            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }

            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

            String extension = "";

            int index = originalFileName.lastIndexOf(".");

            if(index > 0){
                extension = originalFileName.substring(index);
            }
            String filename = UUID.randomUUID() + extension;
            Path filePath = uploadPath.resolve(filename);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return filename;


        } catch (IOException e) {
            throw new RuntimeException("Failed to Upload the file : ", e);
        }
    }
}
