import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { CreateListingStruct, PropertyDataStruct } from "./helpers/types";
import { deployMarketplaceMockFixture } from "./fixtures";
import { compareMarketplaceData, comparePropertyData } from "./helpers/utils";

describe("Marketplace", () => {
  describe("createListing", () => {
    it("should create a new listing", async () => {
      const { marketplace, createListingData, propertyData, propertyID } =
        await loadFixture(deployMarketplaceMockFixture);

      await marketplace.write.createListing(Object.values(createListingData));

      const activeProperty =
        (await marketplace.read.getActiveProperty()) as string[];

      const listing = (await marketplace.read.getListing([
        propertyID,
      ])) as CreateListingStruct;

      const listingWithData = (await marketplace.read.getListingWithData([
        propertyID,
      ])) as [CreateListingStruct, PropertyDataStruct];

      expect(activeProperty.length).to.eql(1);
      compareMarketplaceData(createListingData, listing);
      comparePropertyData(propertyData, listingWithData[1]);
    });

    it("should accept the listing", async () => {
      const { marketplace, createListingData, acceptListingData, propertyID } =
        await loadFixture(deployMarketplaceMockFixture);

      await marketplace.write.createListing(Object.values(createListingData));
      let activeProperty =
        (await marketplace.read.getActiveProperty()) as string[];
      expect(activeProperty.length).to.eql(1);

      await marketplace.write.acceptListing(Object.values(acceptListingData));
      activeProperty = (await marketplace.read.getActiveProperty()) as string[];

      const listing = (await marketplace.read.getListing([
        propertyID,
      ])) as CreateListingStruct;

      expect(activeProperty.length).to.eql(0);
      compareMarketplaceData(createListingData, listing);
    });
  });
});
