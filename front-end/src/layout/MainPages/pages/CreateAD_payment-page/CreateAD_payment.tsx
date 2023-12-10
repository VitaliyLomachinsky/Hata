import { Button, Dialog, Input, Typography } from "@ensdomains/thorin";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { set_period, set_price } from "../СreateAD_info-page/CreateAdSlice";
import { useAccount, useConnect, useWaitForTransaction } from "wagmi";
import "./CreateAD_payment.scss";
import { useState, useEffect } from "react";
import {
  useManagerCreateListingUsdc,
  usePrepareManagerCreateListingUsdc,
  usePrepareUsdcMockApprove,
  useUsdcMockApprove,
} from "../../../../generated";
import { useDebounce } from "usehooks-ts";
import { useParams } from "react-router-dom";

const CreateAD_payment = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const _currency = useAppSelector((state) => state.input_form.currency);
  const _period = useAppSelector((state) => state.input_form.period);
  const _price = useAppSelector((state) => state.input_form.price);

  const delay = 500;
  const period = useDebounce(_period, delay);
  const price = useDebounce(_price, delay);

  const [alert, changeAlert] = useState(false);
  const [alertText, setAlertText] = useState<String[]>([]);
  const [isApproved, setIsApproved] = useState(false);

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      dispatch(set_price(event.target.value));
    }
  };
  const handlePeriod = () => {
    if (period == "month") {
      dispatch(set_period("week"));
    } else {
      dispatch(set_period("month"));
    }
  };
  // const handleCurrency = () => {
  //   if (currency == "ETH") {
  //     dispatch(set_currency("USD"));
  //   } else {
  //     dispatch(set_currency("ETH"));
  //   }
  // };

  const dataValidaton = () => {
    setAlertText([]);
    let erorText: String[] = [];
    if (_price == "") {
      erorText.push("Set price");
    }

    if (erorText.length == 0) {
      //do something
    } else {
      setAlertText(erorText);
      changeAlert(!alert);
    }
  };

  const { config: approveConfig } = usePrepareUsdcMockApprove({
    address: "0x19d1bdd343c3ecdeb168d09573e5248b5f824e0e",
    args: [
      "0x751f8a28e4d37316a91bc503b0ee9061b9d959a2",
      100000000000000000000000n,
    ],
  });

  const { data: dataApprove, write: writeApprove } =
    useUsdcMockApprove(approveConfig);
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });

  const { config: managerConfig } = usePrepareManagerCreateListingUsdc({
    address: "0x1c61cc004abee79990e2373f908d4aae6c0f69e1",
    args: [
      id as unknown as `0x${string}`,
      BigInt(price),
      period == "week" ? 0 : 1,
    ],
  });

  const { data: dataCreate, write: writeCreate } =
    useManagerCreateListingUsdc(managerConfig);

  const { isSuccess: createSuccess } = useWaitForTransaction({
    hash: dataCreate?.hash,
  });

  useEffect(() => {
    if (isApproveSuccess) {
      setIsApproved(true);
    }
  }, [isApproveSuccess]);

  const approve = async () => {
    writeApprove?.();
  };

  const upload = async () => {
    writeCreate?.();
  };

  return (
    <section className="add-advertisement">
      <div className="main_container">
        <div className="payment">
          <Input
            label={`Price per ${period == "month" ? "month" : "week"} (USD)`}
            placeholder="Price..."
            width="128"
            value={_price}
            onChange={handlePrice}
          />
          <div className="period">
            {/* <Typography style={{ color: "hsl(240 6% 63%)" }}>I want to receive:</Typography> */}
            <Typography style={{ color: "hsl(240 6% 63%)" }}>
              Payment schedule:
            </Typography>
          </div>
          <div className=" toggle_row">
            {/* <CurrencyToggle onClick={() => handleCurrency()} /> */}
            <div className="period">
              <Button
                className="period_mountly"
                size="small"
                colorStyle={period == "month" ? "accentPrimary" : "background"}
                onClick={() => handlePeriod()}
              >
                Monthly
              </Button>

              <Button
                className="period_weekly"
                size="small"
                colorStyle={period == "week" ? "accentPrimary" : "background"}
                onClick={() => handlePeriod()}
              >
                Weekly
              </Button>
            </div>
          </div>
          <Dialog
            alert="error"
            open={alert}
            title="Alert"
            variant="closable"
            onDismiss={() => changeAlert(!alert)}
          >
            {alertText.map((item) => (
              <Typography>{item}</Typography>
            ))}
          </Dialog>
          {!isApproved ? (
        <Button onClick={approve}>Approve</Button>
      ) : (
        <Button  style={{ margin: "20px 0" }} onClick={upload}>Submit</Button>
      )}
        </div>
      </div>
    </section>
  );
};

export default CreateAD_payment;
