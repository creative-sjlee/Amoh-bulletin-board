import { useRef } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    const id = idRef.current.value;
    const pw = pwRef.current.value;

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

    const server_url = process.env.REACT_APP_SERVER_URL;
    const server_login_url = `${server_url}/login`;

    axios
      .post(server_login_url, { id, pw })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("id", id);
          navigate("/PostList");
        } else {
          alert("아이디, 패스워드가 정확하지 않습니다.");
          idRef.current.value = "";
          pwRef.current.value = "";
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("로그인 중 오류:", error);
        alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>패스워드</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                ref={pwRef}
                autoComplete="current-password"
              />
            </Form.Group>

            <Button variant="secondary" type="button" onClick={handleLogin}>
              로그인
            </Button>
          </Form>
          <Alert
            variant="danger"
            className="mt-3"
            style={{ display: "none", borderRadius: "0.25rem" }}
          >
            로그인에 실패했습니다. 잠시 후 다시 시도해주세요.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
