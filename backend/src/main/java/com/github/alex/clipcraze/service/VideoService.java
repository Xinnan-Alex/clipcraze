package com.github.alex.clipcraze.service;

import com.github.alex.clipcraze.dto.UploadVideoResponse;
import com.github.alex.clipcraze.dto.VideoDTO;
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

    public UploadVideoResponse uploadVideo(MultipartFile file) {
        // Upload video to AWS S3
        // Save Data to DB
        String videoURL = s3Service.uploadFile(file);
        var video = new Video();
        video.setVideoUrl(videoURL);

        Video savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(
                savedVideo.getId(),
                savedVideo.getVideoUrl()
        );
    }

    public VideoDTO editVideo(VideoDTO videoDTO) {
        Video editedVideo = getVideoById(videoDTO.getId());

        editedVideo.setTitle(videoDTO.getTitle());
        editedVideo.setDescription(videoDTO.getDescription());
        editedVideo.setTags(videoDTO.getTags());
        editedVideo.setThumbnailUrl(videoDTO.getThumbnailURL());
        editedVideo.setVideoStatus(videoDTO.getStatus());

        videoRepository.save(editedVideo);

        return videoDTO;
    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        Video video = getVideoById(videoId);

        String thumbnailURL = s3Service.uploadFile(file);
        video.setThumbnailUrl(thumbnailURL);

        videoRepository.save(video);
        return thumbnailURL;
    }

    private Video getVideoById(String videoId) {
        return videoRepository
                .findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException(String.format("Cannot find video by id - %s", videoId)));
    }
}
