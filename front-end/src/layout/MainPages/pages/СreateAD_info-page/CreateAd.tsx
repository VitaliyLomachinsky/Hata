//styles
import { Heading } from "@ensdomains/thorin";
import "./CreateAd.scss";

//components

import InputForm from "./InputForm/InputForm";
import LoadImage from "./LoadImage/LoadIamge";

const CreateAd = () => {
  return (
    <section className="add-advertisement">
      <div className="main_container">
        <div className="form_container">
          <div className="form_main">
            <InputForm />
          </div>
          <div className="form_description">
            <div className="form_description_inner">
              <LoadImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAd;
