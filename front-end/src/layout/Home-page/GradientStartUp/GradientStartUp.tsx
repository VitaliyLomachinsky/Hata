import { Button, Heading, Portal, Typography } from "@ensdomains/thorin";

import "./GradientStartUp.scss";
import { Link } from "react-router-dom";

const GradientStartUp = () => {
  return (
    <div className="gradient">
      {/* object for behind movement  */}
      <div className="gradient_behind-move_1"></div>
      <div className="gradient_behind-move_2"></div>
      <div className="gradient_behind-move_3"></div>
      <div className="gradient_behind-move_4"></div>
      <div className="gradient_behind-move_5"></div>
      <div className="gradient_behind-move_6"></div>
      {/* object for behind movement  */}

      <div className="gradient_info_block">
        <div className="gradient_info_block_inner">
          <Heading level="1" color="background" style={{ fontSize: "50px" }}>
            Revolutionizing Property Rentals
          </Heading>
          <div className="gradient_text_wrapper">
            <Typography color="background" fontVariant="extraLarge">
              At Hata, we are transforming the way you rent properties. Our
              decentralized property rental system is designed to provide
              unparalleled security and transparency, ensuring a seamless and
              trustworthy rental experience.
            </Typography>
          </div>

          <div className="gradient_btn_wrapper">
            <Link to="/main/catalog">
              <Button
                style={{
                  width: "240px",
                  height: "60px",
                  fontSize: "24px",
                  boxShadow: "rgba(0, 0, 0, 0.4) 8px 8px",
                }}
                size="medium"
                colorStyle="background"
                width="45"
                className="gradient_btn"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="gradient_img_block">
        <img
          className="gradient_img"
          src="https://cdn-icons-png.flaticon.com/512/1349/1349937.png"
        ></img>
      </div>
    </div>
  );
};

export default GradientStartUp;
