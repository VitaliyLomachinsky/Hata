import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { deployAgreementTokenMockFixture } from "./fixtures";

import eventemitter2 from "chai-eventemitter2";
import chai from "chai";
import { SigningDataStruct } from "./helpers/types";
import { getSigningData } from "./helpers/constants";

chai.use(eventemitter2());

describe("AgreementToken", () => {
  describe("Deployment", () => {
    it("Should add base uri while deployment", async () => {
      const { token, owner } = await loadFixture(
        deployAgreementTokenMockFixture
      );

      const propertyID =
        "0x5DBe70A72C524DAbEaC4c8dB3cCaE2336C2ABCAA5DecEF166FdaBC31E10aFB0B";

      const signingData: SigningDataStruct = await getSigningData(
        propertyID,
        owner.account.address,
        undefined,
        undefined,
        true
      );

      const tx = await token.write.mint([owner.account.address, signingData]);

      await expect(tx).to.emit(token, "MetadataUpdate", { withArgs: [1] });

      const result = await token.read.tokenURI([1]);
    });
  });
});
