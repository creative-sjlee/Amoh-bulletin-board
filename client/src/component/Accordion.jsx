import React, { useState, useRef, useEffect } from "react";
import { Card, Button, Accordion as BootstrapAccordion } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import "./Button.css";

export default function Accordion({
  title,
  content,
  images,
  onUpdate,
  onDelete,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_uploads_url = server_url + "/uploads";
  const accordionRef = useRef(null);

  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  useEffect(() => {
    if (isExpanded && accordionRef.current) {
      accordionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isExpanded]);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <button
        className="custom-btn btn-15"
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <BootstrapAccordion defaultActiveKey="">
      <Card ref={accordionRef}>
        <Card.Header
          className={`accordion-header ${isExpanded ? "expanded" : ""}`}
          onClick={toggleAccordion}
        >
          <CustomToggle as={Button} variant="link" eventKey="0">
            <h2>{title}</h2>
          </CustomToggle>
        </Card.Header>
        <BootstrapAccordion.Collapse eventKey="0">
          <Card.Body>
            <div className="button-container">
              <Button variant="outline-secondary" onClick={handleUpdate} size="sm">
                Update
              </Button>
              <Button variant="outline-secondary" onClick={handleDelete} size="sm">
                Delete
              </Button>
            </div>
            <h3>{content}</h3>
            {images.map((image, index) => (
              <img
                key={index}
                src={`${server_uploads_url}/${image}`}
                alt={`${index + 1} for ${title}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ))}
          </Card.Body>
        </BootstrapAccordion.Collapse>
      </Card>
    </BootstrapAccordion>
  );
}
