import { Button, Card, CrossSVG, Heading } from "@ensdomains/thorin";
import "./LoadImage.scss";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { add_image, remove_image } from "../CreateAdSlice";
import ImageItem from "./ImageItem/ImageItem";
const fileTypes = ["JPG", "PNG", "GIF"];

const LoadImage = () => {
  const image_array = useAppSelector((state) => state.input_form.all_images);
  const dispatch = useAppDispatch();

  function handleChange(e: File): void {
    for (let f of image_array) {
      if (f.name == e.name) {
        return
      }
    }
    dispatch(add_image(e));
  }

  return (
    <div className="load_image">
      <Heading style={{ margin: "20px 0" }}>Upload Image</Heading>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

      {image_array.length > 0 ? <Card className="upload_files">
        {image_array.map((item: File, index) => (
          <ImageItem item={item} index={index} />
        ))}
      </Card> : <></>}
    </div>
  );
};

export default LoadImage;
