import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { PropertyDataStruct } from "./helpers/types";
import {
  getAddPropertyReturnValue,
  comparePropertyData,
} from "./helpers/utils";
import { deployPropertyRegistryMockFixture } from "./fixtures";

describe("PropertyRegistry", () => {
  describe("addProperty", () => {
    it("should add property info for the caller", async () => {
      const { propertyRegistry, propertyData } = await loadFixture(
        deployPropertyRegistryMockFixture
      );

      const tx = await propertyRegistry.write.addProperty(
        Object.values(propertyData)
      );

      const propertyID = (await getAddPropertyReturnValue(tx, 0)) as `0x${string}`;

      const actualProperty = (await propertyRegistry.read.getProperty([
        propertyID,
      ])) as PropertyDataStruct;

      comparePropertyData(propertyData, actualProperty);
    });

    describe("getProperty", () => {
      it("should return the property info for the given owner", async () => {
        const { propertyRegistry, propertyData } = await loadFixture(
          deployPropertyRegistryMockFixture
        );

        const tx = await propertyRegistry.write.addProperty(
          Object.values(propertyData)
        );

        const propertyID = (await getAddPropertyReturnValue(tx, 0)) as `0x${string}`;

        const actualPropertyID =
          (await propertyRegistry.read.getPropertyByOwner([
            propertyData.landlord,
          ])) as PropertyDataStruct[];

        expect(propertyID).to.eql(actualPropertyID[0]);
      });
    });
  });
});
