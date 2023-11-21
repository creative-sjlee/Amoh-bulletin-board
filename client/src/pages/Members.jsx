import { useRef, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const idRef = useRef();
  const pwRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const userId = window.sessionStorage.getItem("id");
    if (!userId) navigate("/");
  },[navigate]);

  const handleMember = () => {
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const email = emailRef.current.value;

    if (!id) {
      alert("아이디를 입력하세요!!!");
      idRef.current.focus();
      return false;
    }
    if (!pw) {
      alert("패스워드를 입력하세요!!!");
      pwRef.current.focus();
      return false;
    }
    if (!email) {
      alert("이메일을 입력하세요!!!");
      emailRef.current.focus();
      return false;
    }

    const server_url = process.env.REACT_APP_SERVER_URL;
    const server_member_url = `${server_url}/member`;

    axios
      .post(server_member_url, {
        id,
        pw,
        email,
      })
      .then((res) => {
          alert("회원가입 성공!!!");
          navigate("/PostList");
      })
      .catch((e) => {
        alert("회원가입 실패!!!");
        console.error(e);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form className="border rounded p-4">
            <Form.Group controlId="formId">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디를 입력하세요"
                ref={idRef}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>패스워드</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                ref={pwRef}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="text"
                placeholder="이메일을 입력하세요"
                ref={emailRef}
              />
            </Form.Group>
            <Button variant="secondary" type="button" onClick={handleMember}>
              회원등록
            </Button>
          </Form>
          <Alert
            variant="danger"
            className="mt-3"
            style={{ display: "none", borderRadius: "0.25rem" }}
          >
            회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
