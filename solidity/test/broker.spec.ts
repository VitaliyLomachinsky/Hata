import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { deployBrokerMockFixture } from "./fixtures";
import { getMarketplaceBrokerData, getPropertyBrokerData, getTestClient } from "./helpers/constants";
import { SigningDataStruct } from "./helpers/types";

describe("Broker", () => {
  describe("signAgreement", () => {
    it("should create a new agreement", async () => {
      const { broker, landlord, landlordAddress, tenantAddress, propertyID } = await loadFixture(
        deployBrokerMockFixture
      );

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const pdata = getPropertyBrokerData(landlordAddress, propertyID);
      const mdata = await getMarketplaceBrokerData(tenantAddress, propertyID);

      await broker.write.createAgreement([mdata, pdata]);
      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await broker.write.signAgreement([propertyID, signatureByLandlord]);
    });
  });
});
