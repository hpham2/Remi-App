import React, { useState } from "react";
import ReactPlayer from "react-player";
import getYouTubeID from "get-youtube-id";
import { Col, Container, Row } from "react-bootstrap";
var getYoutubeTitle = require("get-youtube-title");

type props = {
  url: string;
  userName: string;
};

function YoutubeCard({ url, userName }: props) {
  const [videoTitle, setVideoTitle] = useState("");
  const id = getYouTubeID(url, {
    fuzzy: false,
  });

  getYoutubeTitle(id, (err: any, title: string) => {
    setVideoTitle(title);
  });

  return (
    <Container style={{ marginTop: "10px", marginBottom: "10px" }}>
      <Row>
        <Col sm={8}>
          <ReactPlayer url={url} width="480px" height="360px" />
        </Col>
        <Col sm={4}>
          <strong>{videoTitle}</strong>
          <br />
          <i>
            Uploaded by: <strong>{userName}</strong>
          </i>
        </Col>
      </Row>
    </Container>
  );
}

export default YoutubeCard;
