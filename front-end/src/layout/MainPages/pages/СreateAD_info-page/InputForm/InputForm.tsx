import "./InputForm.scss";

import {
  Button,
  Dialog,
  FieldSet,
  Input,
  Textarea,
  Typography,
} from "@ensdomains/thorin";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  set_area,
  set_description,
  set_folder_CID,
  set_location,
  set_preview_CID,
} from "../CreateAdSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useWaitForTransaction } from "wagmi";
import {
  usePrepareManagerAddPropertyUsdc,
  useManagerAddPropertyUsdc,
  usePrepareUsdcMockApprove,
  useUsdcMockApprove,
} from "../../../../../generated";
import axios, { AxiosInstance } from "axios";
import { useDebounce } from "usehooks-ts";

const InputForm = () => {
  const dispatch = useAppDispatch();
  const [alert, changeAlert] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [alertText, setAlertText] = useState<String[]>([]);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { connect, connectors } = useConnect();
  const navigate = useNavigate();

  const _location = useAppSelector((state) => state.input_form.location);
  const _area = useAppSelector((state) => state.input_form.area);
  const _description = useAppSelector((state) => state.input_form.description);
  const _preview = useAppSelector((state) => state.input_form.preview_image);
  const _preview_CID = useAppSelector((state) => state.input_form.preview_CID);
  const _image_folder_CID = useAppSelector(
    (state) => state.input_form.image_folder_CID
  );
  const _files: File[] = useAppSelector((state) => state.input_form.all_images);

  const delay = 500;
  const location = useDebounce(_location, delay);
  const area = useDebounce(_area, delay);
  const description = useDebounce(_description, delay);
  const preview = useDebounce(_preview, delay);
  const preview_CID = useDebounce(_preview_CID, delay);
  const image_folder_CID = useDebounce(_image_folder_CID, delay);
  const files = useDebounce(_files, delay);

  const { config: approveConfig } = usePrepareUsdcMockApprove({
    address: "0x19d1bdd343c3ecdeb168d09573e5248b5f824e0e",
    args: [
      "0x1c61cc004abee79990e2373f908d4aae6c0f69e1",
      100000000000000000000000n,
    ],
  });

  console.log(preview_CID, image_folder_CID);

  const { config: managerConfig } = usePrepareManagerAddPropertyUsdc({
    address: "0x1c61cc004abee79990e2373f908d4aae6c0f69e1",
    args: [
      location,
      description,
      address!,
      Number(area),
      preview_CID,
      image_folder_CID,
    ],
  });

  const { data: dataApprove, write: writeApprove } =
    useUsdcMockApprove(approveConfig);
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });

  const { data: dataManager, write: writeManager } =
    useManagerAddPropertyUsdc(managerConfig);
  const { data: addPropertyData, isSuccess: isAddPropertySuccess } =
    useWaitForTransaction({
      hash: dataManager?.hash,
    });

  const handleLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(set_location(event.target.value));
  };
  const handleArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      dispatch(set_area(event.target.value));
    }
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(set_description(event.target.value));
  };

  const submitToStarton = async (
    api: AxiosInstance,
    formData: FormData,
    action: any,
    isFolder: boolean
  ) => {
    const link = isFolder ? "folder" : "file";
    const result = await api.post(`/v3/ipfs/${link}`, formData, {
      headers: {
        "Content-type": `multipart/form-data`,
      },
    });
    dispatch(action(result.data.cid));
  };

  const uploadToStarton = async (
    preview: File,
    address: string,
    files: File[]
  ) => {
    // CREATE PREVIEW
    const startonApi = axios.create({
      baseURL: "https://api.starton.com",
      headers: {
        "x-api-key": process.env.REACT_APP_STARTON_KEY as string,
      },
    });
    let formData = new FormData();
    formData.append("file", preview!);
    formData.append("isSync", "false");
    await submitToStarton(startonApi, formData, set_preview_CID, false);

    //CREATE FOLDER
    formData = new FormData();
    formData.append("folderName", `user_${address}`);
    for (const file of files) {
      formData.append("files", file);
    }
    formData.append("isSync", "false");
    await submitToStarton(startonApi, formData, set_folder_CID, true);

    // dispatch(
    //   set_preview_CID(
    //     "bafkreibdpmlbk7tsl3p4i4kxatwbbnofl3xtuob4xfz6xc4udveb5bbxpe"
    //   )
    // );
    // dispatch(
    //   set_folder_CID(
    //     "bafybeihjcsffk473wgezfaos5jpjuonszjgu4m7gon34ii5a6kn5iqdddy"
    //   )
    // );
  };

  const dataValidation = (): boolean => {
    setAlertText([]);
    let errorArr: String[] = [];
    if (_location == "") {
      errorArr.push("Set location");
    }
    if (_area == "") {
      errorArr.push("Set area");
    }
    if (_description == "") {
      errorArr.push("Set description");
    }
    if (_preview == null) {
      errorArr.push("Import at least 1 image");
    }
    if (isDisconnected) {
      errorArr.push("Connect matamask");
    }
    if (errorArr.length == 0) {
      return true;
    } else {
      setAlertText(errorArr);
      changeAlert(!alert);

      return false;
    }
  };

  const upload = async () => {
    // dataValidation();
    writeManager?.();
  };

  const approve = async () => {
    await uploadToStarton(preview!, address!, files);
    writeApprove?.();
  };

  useEffect(() => {
    if (isApproveSuccess) {
      setIsApproved(true);
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isAddPropertySuccess) {
      const propertyID = addPropertyData?.logs[1].topics[1];
      navigate(`/main/createAd_payment/${propertyID}`);
    }
  }, [isAddPropertySuccess]);

  return (
    <FieldSet legend="Create Property">
      {address ? (
        <Input
          label="Account"
          placeholder="Acount..."
          width="128"
          value={address}
        />
      ) : (
        connectors.map((connector) => (
          <Button onClick={() => connect({ connector })}>
            Connect to metamask
          </Button>
        ))
      )}
      <Input
        label="Location"
        placeholder="Enter your location"
        width="128"
        value={_location}
        onChange={handleLocation}
      />
      <Input
        label="Area (m²)"
        placeholder="Area"
        width="128"
        value={_area}
        onChange={handleArea}
      />

      <Textarea
        label="Description"
        placeholder="Whatever you feel necessary to tell"
        value={_description}
        onChange={handleDescription}
      />
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
        <Button onClick={upload}>Submit</Button>
      )}
    </FieldSet>
  );
};

export default InputForm;
