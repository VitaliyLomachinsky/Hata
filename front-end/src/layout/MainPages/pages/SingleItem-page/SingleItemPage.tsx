/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Card, Typography, Input } from "@ensdomains/thorin";
import "./SingleItemPage.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useParams } from "react-router-dom";
import {
  useManagerAcceptListing,
  useMarketplaceGetListingWithData,
  usePrepareManagerAcceptListing,
} from "../../../../generated";
import { useState, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import axios, { AxiosError } from "axios";

const SingleItemPage = () => {
  const [year_start, setYearStart] = useState(2023);
  const [month_start, setMonthStart] = useState(12);
  const [day_start, setDayStart] = useState(5);

  const [year_end, setYearEnd] = useState(2024);
  const [month_end, setMonthEnd] = useState(2);
  const [day_end, setDayEnd] = useState(5);

  const [startTimestamp, setStartTimestmap] = useState(0);
  const [endTimestamp, setEndTimestmap] = useState(0);

  const [folderCID, setFolderCID] = useState("");
  const [folderData, setFolderData] = useState<any[]>();
  const [rdata, setRdata] = useState<any>();
  const [mdata, setMdata] = useState<any>();

  const [display, setDisplay] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const generateStartTimestamp = () => {
      const dateTime = new Date(`${year_start}-${month_start}-${day_start}`);
      const timestamp = Math.floor(dateTime.getTime() / 1000);
      setStartTimestmap(timestamp);
    };
    generateStartTimestamp();
  }, [year_start, month_start, day_start]);

  useEffect(() => {
    const generateEndTimestamp = () => {
      const dateTime = new Date(`${year_end}-${month_end}-${day_end}`);
      const timestamp = Math.floor(dateTime.getTime() / 1000);
      setEndTimestmap(timestamp);
    };
    generateEndTimestamp();
  }, [year_end, month_end, day_end]);

  const { data, isError, isLoading } = useMarketplaceGetListingWithData({
    address: "0xc4860770331bdd2aa905613702a6b2f1e3f2355e",
    args: [id as unknown as `0x${string}`],
  });

  useEffect(() => {
    if (data) {
      setRdata(data[1]);
      setMdata(data[0]);
      setFolderCID(data[1].folderCID);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const startonApi = axios.create({
        baseURL: "https://api.starton.com",
        headers: {
          "x-api-key": process.env.REACT_APP_STARTON_KEY as string,
        },
      });

      const result = await startonApi.get("/v3/ipfs/pin/", {
        params: {
          cid: folderCID,
          includeDirectoryContent: true,
        },
      });
      setFolderData(result.data.items[0].directoryContent);
      setDisplay(true);
    };
    if (folderCID) {
      fetchData();
    }
  }, [folderCID]);

  const { config: managerConfig } = usePrepareManagerAcceptListing({
    address: "0x1c61cc004abee79990e2373f908d4aae6c0f69e1",
    args: [
      id as unknown as `0x${string}`,
      BigInt(startTimestamp),
      BigInt(endTimestamp),
    ],
  });

  const { data: dataCreate, write: writeCreate } =
    useManagerAcceptListing(managerConfig);

  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: dataCreate?.hash,
  });

  const images =
    folderData?.map((item: any, index: number) => ({
      original: `https://eu.starton-ipfs.com/ipfs/${item.cid}`,
      thumbnail: `https://eu.starton-ipfs.com/ipfs/${item.cid}`,
      originalClass: "carusel_image",
    })) || [];

  const onChangeYear_start = (e: React.FormEvent<HTMLInputElement>) => {
    setYearStart(Number(e.currentTarget.value.replace(/[^0-9]/g, "")));
  };
  const onChangeMonth_start = (e: React.FormEvent<HTMLInputElement>) => {
    setMonthStart(Number(e.currentTarget.value.replace(/[^0-9]/g, "")));
  };
  const onChangeDay_start = (e: React.FormEvent<HTMLInputElement>) => {
    setDayStart(Number(e.currentTarget.value.replace(/[^0-9]/g, "")));
  };

  const onChangeYear_end = (e: React.FormEvent<HTMLInputElement>) => {
    setYearEnd(Number(e.currentTarget.value.replace(/[^0-9]/g, "")));
  };
  const onChangeMonth_end = (e: React.FormEvent<HTMLInputElement>) => {
    setMonthEnd(Number(e.currentTarget.value.replace(/[^0-9]/g, "")));
  };
  const onChangeDay_end = (e: React.FormEvent<HTMLInputElement>) => {
    setDayEnd(Number(e.currentTarget.value.replace(/[^0-9]/g, "")));
  };

  const upload = async () => {
    writeCreate?.();
  };

  if (display) {
    return (
      <div className="main_container">
        <div className="back_to_catalog_btn"></div>
        <div className="item_page">
          <div className="item_carusel">
            <ImageGallery items={images} />
          </div>
          <div className="item_description">
            <Card>
              <Typography
                fontVariant="extraLargeBold"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {rdata.location}
              </Typography>
              <Card.Divider />
              <Typography>
                <div>Owner:</div>{" "}
                <div className="landlord" title={rdata.landlord}>
                  {rdata.landlord}
                </div>
              </Typography>
              <Card.Divider />
              <Typography
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>Price:</div>
                <div>{mdata.price.toString()}$</div>
              </Typography>
              <Card.Divider />
              <Typography
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>Area:</div> <div>{rdata.area} m2</div>
              </Typography>
              <Card.Divider />
              <Typography>Rent start:</Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  label="Year"
                  value={year_start}
                  onChange={onChangeYear_start}
                />
                <Input
                  label="Month"
                  value={month_start}
                  onChange={onChangeMonth_start}
                />
                <Input
                  label="Day"
                  value={day_start}
                  onChange={onChangeDay_start}
                />
              </div>
              <Card.Divider />
              <Typography>Rent end:</Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  label="Year"
                  value={year_end}
                  onChange={onChangeYear_end}
                />
                <Input
                  label="Month"
                  value={month_end}
                  onChange={onChangeMonth_end}
                />
                <Input label="Day" value={day_end} onChange={onChangeDay_end} />
              </div>
              <Card.Divider />
              <Typography>Description:</Typography>
              <Typography>{rdata.description}</Typography>
              <Card.Divider />
              <Button onClick={upload}>Rent</Button>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default SingleItemPage;
