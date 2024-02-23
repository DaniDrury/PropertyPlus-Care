const { Vendor, Issue, Property } = require("../../models");
const { BadRequestError, InternalServerError } = require("../errors");


async function findAllVendors() {
  const vendors = await Vendor.findAll({
    include: [{ model: Issue }],
  });

  if (!vendors) {
    throw new InternalServerError("Couldn't find vendors");
  }
  // console.log(vendors);
  return vendors.map(e => e.toJSON());
}

async function findVendorByID(id) {
  const vendor = await Vendor.findByPk(id, {
    include: [{
      model: Issue,
      include: [{model: Property}]
    }],
  });

  if (!vendor) {
    throw new InternalServerError(`Couldn't find vendor with id ${id}`);
  }
  // console.log(vendor);
  return vendor.toJSON();
}

async function createVendor(vendorData) {
  const vendor = await Vendor.create(vendorData);

  if (!vendor) {
    throw new InternalServerError(`New Vendor creation failed. ${vendorData}`);
  }
  // console.log(vendor);
  return vendor;
}

//delete vendor
async function deleteVendor(vendor_id) {
  const vendor = await Vendor.destroy({ where: { vendor_id } });

  if (!vendor) {
    throw new InternalServerError(`Delete vendor failed id ${vendor_id}`);
  }
  // console.log(vendor);
  return vendor;
}

//update vendor
async function updateVendor(vendor_id, vendorData) {
  const vendor = await Vendor.update(vendorData, { where: { vendor_id } });

  if (!vendor[0]) {
    throw new InternalServerError(`Update vendor failed id ${vendor_id}`);
  }
  // console.log(vendor);
  vendor;
};

async function addIssueToVendor(issue_id, vendor_id) {
  const issue = await Issue.findByPk(issue_id);

  if (!issue) {
    throw new BadRequestError(`No issue found with id ${issue_id}`);
  }

  const result = await issue.addVendor(vendor_id);

  // console.log(result);
  return result;
};

module.exports = {
  findAllVendors,
  findVendorByID,
  createVendor,
  deleteVendor,
  updateVendor,
  addIssueToVendor,
};
