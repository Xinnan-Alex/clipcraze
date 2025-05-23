package com.github.alex.clipcraze.service;

import io.awspring.cloud.s3.S3Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectAclRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URL;
import java.util.UUID;

import static software.amazon.awssdk.services.s3.model.ObjectCannedACL.PUBLIC_READ;

@Service
@RequiredArgsConstructor
public class S3Service implements FileService {

    @Value("${bucketname}")
    private String bucketName;

    private final S3Client awsS3Client;

    @Override
    public String uploadFile(MultipartFile file) {
        // Upload file to AWS S3 Logic
        String filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String key = UUID.randomUUID().toString() + "." + filenameExtension;
        try {
            awsS3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getInputStream().available()));
        } catch (S3Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An exception occurred while uploading a file");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        awsS3Client.putObjectAcl(PutObjectAclRequest.builder()
                .bucket(bucketName)
                .key(key).acl(PUBLIC_READ)
                .build());

        URL url = awsS3Client.utilities().getUrl(request -> request.bucket(bucketName).key(key).build());
        return url.toString();
    }
}
