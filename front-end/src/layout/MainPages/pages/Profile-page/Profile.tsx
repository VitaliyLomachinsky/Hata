//styles
import "./Profile.scss";
import { Heading } from "@ensdomains/thorin";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { gql } from "@graphql-mesh/utils";
import { ActivePropertyQueryDocument, execute } from "../../../../.graphclient";
import ProfileItem from "./ProfileItem/ProfileItem";

const Profile = () => {
  const [data, setData] = React.useState<any>();
  const [propertiesList, setPropertiesList] = React.useState<JSX.Element[]>([]);
  const { address, isDisconnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDisconnected) {
      navigate("/main/catalog");
    }
  }, [address]);

  const queryResult = `
  query ActivePropertyQuery {
    properties(where: {landlord: "${address}"}) {
      isActive
      area
      id
      landlord
      location
      payment
      previewCID
      price
      propertyID
    }
  }
`;

  useEffect(() => {
    const ActivePropertyQueryDocument = gql`
      ${queryResult}
    `;

    const getUserProperty = async () => {
      const result = await execute(ActivePropertyQueryDocument, {});
      setData(result?.data);
      console.log(result.data);
      if (result?.data?.properties) {
        const listItems = result.data.properties.map(
          (item: any, index: number) => (
            <div key={item.id}>
              <ProfileItem location={item.location} price={item.price} img={item.previewCID} address={item.propertyID} />
            </div>
          )
        );
        setPropertiesList(listItems);
      }
    };

    getUserProperty();
  }, [setData, address]);

  return (
    <div>
      <div className="main_container">
        <Heading level="2" as="h2" className="profile_title">
          Profile
        </Heading>
        <h3>user:</h3>
        <span>{address}</span>
        <div className="profile_sections_wrapper">
          <div className="profile_section">
            <Heading as="h3" level="2" className="section_text">
              My offers:
            </Heading>
            {propertiesList.length > 0 ? (
              propertiesList
            ) : (
              <p>No properties found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
