//styles
import "./ProfileComponent.scss";
import { Button, ExitSVG, PersonActiveSVG, Profile } from "@ensdomains/thorin";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  useConnect,
  useAccount,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
} from "wagmi";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  const { connect, connectors } = useConnect();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <>
      <div>
        {address ? (
          <Profile
            address={address}
            ensName={ensName ? ensName : ""}
            avatar={ensAvatar ? ensAvatar : "https://i.imgur.com/BSJBpQE.jpg"}
            dropdownItems={[
              {
                label: "Profile",
                onClick: () => {
                  navigate("/main/profile");
                },
                icon: <PersonActiveSVG />,
              },
              {
                label: "Disconnect",
                onClick: handleDisconnect,
                color: "red",
                icon: <ExitSVG />,
              },
            ]}
          />
        ) : (
          connectors.map((connector) => (
            <Button
              shape="rounded"
              width="45"
              colorStyle="greySecondary"
              onClick={() => connect({ connector })}
            >
              Log in
            </Button>
          ))
        )}
      </div>
    </>
  );
};

export default ProfileComponent;
