/*
  Warnings:

  - The values [Available,Out_of_stock] on the enum `furniture_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `furniture` MODIFY `status` ENUM('AVAILABLE', 'OUT_OF_STOCK', 'LOW_STOCK', 'DISCONTINUED') NOT NULL;
