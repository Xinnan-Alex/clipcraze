package com.github.alex.clipcraze.repository;

import com.github.alex.clipcraze.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {
}
