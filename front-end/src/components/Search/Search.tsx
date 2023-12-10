import "./Search.scss";
import { Input, MagnifyingGlassSimpleSVG, Portal } from "@ensdomains/thorin";

const Search = () => {
  return (
    <Input
      icon={<MagnifyingGlassSimpleSVG />}
      label={"123"}
      placeholder="Enter your request"
      width="128"
      size="medium"
      iconWidth="5.5"
      hideLabel={true}
    />
  );
};

export default Search;
