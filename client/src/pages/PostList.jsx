// PostList.js
import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostListItem from "../component/PostListItem";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_posts_url = server_url + "/posts";

  const fetchPosts = useCallback(async () => {
    const server_url2 = process.env.REACT_APP_SERVER_URL;
    const server_posts_url2 = server_url2 + "/posts";
    try {
      const response = await axios.get(server_posts_url2);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("기사를 가져올 수 없습니다.");
    }
  }, []);
  
  useEffect(() => {
    const userId = window.sessionStorage.getItem("id");
    if (!userId) navigate("/");
    fetchPosts();
    setSelectedPost(selectedPost);
    fileInputRef.current.value = null;
  }, [navigate, selectedPost, fetchPosts]);

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((image, index) => {
      formData.append(`images${index + 1}`, image);
    });

    try {
      await axios.post(server_posts_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPosts();
      setTitle("");
      setContent("");
      setImages([]);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error creating post:", error);
      alert("기사를 등록할 수 없습니다.");
    }
  };

  const handleUpdatePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((image, index) => {
      formData.append(`images${index + 1}`, image);
    });

    try {
      await axios.put(
        `${server_posts_url}/${selectedPost.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchPosts();
      setSelectedPost(null);
      setTitle("");
      setContent("");
      setImages([]);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("기사를 업데이트 할 수 없습니다.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${server_posts_url}/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("기사를 지울 수 없습니다.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 3) {
      alert(
        "최대 3개의 이미지를 선택할 수 있습니다. \n3개의 이미지가 선택 되었습니다."
      );
      const slicedImages = selectedImages.slice(0, 3);
      setImages(slicedImages);
    } else setImages(selectedImages);
  };

  const handleSelectUpdate = (post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setContent(post.content);
    fileInputRef.current.value = null;
    alert("이미지는 로컬에 있는 정보이기에 리셋되었습니다. 재등록 해주세요.");
    setImages([]);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem("id");
    navigate("/");
  };
  return (
    <Container className="post-list-container">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2 className="mb-4">Post List</h2>
              <ul className="list-group list-group-flush">
                {posts.map((post) => (
                  <PostListItem
                    key={post.id}
                    post={post}
                    onUpdate={() => handleSelectUpdate(post)}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ maxWidth: "100%" }}>
            <Card.Body>
              <h2 className="mb-4">
                {selectedPost ? "Update" : "Create"} a Post
              </h2>
              <Form>
                <Form.Group controlId="postTitle">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="postContent">
                  <Form.Control
                    as="textarea"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="postImage">
                  <Form.Control
                    type="file"
                    // id="fileInput"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </Form.Group>
                {selectedPost ? (
                  <Button variant="outline-secondary" onClick={handleUpdatePost}>
                    Update Post
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={handleCreatePost}>
                    Create Post
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Button variant="secondary" href="/Members">회원추가</Button>
          <Button variant="secondary" onClick={() => setSelectedPost(null)}>글 작성하기</Button>
          <Button variant="secondary" onClick={handleLogout}>로그아웃</Button>
        </Col>
      </Row>
    </Container>
  );
}
