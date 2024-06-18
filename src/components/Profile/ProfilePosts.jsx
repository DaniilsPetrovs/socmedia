import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostsActionCreator, removeAllPosts, removePost } from '../../redux/Posts/PostsReducer';
import avatar from '../../assets/images/auth/luxeWeb.png';
import styles from '../../styles/Profile/profileposts.module.css';
import image from '../../assets/images/profilePosts/pictures.svg';
import camera from '../../assets/images/profilePosts/video-camera.svg';
import heart from '../../assets/images/header/heart.svg';

export const ProfilePosts = () => {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = () => {
        const newPost = {
            text: message,
            image: selectedImage ? URL.createObjectURL(selectedImage) : null,
        };
        dispatch(PostsActionCreator(newPost));
        setMessage('');
        setSelectedImage(null);
    };

    const handleRemoveAllPosts = () => {
        dispatch(removeAllPosts());
    };

    const handleRemovePost = (index) => {
        dispatch(removePost(index));
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.postsContainer}>
            <div className={styles.header}>My Posts</div>
            <div className={styles.postCreator}>
                {selectedImage && (
                    <div className={styles.selectedImage}>
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        <button onClick={() => setSelectedImage(null)}>Remove image</button>
                    </div>
                )}
                <div className={styles.inputContainer}>
                    <textarea
                        className={styles.textarea}
                        onChange={handleMessage}
                        value={message}
                        placeholder="What's on your mind?"
                    ></textarea>
                    <div className={styles.icons}>
                        <img src={image} alt="Add Image" onClick={handleImageClick} />
                        <img src={camera} alt="Add Video" />
                    </div>
                </div>
                <div className={styles.actions}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        name="myImage"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
                    <button className={styles.removeButton} onClick={handleRemoveAllPosts}>Remove All</button>
                </div>
            </div>
            <div className={styles.postsList}>
                {posts.map((post, index) => (
                    <div key={index} className={styles.post}>
                        <div className={styles.postHeader}>
                            <img src={avatar} alt="Avatar" className={styles.avatar} />
                            <div className={styles.postInfo}>
                                <strong>Daniils</strong>
                                <p>{post.text}</p>
                            </div>
                        </div>
                        {post.image && (
                            <div className={styles.postImage}>
                                <img src={post.image} alt="Post" />
                            </div>
                        )}
                        <div className={styles.postActions}>
                            <div className={styles.likes}>
                                <img src={heart} alt="Like" />
                                <span>122 likes</span>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.editButton} onClick={() => handleRemovePost(index)}>Edit Post</button>
                                <button className={styles.deleteButton} onClick={() => handleRemovePost(index)}>Remove Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
