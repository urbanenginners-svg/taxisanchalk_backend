import { PipelineStage } from 'mongoose';

export function getAreaVariantInventoryLookupStages(
  areaRef: string,
  variantIdField = '$productVariant._id',
): PipelineStage[] {
  return [
    {
      $lookup: {
        from: 'warehouses',
        let: { areaId: areaRef },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$$areaId', { $ifNull: ['$areas', []] }] },
              deletedAt: null,
              isDeleted: { $ne: true },
            },
          },
          { $project: { _id: 1 } },
          { $limit: 1 },
        ],
        as: '_warehouse',
      },
    },
    {
      $set: {
        warehouseId: { $arrayElemAt: ['$_warehouse._id', 0] },
      },
    },
    {
      $lookup: {
        from: 'warehouse-cells',
        let: {
          variantId: variantIdField,
          warehouseId: '$warehouseId',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$productVariant', '$$variantId'] },
                  { $eq: ['$warehouse', '$$warehouseId'] },
                ],
              },
              deletedAt: null,
            },
          },
          { $group: { _id: null, total: { $sum: '$itemCount' } } },
        ],
        as: '_cellStock',
      },
    },
    {
      $set: {
        availableQuantity: {
          $ifNull: [{ $arrayElemAt: ['$_cellStock.total', 0] }, 0],
        },
      },
    },
    {
      $lookup: {
        from: 'warehouse-inventories',
        let: {
          variantId: variantIdField,
          warehouseId: '$warehouseId',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$productVariant', '$$variantId'] },
                  { $eq: ['$warehouse', '$$warehouseId'] },
                ],
              },
              deletedAt: null,
            },
          },
          { $project: { reservedCount: 1 } },
          { $limit: 1 },
        ],
        as: '_inventory',
      },
    },
    {
      $set: {
        reservedQuantity: {
          $ifNull: [{ $arrayElemAt: ['$_inventory.reservedCount', 0] }, 0],
        },
      },
    },
    { $unset: ['_warehouse', '_cellStock', '_inventory', 'warehouseId'] },
  ];
}
