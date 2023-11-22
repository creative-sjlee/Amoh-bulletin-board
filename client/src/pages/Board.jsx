import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import PostListItem from "../component/PostListItem";

export default function Board() {
    const [posts, setPosts] = useState([]);
  
    const fetchPosts = useCallback(async () => {
      const server_url = process.env.REACT_APP_SERVER_URL;
      const server_posts_url = server_url + "/posts";
      try {
        const response = await axios.get(server_posts_url);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("기사를 가져올 수 없습니다.");
      }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]); // Run only once on component mount

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
                                    // Additional props or actions for each post item can be added here
                                    />
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Col>
                <Button variant="secondary" href="/Login">로그인</Button>
            </Col>
        </Container>
    );
}