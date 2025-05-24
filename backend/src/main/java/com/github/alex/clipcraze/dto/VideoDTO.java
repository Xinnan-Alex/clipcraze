package com.github.alex.clipcraze.dto;

import com.github.alex.clipcraze.model.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDTO {
    private String id;
    private String title;
    private String description;
    private Set<String> tags;
    private String videoURL;
    private VideoStatus status;
    private String thumbnailURL;
}
