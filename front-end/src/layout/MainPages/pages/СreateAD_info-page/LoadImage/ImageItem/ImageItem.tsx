import { Button, CrossSVG, Heading, Typography } from "@ensdomains/thorin";
import "./ImageItem.scss";
import { remove_image, set_preview } from "../../CreateAdSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

interface ImageProps {
  index: number;
  item: File;
}

const ImageItem = ({ item, index }: ImageProps) => {
  const preview_image = useAppSelector(
    (state) => state.input_form.preview_image?.name
  );
  const dispatch = useAppDispatch();
  const url = URL.createObjectURL(item);

  return (
    <li className="file_item" key={index}>
      <div className="file_block">
        <span className="file_index">{index + 1}</span>
        <img src={url} className="upload_preview_img"></img>
      </div>
      <div className="file_block title_and_btn">
        <Typography className="file_title">{item.name}</Typography>
        <Button
          size="small"
          width="36"
          disabled={item.name == preview_image ? true : false}
          onClick={() => dispatch(set_preview(item))}
        >
          {item.name == preview_image ? "This is preview" : "Set as preview"}
        </Button>
      </div>
      <div onClick={() => dispatch(remove_image(index))} className="file_block">
        <CrossSVG className="files_remove_icon"></CrossSVG>
      </div>
    </li>
  );
};

export default ImageItem;
