import React, { useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";

type AddVideoFormProps = {
  onChange: (url: string) => void;
};

function AddVideoForm({ onChange }: AddVideoFormProps) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = useCallback(() => {
    onChange(videoUrl);
  }, [onChange, videoUrl]);

  const handleChange = useCallback((value: any) => {
    setVideoUrl(value.target.value);
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Large text"
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
