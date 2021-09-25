import React, { useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

type AddVideoFormProps = {
  onChange: (url: string) => void;
};

function AddVideoForm({ onChange }: AddVideoFormProps) {
  const history = useHistory();

  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = useCallback(() => {
    onChange(videoUrl);
    history.push("/");
  }, [history, onChange, videoUrl]);

  const handleChange = useCallback((value: any) => {
    setVideoUrl(value.target.value);
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <>
        <Form.Label htmlFor="url-form">
          Add your URL in the form below:
        </Form.Label>
        <Form.Control
          id="url-form"
          size="lg"
          type="text"
          placeholder="Share your URL here"
          onChange={handleChange}
        />
        <br />
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save the video
        </Button>
      </>
    </div>
  );
}

export default AddVideoForm;
