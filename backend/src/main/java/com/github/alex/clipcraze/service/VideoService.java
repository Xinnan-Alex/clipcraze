package com.github.alex.clipcraze.service;

import com.github.alex.clipcraze.model.Video;
import com.github.alex.clipcraze.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public void uploadVideo(MultipartFile file) {
        // Upload video to AWS S3
        // Save Data to DB
        String videoURL = s3Service.uploadFile(file);
        var video = new Video();
        video.setVideoUrl(videoURL);

        videoRepository.save(video);
    }
}
